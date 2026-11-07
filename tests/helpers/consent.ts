import { expect, type Page } from '@playwright/test';

export async function prepareIcons8Consent(page: Page) {
  await page.goto('https://icons8.com/icons', {
    waitUntil: 'domcontentloaded'
  });

  const consentRoot = page.locator('.fc-consent-root');
  const hasConsentDialog = await consentRoot
    .waitFor({ state: 'visible', timeout: 15_000 })
    .then(
      () => true,
      () => false
    );

  if (!hasConsentDialog) return;

  const preferencesDialog = consentRoot.locator('.fc-data-preferences-dialog');

  if (!(await preferencesDialog.isVisible()))
    await consentRoot.locator('.fc-cta-manage-options').click();

  await expect(preferencesDialog).toBeVisible();

  const optionalPurposeToggles = preferencesDialog.locator(
    '.fc-preference-consent.purpose[aria-pressed="true"]:not([disabled]), .fc-preference-legitimate-interest.purpose[aria-pressed="true"]:not([disabled])'
  );

  const toggleCount = await optionalPurposeToggles.count();

  for (let i = 0; i < toggleCount; i++)
    await optionalPurposeToggles
      .first()
      .locator('xpath=ancestor::label[1]')
      .click();

  await preferencesDialog.locator('.fc-confirm-choices').click();

  await expect(consentRoot).toBeHidden();
}
