import { expect, test } from 'tests/component';
import { APP_TITLE } from 'util/constants';
import { ShareButton } from '.';

interface CustomWindow extends Window {
  _shareData?: ShareData;
}

test('adds url to clipboard', async ({ mountWithThemeProvider, browserName }) => {
  test.skip(browserName === 'webkit');

  const component = await mountWithThemeProvider(
    <>
      <p>Test</p>
      <ShareButton />
    </>
  );

  const href = await component.evaluate(() => location.href);

  await test.step('click share and read from window clipboard', async () => {
    await expect(component.getByLabel('Share')).toBeVisible();
    await component.getByLabel('Share').click();

    expect(await component.evaluate(() => navigator.clipboard.readText())).toBe(href);
  });

  await test.step('stub clipboard API to throw error', async () => {
    await component.evaluate(() => {
      navigator.clipboard.writeText('');
      navigator.clipboard.writeText = () => {
        throw new Error('Error');
      };
    });

    await component.getByLabel('Share').click();
    expect(await component.evaluate(() => navigator.clipboard.readText())).not.toBe(href);
  });
});

test('shares url', async ({ mountWithThemeProvider }) => {
  const component = await mountWithThemeProvider(
    <>
      <p>Test</p>
      <ShareButton />
    </>
  );

  const href = await component.evaluate(() => location.href);

  await test.step('stub web share api to resolve', async () => {
    await component.evaluate(() => {
      navigator.canShare = () => true;
      navigator.share = (shareData) => {
        (window as CustomWindow)._shareData = shareData;
        return Promise.resolve();
      };
    });

    await component.getByLabel('Share').click();
    expect(await component.evaluate(() => (window as CustomWindow)._shareData)).toEqual({
      title: APP_TITLE,
      url: href,
    });
  });

  await test.step('stub web share api to throw', async () => {
    await component.evaluate(() => {
      navigator.share = () => {
        throw new Error('AbortError');
      };
    });
    await component.getByLabel('Share').click();

    await component.evaluate(() => {
      navigator.share = () => {
        throw new Error('Error');
      };
    });
    await component.getByLabel('Share').click();
  });
});
