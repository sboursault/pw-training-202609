import { expect, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/fr/catalogue/the-hitchhikers-guide-to-the-galaxy_4/");
  }

  async expectBasketLabel(text: string) {
    await expect(this.page.locator("#top_page")).toContainText(text);
  }

  async addToBasket() {
    await this.page.getByRole("button", { name: "Ajouter au panier" }).click();
  }

  async expectBasketCount(count: number) {
    await expect(this.page.locator("#top_page")).toContainText(`Panier (${count})`);
  }

  async expectConfirmMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
