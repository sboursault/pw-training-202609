import { expect, type Page } from "@playwright/test";

export class ProductListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectHeaderVisible() {
    await expect(this.page.getByRole("heading", { name: "Tous les produits" })).toBeVisible();
  }

  async expectLoggedInUser(email: string) {
    await expect(this.page.locator("#top_page")).toContainText(email);
  }

}