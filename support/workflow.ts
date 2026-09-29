import type { Page } from "@playwright/test";
import { LoginPage } from "./page-objects/loginPage";
import { ProductListPage } from "./page-objects/product-list-page";

export class Workflow {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly productListPage: ProductListPage,
    private readonly page: Page,
  ) {}

  async login(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
    await this.productListPage.expectLoggedInUser(username);
  }

  async logout() {
    await this.page.goto("/fr/accounts/logout/");
  }
}