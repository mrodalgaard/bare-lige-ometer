import { expect, test } from 'tests/component';
import { ClickEffect } from '.';

test('calls back with click position', async ({ mountWithThemeProvider }) => {
  let clickPosition: [number, number] | undefined;

  const component = await mountWithThemeProvider(
    <ClickEffect onClickPosition={(position) => (clickPosition = position)}>
      <p style={{ width: '100vw', height: '100vh', textAlign: 'center', lineHeight: '100vh' }}>TEST</p>
    </ClickEffect>
  );

  await expect(component).toContainText('TEST');
  await component.click({ position: { x: 0, y: 0 } });
  expect(clickPosition).toEqual([0, 0]);

  const realWindowSize = [1280, 720];
  const windowSize = await component.evaluate(() => [innerWidth, innerHeight]);

  await component.click({ position: { x: windowSize[0] / 2, y: windowSize[1] / 2 } });
  expect(clickPosition).toEqual([realWindowSize[0] / 2, realWindowSize[1] / 2]);

  await component.click({ position: { x: windowSize[0] - 1, y: windowSize[1] - 1 } });
  expect(clickPosition).toEqual([realWindowSize[0] - 1, realWindowSize[1] - 1]);
});
