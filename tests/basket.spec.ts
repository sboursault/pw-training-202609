import { test, expect } from '@playwright/test';

test('add to basket from product page', async ({ page }) => {
  await page.goto('/fr/catalogue/the-hitchhikers-guide-to-the-galaxy_4/');
  await expect(page.locator('#top_page')).toContainText('Panier');
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  await expect(page.locator('#top_page')).toContainText('Panier (1)');
  await expect(page.getByText('× The Hitchhiker\'s Guide to')).toBeVisible();
});