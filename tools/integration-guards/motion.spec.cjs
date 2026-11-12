const { test, expect } = require('@playwright/test');
const path = require('node:path');

const card = '/guidelines/motion.html';
const deck = '/__fixtures/deck.html';
const umd = name => path.join(__dirname, 'node_modules', name, 'umd', `${name}.development.js`);

// The deck fixture renders the committed bundle with React from node_modules, so the suite stays offline.
// Three slides: two with two sub-scenes each, one without sub-scenes.
const deckFixture = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Deck fixture</title>
<link rel="stylesheet" href="/styles.css">
<script src="/__fixtures/react.js"></script><script src="/__fixtures/react-dom.js"></script><script src="/_ds_bundle.js"></script>
</head><body><div id="root"></div><script>
const DS = window.BeastDadosferaDesignSystem_d7d0ae;
const h = React.createElement;
const { Deck, Slide, Scene, Reveal } = DS;
ReactDOM.createRoot(document.getElementById('root')).render(
  h(Deck, { defaultMode: 'scenes', style: { width: 960, height: 540 } },
    h(Slide, { title: 'Um', scenes: 2 },
      h(Scene, { index: 1, id: 's1a' }, h(Reveal, null, 'primeira')),
      h(Scene, { index: 2, id: 's1b' }, h(Reveal, null, 'segunda'))),
    h(Slide, { title: 'Dois', scenes: 2 },
      h(Scene, { index: 1, id: 's2a' }, h(Reveal, null, 'terceira')),
      h(Scene, { index: 2, id: 's2b' }, h(Reveal, null, 'quarta'))),
    h(Slide, { title: 'Três' }, h(Reveal, { id: 's3' }, 'fim'))));
