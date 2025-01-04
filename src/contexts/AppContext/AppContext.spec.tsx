import { expect, test } from 'tests/component';
import { AppContextStory, ModeAppContextStory, TitleAppContextStory, ValueAppContextStory } from './AppContext.story';

test('gets and sets title as query parameter', async ({ mountWithProviders, page }) => {
  await test.step('initial title and change', async () => {
    const component = await mountWithProviders(<TitleAppContextStory />);

    await expect(component.getByTestId('title')).toHaveText('');
    expect(page.url()).not.toContain('title');
    await component.getByRole('button').click();
    await expect(component.getByTestId('title')).toHaveText('New');
    expect(page.url()).toContain('title=New');
    await component.unmount();
  });

  await test.step('persist title in query', async () => {
    const component = await mountWithProviders(<TitleAppContextStory />);

    await expect(component.getByTestId('title')).toHaveText('New');
    expect(page.url()).toContain('title=New');
  });
});

test('gets and sets value as query parameter', async ({ mountWithProviders, page }) => {
  await test.step('initial value and change', async () => {
    const component = await mountWithProviders(<ValueAppContextStory />);

    await expect(component.getByTestId('value')).toHaveText('');
    expect(page.url()).not.toContain('value');
    await component.getByRole('button').click();
    await expect(component.getByTestId('value')).toHaveText('1');
    expect(page.url()).toContain('value=1');
    await component.unmount();
  });

  await test.step('persist title in query', async () => {
    const component = await mountWithProviders(<ValueAppContextStory />);

    await expect(component.getByTestId('value')).toHaveText('1');
    expect(page.url()).toContain('value=1');
  });
});

test('stores and rehydrates mode from local storage', async ({ mountWithProviders, page, context }) => {
  await page.emulateMedia({ colorScheme: 'light' });

  await test.step('initial mode state and toggle mode', async () => {
    const component = await mountWithProviders(<ModeAppContextStory />);

    await expect(component.getByTestId('mode')).toHaveText('system');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('dark');
    await component.unmount();
  });

  await test.step('rehydrate mode state', async () => {
    let component = await mountWithProviders(<ModeAppContextStory />);

    await expect(component.getByTestId('mode')).toHaveText('dark');
    await component.getByRole('button').click();
    await component.unmount();

    component = await mountWithProviders(<ModeAppContextStory />);
    await expect(component.getByTestId('mode')).toHaveText('light');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('system');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('dark');
    await component.unmount();
  });

  await test.step('clear local storage and rehydrate initial state', async () => {
    const component = await mountWithProviders(<ModeAppContextStory />);
    await expect(component.getByTestId('mode')).toHaveText('dark');

    const newPage = await context.newPage();
    await newPage.goto('/');
    await newPage.evaluate(() => localStorage.clear());
    await newPage.close();

    await expect(component.getByTestId('mode')).toHaveText('system');
  });
});

test('toggles mode intelligently', async ({ mountWithProviders, page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  const component = await mountWithProviders(<ModeAppContextStory />);

  await test.step('toggle between modes', async () => {
    await expect(component.getByTestId('theme')).toHaveText('light');
    await expect(component.getByTestId('mode')).toHaveText('system');
    await component.getByRole('button').click();
    await expect(component.getByTestId('theme')).toHaveText('dark');
    await expect(component.getByTestId('mode')).toHaveText('dark');
    await component.getByRole('button').click();
    await expect(component.getByTestId('theme')).toHaveText('light');
    await expect(component.getByTestId('mode')).toHaveText('light');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('system');
  });

  await test.step('change users preferred mode to dark while on system mode and test changes', async () => {
    await expect(component.getByTestId('theme')).toHaveText('light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(component.getByTestId('theme')).toHaveText('dark');

    await expect(component.getByTestId('theme')).toHaveText('dark');
    await expect(component.getByTestId('mode')).toHaveText('system');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('light');
    await component.getByRole('button').click();
    await expect(component.getByTestId('mode')).toHaveText('dark');
  });

  await test.step('change users preferred mode to light while on dark mode and test changes', async () => {
    await expect(component.getByTestId('theme')).toHaveText('dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(component.getByTestId('theme')).toHaveText('dark');

    await expect(component.getByTestId('mode')).toHaveText('dark');
    await component.getByRole('button').click();
    await expect(component.getByTestId('theme')).toHaveText('light');
    await expect(component.getByTestId('mode')).toHaveText('light');
    await component.getByRole('button').click();
    await expect(component.getByTestId('theme')).toHaveText('light');
    await expect(component.getByTestId('mode')).toHaveText('system');
  });
});

test('has reduced motion as state from media query', async ({ mountWithProviders, page }) => {
  await page.emulateMedia({ reducedMotion: null });
  const component = await mountWithProviders(<AppContextStory />);

  await expect(component.getByTestId('reduced-motion')).toHaveText('false');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(component.getByTestId('reduced-motion')).toHaveText('true');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(component.getByTestId('reduced-motion')).toHaveText('false');
});

test('handle browsers without match media support', async ({ mountWithProviders, page }) => {
  await page.evaluate(() => {
    (window.matchMedia as unknown) = undefined;
  });

  const component = await mountWithProviders(<AppContextStory />);
  await expect(component.getByTestId('mode')).toHaveText('system');
  await expect(component.getByTestId('reduced-motion')).toHaveText('false');
  await expect(component.getByTestId('theme')).toHaveText('light');
});
