const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repo = path.resolve(__dirname, '../..');
const ds = path.join(repo, 'packages/design-system');
const read = filename => fs.readFileSync(filename, 'utf8');

test('Angular and standalone CSS keep the same default font families', () => {
  const sass = read(path.join(repo, 'src/framework/theme/styles/themes/_default.scss'));
  const css = read(path.join(ds, 'tokens/fonts.css'));
  const normalize = value => value.replaceAll('"', '').replaceAll("'", '').replace(/\s+/g, ' ').trim();
  for (const family of ['primary', 'secondary']) {
    const angular = sass.match(new RegExp(`font-family-${family}:\\s*string\\.unquote\\(['"]([^'"]+)['"]\\)`));
    const standalone = css.match(new RegExp(`--font-family-${family}:([^;]+);?`));
    assert.ok(angular && standalone, `Missing ${family} family declaration`);
    assert.equal(normalize(angular[1]).replaceAll(', ', ','), normalize(standalone[1]).replaceAll(', ', ','), `${family} diverged between Angular and CSS`);
  }
});

test('guideline cards refer to existing files and metadata stays synchronized', () => {
  const manifest = JSON.parse(read(path.join(ds, '_ds_manifest.json')));
  const cards = [];
  function collect(value) {
    if (Array.isArray(value)) return value.forEach(collect);
    if (!value || typeof value !== 'object') return;
    if (typeof value.path === 'string' && value.path.startsWith('guidelines/')) cards.push(value);
    Object.values(value).forEach(collect);
  }
  collect(manifest);
  assert.ok(cards.length > 0, 'No guideline cards found');
  assert.equal(new Set(cards.map(c => c.path)).size, cards.length, 'Duplicate guideline path');
  for (const card of cards) {
    const filename = path.resolve(ds, card.path);
    assert.ok(filename.startsWith(ds + path.sep), `Path outside design system: ${card.path}`);
    const html = read(filename);
    const metadata = html.match(/<!--\s*@dsCard\s+([^]*?)-->/);
    assert.ok(metadata, `Missing metadata: ${card.path}`);
    for (const key of ['name', 'group', 'viewport', 'subtitle']) {
      const match = metadata[1].match(new RegExp(`${key}="([^"]*)"`));
      if (card[key] !== undefined) assert.equal(match?.[1], card[key], `${card.path}: ${key} differs from manifest`);
    }
  }
});

