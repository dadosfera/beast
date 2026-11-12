#!/usr/bin/env node
/**
 * Regenerates packages/design-system/_ds_bundle.js and _ds_manifest.json from their sources.
 *
 *   node build.cjs            write both files
 *   node build.cjs --check    exit 1 when the committed files differ from what the sources produce
 *
 * The two files describe one flat "design-system project":
 *   packages/design-system/**                       -> project root
 *   packages/react/components/**, ui_kits/**        -> components/**, ui_kits/**
 * README.md in this folder documents the format and what is not derived here.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Babel = require('@babel/standalone');

const repo = path.resolve(__dirname, '../..');
const dsRoot = path.join(repo, 'packages/design-system');
const reactRoot = path.join(repo, 'packages/react');
const bundlePath = path.join(dsRoot, '_ds_bundle.js');
const manifestPath = path.join(dsRoot, '_ds_manifest.json');
const GENERATED = new Set(['_ds_bundle.js', '_ds_manifest.json']);

const read = (filename) => fs.readFileSync(filename, 'utf8');
const byPath = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const toPosix = (value) => value.split(path.sep).join('/');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename, files);
    else files.push(filename);
  }
  return files;
}

/** Project path -> absolute filename, in the flat layout the bundle and the manifest refer to. */
function collectProject() {
  const project = new Map();
  for (const filename of walk(dsRoot)) {
    const rel = toPosix(path.relative(dsRoot, filename));
    if (!GENERATED.has(rel)) project.set(rel, filename);
  }
  for (const folder of ['components', 'ui_kits']) {
    const root = path.join(reactRoot, folder);
    if (!fs.existsSync(root)) continue;
    for (const filename of walk(root)) project.set(toPosix(path.relative(reactRoot, filename)), filename);
  }
  return project;
}

/**
 * Sources under packages/react reach design-system files through `../…/design-system/`. In the flat
 * project the same file is one level closer, so that prefix is folded before hashing and compiling.
 */
function projectSource(rel, filename) {
  const text = read(filename);
  if (!filename.startsWith(reactRoot + path.sep)) return text;
  const depth = rel.split('/').length - 1;
  return text.split(`${'../'.repeat(depth + 1)}design-system/`).join('../'.repeat(depth));
}

const hash = (text) => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);

/** Compiles one module the way the bundle expects it: classic JSX, no imports, exports collected. */
function compile(rel, source) {
  const exported = [];
  const dependencies = [];
  const plugin = ({ types: t }) => ({
    visitor: {
      ImportDeclaration(nodePath) {
        const from = nodePath.node.source.value;
        if (from === 'react') {
          const named = nodePath.node.specifiers.filter((specifier) => t.isImportSpecifier(specifier));
          if (!named.length) return nodePath.remove();
          const properties = named.map((specifier) =>
            t.objectProperty(
              t.identifier(specifier.imported.name),
              t.identifier(specifier.local.name),
              false,
              specifier.imported.name === specifier.local.name,
            ),
          );
          const declarator = t.variableDeclarator(t.objectPattern(properties), t.identifier('React'));
          return nodePath.replaceWith(t.variableDeclaration('const', [declarator]));
        }
        if (!from.startsWith('.')) throw nodePath.buildCodeFrameError(`Unsupported import "${from}" in ${rel}`);
        dependencies.push(path.posix.normalize(path.posix.join(path.posix.dirname(rel), from)));
        for (const specifier of nodePath.node.specifiers) {
          if (!t.isImportSpecifier(specifier)) throw nodePath.buildCodeFrameError(`Use named imports in ${rel}`);
          const binding = nodePath.scope.getBinding(specifier.local.name);
          for (const reference of binding.referencePaths) {
            const member = reference.isJSXIdentifier()
              ? t.jsxMemberExpression(t.jsxIdentifier('__ds_scope'), t.jsxIdentifier(specifier.imported.name))
              : t.memberExpression(t.identifier('__ds_scope'), t.identifier(specifier.imported.name));
            reference.replaceWith(member);
          }
        }
        return nodePath.remove();
      },
      ExportNamedDeclaration(nodePath) {
        const declaration = nodePath.node.declaration;
        if (!declaration) throw nodePath.buildCodeFrameError(`Export declarations directly in ${rel}`);
        if (declaration.id) exported.push(declaration.id.name);
        else for (const declarator of declaration.declarations) exported.push(declarator.id.name);
        nodePath.replaceWith(declaration);
      },
      ExportDefaultDeclaration(nodePath) {
        throw nodePath.buildCodeFrameError(`Default exports are not bundled (${rel})`);
      },
    },
  });
  const { code } = Babel.transform(source, {
    filename: rel,
    babelrc: false,
    configFile: false,
    presets: [['react', { runtime: 'classic' }]],
    plugins: [plugin],
  });
  return { code, exported, dependencies };
}

