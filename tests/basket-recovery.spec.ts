import { test } from "../support/fixtures";

test("Recover basket", async ({
  productPage,
  loginPage,
  productListPage,
  page,
}) => {
  // se connecter
  await loginPage.goto();
  await loginPage.login("tom@test.test", "tom@test.test");
  await productListPage.expectLoggedInUser("tom@test.test");

  // ajouter dans le panier
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectEmptyBasket();
  await productPage.addToBasket();
  await productPage.expectBasketCount(1);

  // se déconnecter
  await page.goto("/fr/accounts/logout/");
  await productPage.expectEmptyBasket();

  // se reconnecter
  await loginPage.goto();
  await loginPage.login("tom@test.test", "tom@test.test");
  await productListPage.expectLoggedInUser("tom@test.test");

  // -> je retrouve le produit dans le panier
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectBasketCount(1);
});
