const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const specimen = '/guidelines/typography-evaluation.html';
const fixture = fs.readFileSync(path.join(__dirname, 'fixtures/loader-test.woff'));
const fontFile = weight => ({ name: `menco_${weight}_normal.woff`, mimeType: 'font/woff', buffer: fixture });

// Functional CI is offline. The synthetic fixture tests FontFace/state handling,
// not the appearance, license or legibility of the real Menco font.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === 'http://127.0.0.1:4174') return route.continue();
    if (url.hostname === 'fonts.googleapis.com') return route.fulfill({ contentType: 'text/css', body: '' });
    return route.abort();
  });
});

test('default typography and brand tokens remain the shipped baseline', async ({ page }) => {
  await page.goto(specimen);
  const values = await page.locator('#baseline').evaluate(node => {
    const p = getComputedStyle(node.querySelector('.specimen p'));
    const title = getComputedStyle(node.querySelector('h2'));
    const button = getComputedStyle(node.querySelector('.actions button'));
    return { family: p.fontFamily.split(',')[0].replaceAll('"', ''), size: p.fontSize, weight: p.fontWeight, lineHeight: p.lineHeight, titleWeight: title.fontWeight, primary: button.backgroundColor, radius: button.borderRadius };
  });
  expect(values).toEqual({ family: 'Quicksand', size: '16px', weight: '400', lineHeight: '24px', titleWeight: '700', primary: 'rgb(23, 0, 162)', radius: '4px' });
});

