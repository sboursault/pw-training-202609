import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/en-gb/catalogue/');
})

test('Login ok', async ({ page }) => {
  const link = page.getByRole('link', { name: ' Account' });
  await link.click();
  await page.getByRole('textbox', { name: 'Email address *' }).fill('tom@test.test');
  await page.getByRole('textbox', { name: 'Password *' }).fill('tom@test.test');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByRole('heading', { name: 'All products' })).toBeVisible();
  await expect(page.locator('#top_page')).toContainText('TOM@test.test');
});

test('Mot de passe erroné', async ({ page }) => {
  await page.goto('/fr/catalogue/the-hitchhikers-guide-to-the-galaxy_4/');
  await page.getByRole('link', { name: ' Compte' }).click();
  await page.getByRole('textbox', { name: 'Adresse électronique *' }).fill('tom@test.test');
  await page.getByRole('textbox', { name: 'Mot de passe *' }).fill('zut');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
  await expect(page.getByText('Oups ! Nous avons trouvé des')).toBeVisible();
});
