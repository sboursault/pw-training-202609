import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./page-objects/loginPage";
import { ProductPage } from "./page-objects/productPage";
import { ProductListPage } from "./page-objects/product-list-page";

export type ProductPageFixture = {
  productPage: ProductPage;
};

export type LoginPageFixture = {
  loginPage: LoginPage;
};

export type ProductListPageFixture = {
  productListPage: ProductListPage;
};

export const test = base.extend<ProductPageFixture & LoginPageFixture & ProductListPageFixture>({
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
});

export { expect };