function buildBundle(project, namespace) {
  const order = [...project.keys()]
    .filter((rel) => /^(assets|components|ui_kits)\//.test(rel) && /\.jsx?$/.test(rel))
    .sort(byPath);
  const modules = new Map();
  const sourceHashes = {};
  for (const rel of order) {
    const source = projectSource(rel, project.get(rel));
    sourceHashes[rel] = hash(source);
    modules.set(rel, compile(rel, source));
  }
  for (const [rel, module] of modules) {
    for (const dependency of module.dependencies) {
      if (!modules.has(dependency)) throw new Error(`${rel} imports ${dependency}, which is not a bundled source`);
    }
  }

  // Emission order: always the first source (by path) whose dependencies are already emitted.
  const emitted = [];
  const done = new Set();
  while (emitted.length < order.length) {
    const next = order.find((rel) => !done.has(rel) && modules.get(rel).dependencies.every((dep) => done.has(dep)));
    if (!next) throw new Error('Circular import between bundled sources');
    done.add(next);
    emitted.push(next);
  }

  const components = [];
  for (const rel of order) {
    if (!rel.startsWith('components/')) continue;
    for (const name of modules.get(rel).exported) components.push({ name, sourcePath: rel });
  }
  const names = components.map((component) => component.name);
  const duplicated = names.filter((name, index) => names.indexOf(name) !== index);
  if (duplicated.length) throw new Error(`Component exported twice: ${[...new Set(duplicated)].join(', ')}`);

  const header = { format: 4, namespace, components, sourceHashes, inlinedExternals: [], unexposedExports: [] };
  let out = `/* @ds-bundle: ${JSON.stringify(header)} */\n\n(() => {\n\n`;
  out += `const __ds_ns = (window.${namespace} = window.${namespace} || {});\n\n`;
  out += `const __ds_scope = {};\n\n(__ds_ns.__errors = __ds_ns.__errors || []);\n\n`;
  for (const rel of emitted) {
    const module = modules.get(rel);
    out += `// ${rel}\ntry { (() => {\n${module.code}\n`;
    if (module.exported.length) out += `Object.assign(__ds_scope, { ${module.exported.join(', ')} });\n`;
    out += `})(); } catch (e) { __ds_ns.__errors.push({ path: ${JSON.stringify(rel)}, `;
    out += `error: String((e && e.message) || e) }); }\n\n`;
  }
  for (const name of names) out += `__ds_ns.${name} = __ds_scope.${name};\n\n`;
  out += `})();\n`;
  return { text: out, components };
}

const attribute = (text, key) => (text.match(new RegExp(`${key}="([^"]*)"`)) || [])[1];

/** A token's kind is its `@kind` annotation when present; otherwise it follows from its name and value. */
function tokenKind(name, value) {
  if (/shadow/.test(name)) return 'shadow';
  if (/radius/.test(name)) return 'radius';
  if (/(^|-)(text|font)(-|$)|line-height/.test(name)) return 'font';
  if (/color|background/.test(name) || /^#|rgba?\(|hsla?\(|gradient\(/.test(value)) return 'color';
  return 'spacing';
}

function buildManifest(project, previous, components) {
  const sorted = [...project.keys()].sort(byPath);

  const cards = [];
  for (const rel of sorted) {
    if (!rel.endsWith('.html')) continue;
    const match = read(project.get(rel)).match(/<!--\s*@dsCard\s+([^]*?)-->/);
    if (!match) continue;
    const [, meta] = match;
    cards.push({
      path: rel,
      group: attribute(meta, 'group'),
      viewport: attribute(meta, 'viewport'),
      subtitle: attribute(meta, 'subtitle'),
      name: attribute(meta, 'name'),
    });
  }
  cards.sort((a, b) => byPath(a.group, b.group) || byPath(a.path, b.path));

  const startingPoints = [];
  for (const rel of sorted) {
    if (!rel.endsWith('.d.ts')) continue;
    const pattern = /\/\*\*((?:(?!\*\/)[^])*)\*\/\s*export interface (\w+)Props/g;
    const source = read(project.get(rel));
    let match;
    while ((match = pattern.exec(source))) {
      const point = match[1].match(/@startingPoint\s+(.*)/);
      if (!point) continue;
      const folder = path.posix.dirname(rel);
      startingPoints.push({
        name: match[2],
        path: rel.replace(/\.d\.ts$/, '.jsx'),
        previewPath: `${folder}/${path.posix.basename(folder)}.card.html`,
        kind: 'component',
        section: attribute(point[1], 'section'),
        subtitle: attribute(point[1], 'subtitle'),
        viewport: attribute(point[1], 'viewport'),
      });
    }
  }
  for (const rel of sorted) {
    if (!rel.endsWith('.html')) continue;
    const match = read(project.get(rel)).match(/<!--\s*@startingPoint\s+([^]*?)-->/);
    if (!match) continue;
    startingPoints.push({
      name: path.posix.basename(path.posix.dirname(rel)),
      path: rel,
      previewPath: rel,
      kind: 'screen',
      section: attribute(match[1], 'section'),
      subtitle: attribute(match[1], 'subtitle'),
      viewport: attribute(match[1], 'viewport'),
    });
  }
  for (const point of startingPoints) {
    if (!project.has(point.previewPath)) throw new Error(`Starting point ${point.name}: missing ${point.previewPath}`);
  }

  const imports = [...read(project.get('styles.css')).matchAll(/@import\s+"([^"]+)"/g)].map((match) => match[1]);
  const globalCssPaths = [...imports, 'styles.css'];
  const tokens = [];
  for (const css of imports) {
    if (!project.has(css)) throw new Error(`styles.css imports ${css}, which does not exist`);
    for (const block of read(project.get(css)).matchAll(/:root\s*\{([^}]*)\}/g)) {
      const pattern = /(--[\w-]+)\s*:\s*([^;}]+);?(\s*\/\*\s*@kind\s+(\w+)\s*\*\/)?/g;
      let match;
      while ((match = pattern.exec(block[1]))) {
        const [, name, rawValue, , annotation] = match;
        const value = rawValue.trim();
        const token = { name, value, kind: annotation || tokenKind(name, value), definedIn: css };
        if (annotation) token.annotation = annotation;
        tokens.push(token);
      }
    }
  }
  const tokenNames = tokens.map((token) => token.name);
  const repeated = tokenNames.filter((name, index) => tokenNames.indexOf(name) !== index);
  if (repeated.length) throw new Error(`Token declared twice: ${[...new Set(repeated)].join(', ')}`);

  // Fields this tool does not derive are carried over from the committed manifest (see README).
  return {
    namespace: previous.namespace,
    components,
    startingPoints,
    cards,
    templates: previous.templates || [],
    hasThumbnailHtml: project.has('thumbnail.html'),
    globalCssPaths,
    tokens,
    themes: previous.themes || [],
    fonts: previous.fonts || [],
    brandFonts: previous.brandFonts || [],
    source: previous.source,
  };
}

