import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./page-objects/loginPage";
import { ProductPage } from "./page-objects/productPage";
import { ProductListPage } from "./page-objects/product-list-page";
import { BasketAPI } from "./basketAPI";
import { Workflow } from "./workflow";

export type ProductPageFixture = {
  productPage: ProductPage;
};

export type LoginPageFixture = {
  loginPage: LoginPage;
};

export type ProductListPageFixture = {
  productListPage: ProductListPage;
};

export type BasketAPIFixture = {
  basketAPI: BasketAPI;
};

export type WorkflowFixture = {
  workflow: Workflow;
};

export const test = base.extend<ProductPageFixture & LoginPageFixture & ProductListPageFixture & BasketAPIFixture & WorkflowFixture>({
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productListPage: async ({ page }, use) => {
    await use(new ProductListPage(page));
  },
  basketAPI: async ({ request }, use) => {
    await use(new BasketAPI(request));
  },
  workflow: async ({ loginPage, productListPage, page }, use) => {
    await use(new Workflow(loginPage, productListPage, page));
  },
});

export { expect };
