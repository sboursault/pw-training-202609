import { test } from "../support/fixtures";

test("Login ok", async ({ productPage, loginPage, productListPage }) => {
  await productPage.goto();
  await productPage.gotoAccount();
  await loginPage.login("tom@test.test", "tom@test.test");
  await productListPage.expectHeaderVisible();
  await productListPage.expectLoggedInUser("tom@test.test");
});

test("Mot de passe erroné", async ({ productPage, loginPage }) => {
  await productPage.goto();
  await productPage.gotoAccount();
  await loginPage.login("tom@test.test", "zut");
  await loginPage.expectHeaderVisible();
  await loginPage.expectWrongPasswordMessageVisible();
});