</script></body></html>`;

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === 'http://127.0.0.1:4174') return route.continue();
    if (url.hostname === 'fonts.googleapis.com') return route.fulfill({ contentType: 'text/css', body: '' });
    return route.abort();
  });
  await page.route('**/__fixtures/react.js', route => route.fulfill({ contentType: 'text/javascript', path: umd('react') }));
  await page.route('**/__fixtures/react-dom.js', route => route.fulfill({ contentType: 'text/javascript', path: umd('react-dom') }));
  await page.route('**/__fixtures/deck.html', route => route.fulfill({ contentType: 'text/html', body: deckFixture }));
});

const seconds = value => value.split(',').map(part => Number.parseFloat(part));
const scenes = page => page.locator('#stage').evaluate(stage => [...stage.querySelectorAll('[class*="motion-scene-"]')].map(scene => ({
  visibility: getComputedStyle(scene).visibility,
  entrance: getComputedStyle(scene.querySelector('.motion')).animationName,
  delay: getComputedStyle(scene.querySelector('.motion')).animationDelay,
})));

test('motion tokens resolve to the documented values', async ({ page }) => {
  await page.goto(card);
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    const names = ['--motion-duration-instant', '--motion-duration-enter', '--motion-stagger', '--motion-scene-gap', '--motion-ease-enter', '--motion-pulse-color', '--motion-lift-shadow'];
    return Object.fromEntries(names.map(name => [name, style.getPropertyValue(name).trim()]));
  });
  expect(tokens).toMatchObject({ '--motion-duration-instant': '.15s', '--motion-duration-enter': '.55s', '--motion-stagger': '90ms', '--motion-scene-gap': '540ms', '--motion-ease-enter': 'cubic-bezier(.2,.7,.2,1)' });
  // Colour and elevation come from existing tokens: nothing unresolved may be left.
  expect(tokens['--motion-pulse-color']).toMatch(/^rgba\(/);
  expect(tokens['--motion-lift-shadow']).not.toContain('var(');
});

test('a stepped stage hides each sub-scene until its step and shows it after', async ({ page }) => {
  await page.goto(card);
  let state = await scenes(page);
  expect(state.map(scene => scene.visibility)).toEqual(['visible', 'hidden', 'hidden']);
  expect(state.map(scene => scene.entrance)).toEqual(['beast-rise', 'none', 'none']);
  await page.locator('#next').click();
  state = await scenes(page);
  expect(state.map(scene => scene.visibility)).toEqual(['visible', 'visible', 'hidden']);
  // The entrance of a scene starts when the scene is revealed, not when the page loaded.
  expect(state[1].entrance).toBe('beast-rise');
  await expect(page.locator('#stage .motion-scene-2')).toHaveCSS('opacity', '1');
  await expect(page.locator('#status')).toHaveText('Cena 2 de 3');
  await page.locator('#back').click();
  expect((await scenes(page)).map(scene => scene.visibility)).toEqual(['visible', 'hidden', 'hidden']);
});

test('without steps every sub-scene plays on entry, each one scene-gap after the previous', async ({ page }) => {
  await page.goto(card);
  expect((await scenes(page)).map(scene => seconds(scene.delay)[0])).toEqual([0, 0, 0]);
  await page.locator('#mode').click();
  const state = await scenes(page);
  expect(state.map(scene => scene.visibility)).toEqual(['visible', 'visible', 'visible']);
  expect(state.map(scene => seconds(scene.delay)[0])).toEqual([0.54, 1.08, 1.62]);
  // Inside a scene the stagger still counts from the scene's own start.
  const second = await page.locator('#stage .motion-scene-3 .motion-delay-1').evaluate(node => getComputedStyle(node).animationDelay);
  expect(seconds(second)[0]).toBeCloseTo(1.71, 5);
});

test('a held stage suspends entrances and releasing it restarts them', async ({ page }) => {
  await page.goto(card);
  const entrances = () => page.locator('#demo').evaluate(demo => [...demo.querySelectorAll('.motion')].map(node => {
    const style = getComputedStyle(node);
    return [style.animationName, style.opacity];
  }));
  await page.evaluate(() => Promise.all(document.getAnimations().filter(animation => animation.effect.getComputedTiming().iterations === 1).map(animation => animation.finished)));
  await page.locator('#demo').evaluate(demo => demo.classList.add('is-held'));
  for (const [name, opacity] of await entrances()) expect([name, opacity]).toEqual(['none', '0']);
  await page.locator('#demo').evaluate(demo => demo.classList.remove('is-held'));
  for (const [name] of await entrances()) expect(name).toMatch(/^beast-/);
  const running = await page.locator('#demo').evaluate(demo => [...demo.querySelectorAll('.motion')].every(node => node.getAnimations().some(animation => animation.playState === 'running')));
  expect(running).toBe(true);
});

test('an entrance leaves nothing behind, so hover feedback still applies', async ({ page }) => {
  await page.goto(card);
  await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.id = 'probe';
    probe.className = 'motion motion-rise motion-hover-lift';
    probe.style.cssText = 'width:120px;height:40px';
    document.body.prepend(probe);
    return Promise.all(probe.getAnimations().map(animation => animation.finished));
  });
  await expect(page.locator('#probe')).toHaveCSS('transform', 'none');
  await page.locator('#probe').hover();
  await expect(page.locator('#probe')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -3)');
});

test('a combined entrance and loop start one after the other', async ({ page }) => {
  await page.goto(card);
  const delays = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.className = 'motion motion-pop-pulse motion-delay-2';
    document.body.prepend(probe);
    const style = getComputedStyle(probe);
    return { names: style.animationName, delays: style.animationDelay };
  });
  expect(delays.names).toBe('beast-pop, beast-pulse');
  const [entrance, loop] = seconds(delays.delays);
  expect(entrance).toBeCloseTo(0.18, 5);
  expect(loop).toBeCloseTo(0.63, 5);
});

test('reduced motion switches animations and transitions off and keeps the steps', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(card);
  const styles = await page.evaluate(() => ({
    animations: [...new Set([...document.querySelectorAll('.motion,[class*="motion-loop-"]')].map(node => getComputedStyle(node).animationName))],
    transitions: [...new Set([...document.querySelectorAll('.motion-hover-lift,.motion-hover-tint')].map(node => getComputedStyle(node).transitionDuration))],
    running: document.getAnimations().length,
  }));
  expect(styles).toEqual({ animations: ['none'], transitions: ['0s'], running: 0 });
  expect((await scenes(page)).map(scene => scene.visibility)).toEqual(['visible', 'hidden', 'hidden']);
  await page.locator('#next').click();
  await expect(page.locator('#stage .motion-scene-2')).toBeVisible();
  await expect(page.locator('#stage .motion-scene-2')).toHaveCSS('opacity', '1');
});

test('the bundle loads without errors and exposes the motion family', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.goto(deck);
  const exposed = await page.evaluate(() => {
    const DS = window.BeastDadosferaDesignSystem_d7d0ae;
    return { errors: DS.__errors, family: ['Reveal', 'Stagger', 'MotionStage', 'Scene', 'Deck', 'Slide', 'DeckNav'].filter(name => typeof DS[name] !== 'function') };
  });
  expect(exposed).toEqual({ errors: [], family: [] });
  expect(errors).toEqual([]);
});

test('Deck reveals scene by scene, then slide by slide, and previous lands on the last scene', async ({ page }) => {
  await page.goto(deck);
  const live = page.locator('[aria-live="polite"]');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Um');
  await expect(live).toHaveText('Slide 1 de 3, cena 1 de 2');
  await expect(page.locator('#s1a')).toBeVisible();
  await expect(page.locator('#s1b')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Slide anterior' })).toBeDisabled();

  await page.getByRole('button', { name: 'Próxima cena' }).click();
  await expect(page.locator('#s1b')).toBeVisible();
  await expect(live).toHaveText('Slide 1 de 3, cena 2 de 2');

  await page.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dois');
  await expect(page.locator('#s2a')).toBeVisible();
  await expect(page.locator('#s2b')).toBeHidden();

  await page.getByRole('button', { name: 'Slide anterior' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Um');
  await expect(page.locator('#s1a')).toBeVisible();
  await expect(page.locator('#s1b')).toBeVisible();
  await expect(live).toHaveText('Slide 1 de 3, cena 2 de 2');

  await page.getByRole('button', { name: 'Cena anterior' }).click();
  await expect(page.locator('#s1b')).toBeHidden();
});

test('the reveal toggle switches a deck between sub-scenes and everything on entry', async ({ page }) => {
  await page.goto(deck);
  const toggle = page.getByRole('button', { name: 'Revelar por cenas' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#s1b')).toBeVisible();
  await expect(page.locator('[aria-live="polite"]')).toHaveText('Slide 1 de 3');
  await page.getByRole('button', { name: 'Próximo slide' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dois');
  await expect(page.locator('#s2b')).toBeVisible();
  await toggle.click();
  await expect(page.locator('#s2b')).toBeHidden();
});

test('keys act only while focus is inside the deck and a focused button keeps its own Space', async ({ page }) => {
  await page.goto(deck);
  const live = page.locator('[aria-live="polite"]');
  await page.keyboard.press('ArrowRight');
  await expect(live).toHaveText('Slide 1 de 3, cena 1 de 2');
  await page.getByRole('region', { name: 'Apresentação' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(live).toHaveText('Slide 1 de 3, cena 2 de 2');
  await page.keyboard.press('ArrowLeft');
  await expect(live).toHaveText('Slide 1 de 3, cena 1 de 2');
  await page.getByRole('button', { name: 'Próxima cena' }).focus();
  await page.keyboard.press('Space');
  await expect(live).toHaveText('Slide 1 de 3, cena 2 de 2');
  await page.getByRole('region', { name: 'Apresentação' }).focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Três');
  await expect(live).toHaveText('Slide 3 de 3');
  await expect(page.getByRole('button', { name: 'Próximo slide' })).toBeDisabled();
});

test('replay restarts the entrances of the current slide', async ({ page }) => {
  await page.goto(deck);
  await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished)));
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.getByRole('button', { name: 'Repetir animações' }).click();
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBeGreaterThan(0);
  await expect(page.locator('.motion-stage')).not.toHaveClass(/is-held/);
});
