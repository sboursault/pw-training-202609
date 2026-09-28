import { expect, type Page } from "@playwright/test";

export class ProductListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectProductsHeadingVisible() {
    await expect(this.page.getByRole("heading", { name: "All products" })).toBeVisible();
  }

  async expectLoggedInUser(email: string) {
    await expect(this.page.locator("#top_page")).toContainText(email);
  }

}