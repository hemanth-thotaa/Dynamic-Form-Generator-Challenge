import { test, expect } from '@playwright/test';

test('submit form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Form submitted successfully!')).toBeVisible();
});