function firstDifference(current, expected) {
  const a = current.split('\n');
  const b = expected.split('\n');
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    if (a[index] !== b[index]) {
      const clip = (line) => (line === undefined ? '(end of file)' : JSON.stringify(line.slice(0, 160)));
      return `line ${index + 1}\n    committed: ${clip(a[index])}\n    sources:   ${clip(b[index])}`;
    }
  }
  return 'no line differs';
}

function main() {
  const check = process.argv.includes('--check');
  const previous = JSON.parse(read(manifestPath));
  if (!previous.namespace) throw new Error('_ds_manifest.json has no namespace to build for');
  const project = collectProject();
  const bundle = buildBundle(project, previous.namespace);
  const manifest = JSON.stringify(buildManifest(project, previous, bundle.components));
  const outputs = [
    [bundlePath, bundle.text],
    [manifestPath, manifest],
  ];
  if (!check) {
    for (const [filename, text] of outputs) fs.writeFileSync(filename, text);
    console.log(`Wrote ${outputs.map(([filename]) => path.relative(repo, filename)).join(' and ')}.`);
    return;
  }
  let stale = false;
  for (const [filename, text] of outputs) {
    const committed = read(filename);
    if (committed === text) continue;
    stale = true;
    console.error(`${path.relative(repo, filename)} is not what its sources produce; first difference at`);
    console.error(`  ${firstDifference(committed, text)}`);
  }
  if (stale) {
    console.error('Run `npm run build` in tools/design-system-bundle and commit the result with the source change.');
    process.exit(1);
  }
  console.log('_ds_bundle.js and _ds_manifest.json match their sources.');
}

main();
