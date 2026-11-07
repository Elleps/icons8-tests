import { expect, test } from '@playwright/test';
import { prepareIcons8Consent } from './helpers/consent';

test.describe('Icon search', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60_000);
    await prepareIcons8Consent(page);
  });

  test('Searching for "cat" opens a result with a loaded icon preview', async ({
    page
  }) => {
    const searchTerm = 'cat';
    const searchInput = page.locator('[data-test="search-input"]');

    await expect(searchInput).toBeVisible();

    await searchInput.fill(searchTerm);
    await searchInput.press('Enter');

    await expect(page).toHaveURL(
      `https://icons8.com/icons/set/${searchTerm.replace(/\s+/g, '--')}`
    );

    const firstIcon = page.locator('[data-test="grid-icon"]').first();

    await expect(firstIcon).toBeVisible();

    await firstIcon.click();

    const previewImage = page.locator('img.app-preview__image-origin');
    const animatedPreview = page.locator('.lottie-animation-container svg');

    await expect
      .poll(
        async () =>
          (await previewImage.isVisible()) ||
          (await animatedPreview.isVisible())
      )
      .toBe(true);

    if (await previewImage.isVisible()) {
      await expect(previewImage).toHaveAttribute('src', /\S+/);
      await expect
        .poll(() =>
          previewImage.evaluate(
            image => (image as HTMLImageElement).naturalWidth
          )
        )
        .toBeGreaterThan(0);

      return;
    }

    await expect(animatedPreview).toBeVisible();
  });
});
