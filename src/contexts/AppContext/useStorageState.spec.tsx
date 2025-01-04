import { expect, test } from 'tests/component';
import { NumberStorageStateStory, ObjectStorageStateStory, StringStorageStateStory } from './useStorageState.story';

test('store and rehydrate state from local storage', async ({ mount, context }) => {
  await test.step('change state', async () => {
    const component = await mount(<StringStorageStateStory />);

    await expect(component.getByTestId('header')).toHaveText('John Doe');
    component.getByRole('button').click();
    await expect(component.getByTestId('header')).toHaveText('Jane Doe');
    await component.unmount();
  });

  await test.step('persist state', async () => {
    const component = await mount(<StringStorageStateStory />);

    await expect(component.getByTestId('header')).toHaveText('Jane Doe');
    await component.unmount();
  });

  await test.step('clear state', async () => {
    const component = await mount(<StringStorageStateStory />);

    await expect(component.getByTestId('header')).toHaveText('Jane Doe');

    const newPage = await context.newPage();
    await newPage.goto('/');
    await newPage.evaluate(() => localStorage.clear());
    await newPage.close();

    await expect(component.getByTestId('header')).toHaveText('John Doe');
    await component.unmount();
  });
});

test('store and rehydrate object from local storage', async ({ mount }) => {
  const component = await mount(<ObjectStorageStateStory />);

  await expect(component.getByTestId('header')).toHaveText('{"name":"Jane Doe","skills":["skill1","skill2"]}');
  component.getByRole('button').click();
  await expect(component.getByTestId('header')).toHaveText('{"name":"Jane Doe","skills":["skill1","skill2"],"age":30}');
  await component.unmount();

  const component2 = await mount(<ObjectStorageStateStory />);

  await expect(component2.getByTestId('header')).toHaveText(
    '{"name":"Jane Doe","age":30,"skills":["skill1","skill2"]}'
  );
});

test('subscribes on storage changes', async ({ mount, page }) => {
  const component = await mount(<NumberStorageStateStory />);

  await expect(component.getByTestId('header')).toHaveText('123');
  component.getByRole('button').click();
  await expect(component.getByTestId('header')).toHaveText('321');

  await page.evaluate(() =>
    dispatchEvent(new StorageEvent('storage', { key: 'number', newValue: '456', oldValue: '321' }))
  );
  await expect(component.getByTestId('header')).toHaveText('456');

  await page.evaluate(() =>
    dispatchEvent(new StorageEvent('storage', { key: 'number', newValue: '789', oldValue: '456' }))
  );
  await expect(component.getByTestId('header')).toHaveText('789');
});

test('handles invalid data', async ({ mount, page }) => {
  const component = await mount(<NumberStorageStateStory />);

  await expect(component.getByTestId('header')).toHaveText('123');

  await page.evaluate(() =>
    dispatchEvent(new StorageEvent('storage', { key: 'number', newValue: 'hello', oldValue: '123' }))
  );
  await expect(component.getByTestId('header')).toHaveText('123');

  await page.evaluate(() =>
    dispatchEvent(new StorageEvent('storage', { key: 'number', newValue: 'NaN', oldValue: '123' }))
  );
  await expect(component.getByTestId('header')).toHaveText('123');
});
