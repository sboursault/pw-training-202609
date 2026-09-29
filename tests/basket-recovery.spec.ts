import { test } from "../support/fixtures";

test("Recover basket", async ({
  productPage,
  loginPage,
  productListPage,
  page,
  basketAPI,
}) => {
  const username = "tom@test.test";
  const password = "tom@test.test";

  await basketAPI.clearBasket(username, password);

  // se connecter
  await loginPage.goto();
  await loginPage.login(username, password);
  await productListPage.expectLoggedInUser(username);

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
  await loginPage.login(username, password);
  await productListPage.expectLoggedInUser(username);

  // -> je retrouve le produit dans le panier
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectBasketCount(1);
});
