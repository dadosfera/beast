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
