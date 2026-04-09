import { expect, test } from "@playwright/test"

test.describe("Core Navigation", () => {
  test("landing page renders and key links are reachable", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByText("Smart Optimization Engine", { exact: false })).toBeVisible()

    await page.getByRole("link", { name: "Login" }).click()
    await expect(page).toHaveURL(/\/login/)

    await page.goto("/")
    await page.getByRole("link", { name: "Sign Up" }).click()
    await expect(page).toHaveURL(/\/signup/)
  })

  test("mobile menu button is visible on dashboard", async ({ page }) => {
    await page.goto("/login")
    await page.getByLabel("Email Address").fill("demo@example.com")
    await page.getByLabel("Password").fill("valid-password")
    await page.getByRole("button", { name: "Sign In" }).click()

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.getByRole("button").first()).toBeVisible()
  })
})
