import { expect, test } from 'tests/component';
import { ThemeContextStory } from './ThemeContext.story';
import { darkColors, lightColors } from './theme';

test('set theme colors depending on mode', async ({ mountWithProviders, page }) => {
  page.emulateMedia({ colorScheme: 'light' });

  const component = await mountWithProviders(<ThemeContextStory />);

  await expect(component.getByTestId('font')).toHaveText('Titan One');
  await expect(component.getByTestId('primary')).toHaveText(lightColors.primary);
  await component.getByRole('button').click();
  await expect(component.getByTestId('primary')).toHaveText(darkColors.primary);
});
