import { expect, type Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(product: string) {
    await this.page.goto("/fr/catalogue/" + product + "/");
  }

  async gotoAccount() {
    await this.page.getByRole("link", { name: " Compte" }).click();
  }

  async expectEmptyBasket() {
    await expect(this.page.locator("#top_page")).toContainText("Panier");
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
