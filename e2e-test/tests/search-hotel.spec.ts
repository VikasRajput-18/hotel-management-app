import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(
    page.getByRole("heading", { name: "Sign In to your account" })
  ).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Signed in Successful!")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  //   await page.locator("[name=destination]").fill("Test City");
  await page
    .getByRole("textbox", { name: "Where are you going?" })
    .fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Test City")).toBeVisible();
  await expect(page.getByRole("link", { name: "Test Hotel" })).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page
    .getByRole("textbox", { name: "Where are you going?" })
    .fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "Test Hotel" }).click();

  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);
  await page
    .getByRole("textbox", { name: "Where are you going?" })
    .fill("Test City");
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("link", { name: "Test Hotel" }).click();

  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost : $300.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("430");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  // await expect(page.getByText("Booking Saved!")).toBeVisible();

  await page.getByRole("link" , {name : "My Bookings"}).click()
  await expect(page.getByText("Test Hotel")).toBeVisible()
});
