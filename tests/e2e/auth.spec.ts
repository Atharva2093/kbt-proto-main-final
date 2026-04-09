import { expect, test } from "@playwright/test"

test.describe("Authentication", () => {
  test("login with valid credentials redirects to dashboard", async ({ page }) => {
    await page.goto("/login")

    await page.getByLabel("Email Address").fill("demo@example.com")
    await page.getByLabel("Password").fill("valid-password")
    await page.getByRole("button", { name: "Sign In" }).click()

    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByRole("button", { name: /Project/i })).toBeVisible()
  })

  test("signup validation blocks submit for password mismatch", async ({ page }) => {
    await page.goto("/signup")

    await page.getByLabel("First Name").fill("Alex")
    await page.getByLabel("Last Name").fill("Smith")
    await page.getByLabel("Email Address").fill("alex@example.com")
    await page.getByLabel("Company").fill("Thermo Labs")
    await page.getByLabel("Password").fill("password123")
    await page.getByLabel("Confirm Password").fill("mismatch")
    await page.getByRole("checkbox", { name: /I agree to the/i }).check()

    await page.getByRole("button", { name: "Create Account" }).click()

    await expect(page.getByText("Passwords do not match")).toBeVisible()
    await expect(page).toHaveURL(/\/signup/)
  })

  test("unauthenticated user hitting dashboard is redirected to login", async ({ page }) => {
    await page.context().clearCookies()
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/\/login/)
  })
})
