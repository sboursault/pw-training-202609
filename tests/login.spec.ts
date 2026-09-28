import { test, expect } from '@playwright/test';

test('Login ok', async ({ page }) => {
  await page.goto('/fr/catalogue/the-hitchhikers-guide-to-the-galaxy_4/');
  await page.getByRole('link', { name: ' Compte' }).click();
  await page.getByRole('textbox', { name: 'Adresse électronique *' }).fill('tom@test.test');
  await page.getByRole('textbox', { name: 'Mot de passe *' }).fill('tom@test.test');
  await page.getByRole('button', { name: 'Connexion' }).click();
  await expect(page.getByRole('heading', { name: 'All products' })).toBeVisible();
  await expect(page.locator('#top_page')).toContainText('tom@test.test');
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
