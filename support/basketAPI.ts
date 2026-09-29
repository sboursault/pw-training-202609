import type { APIRequestContext } from "@playwright/test";

export class BasketAPI {
  constructor(private readonly request: APIRequestContext) {}

  async clearBasket(username: string, password: string) {
    const response = await this.request.delete("/api/basket/", {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
      },
    });

    if (!response.ok()) {
      throw new Error(
        `Failed to clear basket: ${response.status()} ${response.statusText()}`,
      );
    }
  }
}
