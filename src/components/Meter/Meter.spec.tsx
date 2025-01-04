import { expect, test } from 'tests/component';
import { MeterGauge } from './MeterGauge';
import { MeterNumber } from './MeterNumber';

test('renders and updates meter gauge', async ({ mountWithThemeProvider }) => {
  const component = await mountWithThemeProvider(<MeterGauge />);

  await expect(component.getByLabel('Percentage meter')).toHaveAttribute('aria-valuenow', '0');

  const windowSize = await component.evaluate(() => [innerWidth, innerHeight]);

  await component.click({ position: { x: 0, y: 0 } });
  await expect(component.getByLabel('Percentage meter')).toHaveAttribute('aria-valuenow', '18');

  await component.click({ position: { x: windowSize[0] / 2, y: 0 } });
  await expect(component.getByLabel('Percentage meter')).toHaveAttribute('aria-valuenow', '50');

  await component.click({ position: { x: windowSize[0] - 1, y: 0 } });
  await expect(component.getByLabel('Percentage meter')).toHaveAttribute('aria-valuenow', '82');
});

test('renders and updates meter number', async ({ mountWithThemeProvider }) => {
  test.slow();

  const component = await mountWithThemeProvider(<MeterNumber />);

  await expect(component.getByText('%')).toHaveText('0%');

  const windowSize = await component.evaluate(() => [innerWidth, innerHeight]);

  await component.click({ position: { x: 0, y: 0 } });
  await expect(component.getByText('%')).toHaveText('0%');

  await component.click({ position: { x: windowSize[0] / 2, y: 0 } });
  await expect(component.getByText('%')).toHaveText('50%');

  await component.click({ position: { x: windowSize[0] - 1, y: 0 } });
  await expect(component.getByText('%')).toHaveText('100%');
});
