import { test } from "@playwright/test";
import { ProductPage } from "./page-objects/productPage";

test("add to basket from product page", async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();
  await productPage.expectBasketLabel("Panier");
  await productPage.addToBasket();
  await productPage.expectBasketCount(1);
  await productPage.expectConfirmMessage("× The Hitchhiker's Guide to");
});
