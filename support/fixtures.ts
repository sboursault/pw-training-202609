import { test as base, expect } from "@playwright/test";
import { ProductPage } from "./page-objects/productPage";

export type ProductPageFixture = {
  productPage: ProductPage;
};

export const test = base.extend<ProductPageFixture>({
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect };
