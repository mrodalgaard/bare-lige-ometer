import { expect, test } from 'tests/component';
import { DebouncedWindowSizeStory } from './useDebouncedWindowSize.story';

test('loads on resize', async ({ mount, page }) => {
  const component = await mount(<DebouncedWindowSizeStory />);

  await expect(component.getByTestId('loading')).not.toBeVisible();

  page.setViewportSize({ width: 500, height: 250 });

  await expect(component.getByTestId('loading')).toBeVisible();
  await expect(component.getByTestId('size')).toHaveText('[500,250]');
  await expect(component.getByTestId('loading')).not.toBeVisible();

  page.setViewportSize({ width: 250, height: 250 });

  await expect(component.getByTestId('loading')).toBeVisible();
  await expect(component.getByTestId('size')).toHaveText('[250,250]');
});
