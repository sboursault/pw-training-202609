import { test } from "../support/fixtures";

test("add to basket from product page", async ({ productPage }) => {
  await productPage.goto("the-hitchhikers-guide-to-the-galaxy_4");
  await productPage.expectEmptyBasket();
  await productPage.addToBasket();
  await productPage.expectBasketCount(1);
  await productPage.expectConfirmMessage("× The Hitchhiker's Guide to");
});
