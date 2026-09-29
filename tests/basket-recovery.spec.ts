import { test } from "../support/fixtures";

test("Recover basket", async ({
  productPage,
  workflow,
  basketAPI,
}) => {
  const username = "tom@test.test";
  const password = "tom@test.test";

  await basketAPI.clearBasket(username, password);

  // se connecter
  await workflow.login(username, password);

  // ajouter dans le panier
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectEmptyBasket();
  await productPage.addToBasket();
  await productPage.expectBasketCount(1);

  // se déconnecter
  await workflow.logout();
  await productPage.expectEmptyBasket();

  // se reconnecter
  await workflow.login(username, password);

  // -> je retrouve le produit dans le panier
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectBasketCount(1);
});
