import { expect, test } from "@playwright/test";

test("login redirects to dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail").fill("admin@eram.local");
  await page.getByLabel("Senha").fill("eram123");
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole("heading", { name: "Visao geral" })).toBeVisible();
});
