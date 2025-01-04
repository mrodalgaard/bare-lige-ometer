import { AxeBuilder } from '@axe-core/playwright';
import { DefaultTheme } from 'styled-components';
import { expect, test } from './fixtures';
import { darkColorsRgb, lightColorsRgb } from './utils/colors';

const title = "BARE-LIGE-O'METER";

const lightOrDark: { colorScheme: 'light' | 'dark'; colors: DefaultTheme['colors'] }[] = [
  { colorScheme: 'light', colors: lightColorsRgb },
  { colorScheme: 'dark', colors: darkColorsRgb },
];

test('renders initial web app', async ({ page, baseURL }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(title.toLowerCase().replace("'", ''));
  await expect(page.locator('h1')).toHaveText(title);
  await expect(page).toHaveMeterValue(0);
  await expect(page).toHaveURL(String(baseURL));
});

lightOrDark.forEach(({ colorScheme, colors }) => {
  test(`shows text and value from query and click in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.clock.install();

    await page.goto('/?title=TEST&value=50');

    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[1]);
    await expect(page).toHaveMeterValue(50);
    await expect(page.locator('textarea')).toHaveText('TEST');

    // Fast forward to animation end before taking screenshot
    await page.clock.runFor(1000);

    await page.screenshot({
      path: `test-results/sceenshot-gauge-${test.info().project.name}-${colorScheme}.png`,
    });

    await page.fill('textarea', 'NEW TEXT');
    await expect(page).toHaveURL(/title=NEW\+TEXT/);

    const meterBoxWidth = (await page.getByLabel('Percentage meter').boundingBox())?.width ?? 0;

    await page.getByLabel('Percentage meter').click({ position: { x: 0, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[0]);
    await expect(page).toHaveMeterValue(16);
    await expect(page).toHaveURL(/value=16/);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

    await page.getByLabel('Percentage meter').click({ position: { x: meterBoxWidth / 2, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[1]);
    await expect(page).toHaveMeterValue(50);
    await expect(page).toHaveURL(/value=50/);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

    await page.getByLabel('Percentage meter').click({ position: { x: meterBoxWidth - 1, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[2]);
    await expect(page).toHaveMeterValue(84);
    await expect(page).toHaveURL(/value=84/);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
});

lightOrDark.forEach(({ colorScheme, colors }) => {
  test(`shows as number in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });

    await page.goto('/?title=TEST&value=50&meter=number');

    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[1]);
    await expect(page.getByText('50%')).toBeVisible();
    await expect(page.locator('textarea')).toHaveText('TEST');

    await page.screenshot({
      path: `test-results/sceenshot-meter-${test.info().project.name}-${colorScheme}.png`,
    });

    const meterBoxWidth = (await page.getByText('50%').boundingBox())?.width ?? 0;

    await page.getByText('50%').click({ position: { x: 0, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[0]);
    await expect(page.getByText('1%')).toHaveCSS('color', colors.meter[0]);
    await expect(page).toHaveURL(/value=1/);
    expect((await new AxeBuilder({ page }).exclude(['.meter']).analyze()).violations).toEqual([]);

    await page.getByText('1%').click({ position: { x: meterBoxWidth / 2, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[1]);
    await expect(page.getByText('50%')).toHaveCSS('color', colors.meter[1]);
    await expect(page).toHaveURL(/value=50/);
    expect((await new AxeBuilder({ page }).exclude(['.meter']).analyze()).violations).toEqual([]);

    await page.getByText('50%').click({ position: { x: meterBoxWidth - 1, y: 50 } });
    await expect(page.getByText(title)).toHaveCSS('color', colors.meter[2]);
    await expect(page.getByText('99%')).toHaveCSS('color', colors.meter[2]);
    await expect(page).toHaveURL(/value=99/);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
});

test('can change theme mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });

  await page.goto('/');

  await expect(page.getByText(title)).toHaveCSS('color', darkColorsRgb.primary);
  await expect(page.locator('body')).toHaveCSS('background-color', darkColorsRgb.background);

  await page.getByLabel('Change mode').click();
  await expect(page.getByText('light')).toBeVisible();
  await expect(page.getByText(title)).toHaveCSS('color', lightColorsRgb.primary);
  await expect(page.locator('body')).toHaveCSS('background-color', lightColorsRgb.background);

  await page.getByLabel('Change mode').click();
  await expect(page.getByText('dark')).toBeVisible();
  await expect(page.getByText(title)).toHaveCSS('color', darkColorsRgb.primary);
  await expect(page.locator('body')).toHaveCSS('background-color', darkColorsRgb.background);

  await page.getByLabel('Change mode').click();
  await expect(page.getByText('system')).toBeVisible();
  await expect(page.getByText(title)).toHaveCSS('color', darkColorsRgb.primary);
  await expect(page.locator('body')).toHaveCSS('background-color', darkColorsRgb.background);
});

test('can copy and share', async ({ page, baseURL, browserName }) => {
  for (const path of ['/', '/?title=123', '/?title=TEST&value=50']) {
    await page.goto(path);

    await page.getByLabel('Share').click();
    await expect(page.getByText('copied')).toBeVisible();
    if (browserName !== 'webkit') {
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`${baseURL}${path}`);
    }
  }
});

test('load on window resize', async ({ page }) => {
  await page.goto('/?title=TEST&value=50');

  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByLabel('Percentage meter')).toBeVisible();
  await expect(page.getByTestId('loader')).not.toBeVisible();

  await page.setViewportSize({ width: 320, height: 240 });
  await expect(page.getByText(title)).toBeVisible();
  await expect(page.getByLabel('Percentage meter')).not.toBeVisible();
  await expect(page.getByTestId('loader')).toBeVisible();
});

test('handles invalid query parameters', async ({ page }) => {
  await page.goto('/?title=undefined&value=200');
  await expect(page.locator('textarea')).toHaveText('undefined');
  await expect(page).toHaveMeterValue(100);

  await page.goto('/?title=+&value=KAMEL');
  await expect(page.locator('textarea')).toHaveValue(' ');
  await expect(page).toHaveMeterValue(0);

  await page.goto(
    '/?title=%24%7B123%7D%5C%5C%26amp%3B+%2B+%2Fquot%3BHELLOquot"+Robert%27%29%3B+DROP+TABLE+*%3B--+%F0%9F%A5%B3&value=-10'
  );
  await expect(page.locator('textarea')).toHaveText('${123}\\\\&amp; + /quot;HELLOquot" Robert\'); DROP TABLE *;-- 🥳');
  await expect(page).toHaveMeterValue(0);

  await page.goto('/?title=&value=');
  await expect(page.locator('textarea')).toHaveText('');
  await expect(page).toHaveMeterValue(0);
});