test('evaluation stylesheet does not distribute or fetch font binaries', () => {
  const css = read(path.join(ds, 'typography-menco.css')).replace(/\/\*[^]*?\*\//g, '');
  assert.doesNotMatch(css, /@import|@font-face|url\s*\(/i, 'Font delivery needs an explicit licensed adoption decision');
});

// --- Bundle, manifest and motion contracts -------------------------------------------------------

const crypto = require('node:crypto');
const reactRoot = path.join(repo, 'packages/react');
const bundleHeader = () => JSON.parse(read(path.join(ds, '_ds_bundle.js')).split('\n')[0].replace(/^\/\* @ds-bundle: /, '').replace(/ \*\/$/, ''));
const walk = (dir, found = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename, found);
    else found.push(filename);
  }
  return found;
};
// The bundle describes one flat project: components/ and ui_kits/ live in packages/react, the rest in the design system.
const projectFile = rel => path.join(/^(components|ui_kits)\//.test(rel) ? reactRoot : ds, rel);
// Sources under packages/react reach the design system through one extra `../…/design-system/`; the project folds it.
const projectSource = rel => {
  const text = read(projectFile(rel));
  if (!/^(components|ui_kits)\//.test(rel)) return text;
  const depth = rel.split('/').length - 1;
  return text.split(`${'../'.repeat(depth + 1)}design-system/`).join('../'.repeat(depth));
};
const customProperties = css => [...css.matchAll(/:root\s*\{([^}]*)\}/g)].flatMap(block => [...block[1].matchAll(/(--[\w-]+)\s*:/g)].map(match => match[1]));

test('the committed bundle was generated from the current sources', () => {
  const header = bundleHeader();
  const manifest = JSON.parse(read(path.join(ds, '_ds_manifest.json')));
  for (const [rel, expected] of Object.entries(header.sourceHashes)) {
    const actual = crypto.createHash('sha256').update(projectSource(rel)).digest('hex').slice(0, 12);
    assert.equal(actual, expected, `${rel} changed after the bundle was generated; run tools/design-system-bundle`);
  }
  const sources = ['components', 'ui_kits'].flatMap(folder => walk(path.join(reactRoot, folder))).filter(filename => filename.endsWith('.jsx'));
  for (const filename of sources) {
    const rel = path.relative(reactRoot, filename).split(path.sep).join('/');
    assert.ok(header.sourceHashes[rel], `${rel} is missing from the bundle`);
    if (!rel.startsWith('components/')) continue;
    for (const [, name] of read(filename).matchAll(/^export (?:function|const) (\w+)/gm)) {
      assert.ok(header.components.some(component => component.name === name && component.sourcePath === rel), `${name} (${rel}) is not exposed by the bundle`);
    }
  }
  assert.deepEqual(manifest.components, header.components, 'Manifest and bundle list different components');
});

test('global stylesheets in the manifest are the ones styles.css imports', () => {
  const manifest = JSON.parse(read(path.join(ds, '_ds_manifest.json')));
  const imports = [...read(path.join(ds, 'styles.css')).matchAll(/@import\s+"([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(manifest.globalCssPaths, [...imports, 'styles.css']);
  for (const css of imports) assert.ok(fs.existsSync(path.join(ds, css)), `styles.css imports a missing file: ${css}`);
  const declared = imports.flatMap(css => customProperties(read(path.join(ds, css))));
  assert.deepEqual(manifest.tokens.map(token => token.name), declared, 'Manifest tokens differ from the declared custom properties');
});

test('every motion token is declared once and every reference to one resolves', () => {
  const motion = read(path.join(ds, 'tokens/motion.css'));
  const declared = customProperties(motion);
  assert.ok(declared.length > 0 && declared.every(name => name.startsWith('--motion-')), 'tokens/motion.css must declare only --motion-* tokens');
  assert.equal(new Set(declared).size, declared.length, 'Duplicate motion token');
  const others = ['fonts', 'colors', 'typography', 'layout', 'components'].flatMap(name => customProperties(read(path.join(ds, `tokens/${name}.css`))));
  // Custom properties the utilities compute per element, not tokens.
  const computed = ['--motion-order', '--motion-scene-index', '--motion-delay'];
  const known = new Set([...declared, ...others, ...computed]);
  const family = walk(path.join(reactRoot, 'components/motion'));
  const consumers = [path.join(ds, 'tokens/motion.css'), path.join(ds, 'guidelines/motion.html'), ...family.filter(filename => /\.(jsx|html)$/.test(filename))];
  for (const filename of consumers) {
    for (const [, name] of read(filename).matchAll(/var\((--[\w-]+)/g)) assert.ok(known.has(name), `${path.relative(repo, filename)} reads undefined ${name}`);
  }
  // Rule 1 of the design-system layers: components name tokens instead of repeating values.
  for (const filename of family.filter(name => name.endsWith('.jsx'))) {
    const source = read(filename).replace(/\/\/.*$/gm, '');
    assert.doesNotMatch(source, /#[0-9a-f]{3,8}\b|\brgba?\(|\b\d*\.?\d+m?s\b/i, `${path.relative(repo, filename)} holds a literal colour or duration`);
  }
});

test('the React motion family only emits classes that motion.css defines', () => {
  const motion = read(path.join(ds, 'tokens/motion.css'));
  const defined = new Set([...motion.matchAll(/\.([a-z][\w-]*)/g)].map(match => match[1]));
  const types = read(path.join(reactRoot, 'components/motion/Motion.d.ts'));
  const union = (declaration, property) => {
    const match = declaration.match(new RegExp(`${property}\\?: ((?:'[\\w-]+'(?: \\| )?)+)`));
    assert.ok(match, `Missing ${property} union`);
    return [...match[1].matchAll(/'([\w-]+)'/g)].map(option => option[1]);
  };
  const reveal = types.match(/export interface RevealProps[^\n]*/)[0];
  const expected = [
    'motion', 'motion-stage', 'is-stepped', 'is-held',
    ...union(reveal, 'variant').filter(name => name !== 'none').map(name => `motion-${name}`),
    ...union(reveal, 'loop').map(name => `motion-loop-${name}`),
    ...union(reveal, 'hover').map(name => `motion-hover-${name}`),
    ...Array.from({ length: 12 }, (_, index) => [`motion-scene-${index + 1}`, `at-${index + 1}`]).flat(),
  ];
  for (const filename of walk(path.join(reactRoot, 'components/motion')).filter(name => name.endsWith('.jsx'))) {
    // Literal class names only: not --motion-* tokens, not the fixed part of a `motion-loop-${…}` template.
    for (const [name] of read(filename).matchAll(/(?<![\w-])motion-[a-z][a-z0-9-]*[a-z0-9]\b(?!-?\$)/g)) expected.push(name);
  }
  for (const name of new Set(expected)) assert.ok(defined.has(name), `.${name} is emitted by the React family but not defined in tokens/motion.css`);
});

test('motion switches off under reduced motion and never overshoots', () => {
  const motion = read(path.join(ds, 'tokens/motion.css'));
  const reduced = motion.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([^]*)\}\s*$/);
  assert.ok(reduced, 'Missing prefers-reduced-motion block');
  const off = reduced[1].match(/([^{}]+)\{animation:none!important\}/);
  assert.ok(off, 'Reduced motion must switch animations off');
  const selectors = off[1].split(',').map(selector => selector.trim());
  const loops = [...new Set([...motion.matchAll(/\.(motion-loop-[\w-]+)/g)].map(match => match[1]))];
  for (const name of ['motion', ...loops]) assert.ok(selectors.includes(`.${name}`), `.${name} keeps animating under reduced motion`);
  assert.match(reduced[1], /\.motion-hover-lift[^{]*\{transition:none!important\}/, 'Reduced motion must switch hover transitions off');
  for (const [, x1, y1, x2, y2] of motion.matchAll(/cubic-bezier\(([\d.]+),([\d.-]+),([\d.]+),([\d.-]+)\)/g)) {
    assert.ok([y1, y2].every(value => Number(value) >= 0 && Number(value) <= 1), `cubic-bezier(${x1},${y1},${x2},${y2}) overshoots: Beast motion has no bounce`);
  }
});
