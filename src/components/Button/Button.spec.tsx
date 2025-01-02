import { ThemeContextProvider } from 'contexts/ThemeContext';
import { Button } from '.';
import { expect, test } from '../../../tests/component/fixtures';

test('renders and clicks', async ({ mount }) => {
  let clicked = false;

  const component = await mount(
    <ThemeContextProvider>
      <Button onClick={() => (clicked = true)}>TEST</Button>
    </ThemeContextProvider>
  );

  await expect(component).toContainText('TEST');
  await component.click();
  expect(clicked).toBe(true);
});

test('shows clicked text', async ({ mount, page }) => {
  const component = await mount(
    <ThemeContextProvider>
      <Button clickedText="CLICKED">TEST</Button>
    </ThemeContextProvider>
  );

  await page.clock.install();

  await expect(component).toContainText('TEST');
  await expect(component.getByText('CLICKED')).not.toBeVisible();
  await component.click();
  await expect(component.getByText('CLICKED')).toBeVisible();

  if (test.info().project.name !== 'firefox') {
    await page.clock.runFor(3000);
    await expect(component.getByText('CLICKED')).not.toBeVisible();
  }
});