test('Menco stylesheet is isolated and removing opt-in restores the baseline', async ({ page }) => {
  await page.route('**/typography-menco.css', route => route.fulfill({ contentType: 'text/css', body: '' }));
  await page.goto(specimen);
  const readStyles = selector => page.locator(selector).evaluate(node => [...node.querySelectorAll('h2,p,label,input,button,td')].map(element => {
    const style = getComputedStyle(element);
    return Object.fromEntries(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderRadius', 'display', 'visibility'].map(key => [key, style[key]]));
  }));
  const original = await readStyles('#baseline');
  const candidateBefore = await readStyles('#candidate');
  await page.addStyleTag({ path: path.resolve(__dirname, '../../packages/design-system/typography-menco.css') });
  expect(await readStyles('#baseline')).toEqual(original);
  await expect(page.locator('#candidate .specimen p').first()).toHaveCSS('font-weight', '300');
  expect(await page.locator('#candidate .specimen p').first().evaluate(n => getComputedStyle(n).fontFamily)).toMatch(/^Menco|^"Menco"/);
  await page.locator('#candidate').evaluate(n => n.removeAttribute('data-beast-typography'));
  expect(await readStyles('#candidate')).toEqual(candidateBefore);
});

test('missing fonts never report a valid comparison', async ({ page }) => {
  await page.goto(specimen);
  await expect(page.locator('#quicksand-status')).toHaveAttribute('data-ready', 'false');
  await expect(page.locator('#quicksand-status')).toContainText('fallback');
  await expect(page.locator('#menco-status')).toHaveAttribute('data-ready', 'false');
  await expect(page.locator('#menco-status')).toContainText('fallback');
});

test('Menco roles use real available weights while preserving the type scale', async ({ page }) => {
  await page.goto(specimen);
  const roles = [
    ['h1', '900'], ['h2', '900'], ['h3', '700'], ['h4', '700'], ['h5', '700'], ['h6', '700'],
    ['subtitle', '500'], ['subtitle-2', '500'], ['paragraph', '300'], ['paragraph-2', '300'],
    ['label', '700'], ['caption', '300'], ['caption-2', '500'],
  ];
  const matrix = await page.evaluate(roles => {
    const samples = {};
    for (const id of ['baseline', 'candidate']) {
      const container = document.createElement('div');
      document.querySelector('#' + id).append(container);
      samples[id] = roles.map(([role]) => {
        const element = document.createElement('div');
        element.className = role;
        element.textContent = 'Dados — ação 0123456789';
        container.append(element);
        const style = getComputedStyle(element);
        return { role, weight: style.fontWeight, size: style.fontSize, lineHeight: style.lineHeight };
      });
    }
    return samples;
  }, roles);
  expect(matrix.candidate.map(value => [value.role, value.weight])).toEqual(roles);
  expect(matrix.candidate.map(({ size, lineHeight }) => ({ size, lineHeight })))
    .toEqual(matrix.baseline.map(({ size, lineHeight }) => ({ size, lineHeight })));
  await expect(page.locator('#candidate .actions button').first()).toHaveCSS('font-weight', '700');
  await expect(page.locator('#candidate')).toHaveCSS('font-synthesis', 'none');
});

test('invalid names and corrupt font bytes are rejected', async ({ page }) => {
  await page.goto(specimen);
  await page.locator('#font-files').setInputFiles({ name: 'unrelated.woff2', mimeType: 'font/woff2', buffer: fixture });
  await expect(page.locator('#loader-status')).toContainText('ignorado');
  await page.locator('#font-files').setInputFiles({ name: 'menco_300_normal.woff2', mimeType: 'font/woff2', buffer: Buffer.from('not a font') });
  await expect(page.locator('#loader-status')).toContainText('não foi possível carregar');
  await expect(page.locator('#menco-status')).toHaveAttribute('data-ready', 'false');
});

test('all four weights are required, reloads do not duplicate faces or upload files', async ({ page }) => {
  const writes = [], errors = [];
  page.on('request', r => { if (r.method() !== 'GET') writes.push(r.method() + ' ' + r.url()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(specimen);
  await page.locator('#font-files').setInputFiles(fontFile(300));
  await expect(page.locator('#menco-status')).toContainText('500, 700, 900');
  await expect(page.locator('#menco-status')).toHaveAttribute('data-ready', 'false');
  await page.locator('#font-files').setInputFiles([500, 700, 900].map(fontFile));
  await expect(page.locator('#menco-status')).toHaveAttribute('data-ready', 'true');
  await page.evaluate(() => { window.previousTestFace = [...document.fonts].find(face => face.family === 'Menco' && face.weight === '300'); });
  await page.locator('#font-files').setInputFiles(fontFile(300));
  await expect.poll(() => page.evaluate(() => [...document.fonts].filter(face => face.family === 'Menco' && face.weight === '300' && face !== window.previousTestFace).length)).toBe(1);
  await expect.poll(() => page.evaluate(() => [...document.fonts].filter(face => face.family === 'Menco').length)).toBe(4);
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});

test('export reports the actual fallback, loaded weights and active controls', async ({ page }) => {
  await page.goto(specimen);
  await page.locator('#font-files').setInputFiles([300, 500, 700, 900].map(fontFile));
  await expect(page.locator('#menco-status')).toHaveAttribute('data-ready', 'true');
  await page.locator('#spacing').check();
  await page.locator('#scale').check();
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar observações técnicas' }).click();
  const download = await pending;
  const data = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
  expect(download.suggestedFilename()).toBe('beast-typography-observations.json');
  expect(data).toMatchObject({ quicksandLoaded: false, mencoWeightsLoaded: [300, 500, 700, 900], spacingOverride: true, scale200Percent: true });
  expect(data.specimens.map(s => s.profile)).toEqual(['baseline', 'candidate']);
  expect(data.interpretation).toContain('não são resultados de pesquisa');
});

test('labels, keyboard order and the 12 px caption remain usable', async ({ page }) => {
  await page.goto(specimen);
  for (const id of ['baseline', 'candidate']) {
    const article = page.locator('#' + id);
    await expect(article.locator('.specimen .small')).toHaveCSS('font-size', '12px');
    await article.locator('.specimen label').click();
    await expect(article.getByRole('textbox')).toBeFocused();
  }
  await page.locator('#font-files').focus();
  for (const id of ['spacing', 'scale', 'download']) {
    await page.keyboard.press('Tab');
    await expect(page.locator('#' + id)).toBeFocused();
  }
});

for (const scenario of [
  { name: 'desktop', width: 1440, height: 1100, expanded: false },
  { name: 'mobile', width: 390, height: 844, expanded: false },
  { name: 'mobile with spacing and 200% CSS zoom', width: 390, height: 844, expanded: true },
]) {
  test(`content remains accessible on ${scenario.name} with fallback fonts`, async ({ page }) => {
    await page.setViewportSize({ width: scenario.width, height: scenario.height });
    await page.goto(specimen);
    if (scenario.expanded) {
      await page.locator('#spacing').check();
      await page.locator('#scale').check();
    }
    const overflow = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll('.specimen h2,.specimen p,.specimen label,.actions button')].filter(n => n.scrollWidth > n.clientWidth + 1 || n.scrollHeight > n.clientHeight + 1).map(n => n.textContent),
    }));
    expect(overflow).toEqual({ page: false, clipped: [] });
    for (const region of await page.getByRole('region', { name: 'Tabela de métricas de exemplo' }).all()) {
      if (await region.evaluate(n => n.scrollWidth > n.clientWidth)) {
        await region.focus();
        await page.keyboard.press('ArrowRight');
        await expect.poll(() => region.evaluate(n => n.scrollLeft)).toBeGreaterThan(0);
      }
    }
  });
}
