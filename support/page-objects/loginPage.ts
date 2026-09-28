import { expect, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.getByRole("textbox", { name: "Adresse électronique *" }).fill(email);
    await this.page.getByRole("textbox", { name: "Mot de passe *" }).fill(password);
    await this.page.getByRole("button", { name: "Connexion" }).click();
  }

  async expectHeaderVisible() {
    await expect(this.page.getByRole("heading", { name: "Connexion" })).toBeVisible();
  }

  async expectWrongPasswordMessageVisible() {
    await expect(this.page.getByText("Oups ! Nous avons trouvé des")).toBeVisible();
  }
}
