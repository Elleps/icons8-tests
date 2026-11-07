import { expect, test } from '@playwright/test';

test('Icons page responds successfully', async ({ page }) => {
  const response = await page.goto('https://icons8.com/icons');

  expect(response).not.toBeNull();
  expect(response!.status()).toBeLessThan(400);
});
