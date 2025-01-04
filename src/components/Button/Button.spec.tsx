import { expect, test } from 'tests/component';
import { Button } from '.';

test('renders and clicks', async ({ mountWithThemeProvider }) => {
  let clicked = false;

  const component = await mountWithThemeProvider(<Button onClick={() => (clicked = true)}>TEST</Button>);

  await expect(component).toContainText('TEST');
  await component.click();
  expect(clicked).toBe(true);
});

test('shows clicked text', async ({ mountWithThemeProvider, page }) => {
  const component = await mountWithThemeProvider(<Button clickedText="CLICKED">TEST</Button>);

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
