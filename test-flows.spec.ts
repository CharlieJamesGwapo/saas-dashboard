import { test, expect, chromium } from '@playwright/test';

test.describe('SaaS Dashboard E2E Tests', () => {
  const BASE_URL = 'http://localhost:3000';
  const TEST_EMAIL = 'test@example.com';
  const USER_NAME = 'John Doe';

  test.beforeEach(async ({ page, context }) => {
    // Clear storage for each test
    await context.clearCookies();
  });

  test('Step 1: Login flow - login and verify persistence', async ({ page }) => {
    // Navigate to login page
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(BASE_URL + '/');

    // Enter email
    await page.fill('input[type="email"]', TEST_EMAIL);

    // Click Sign In button
    await page.click('button:has-text("Sign In")');

    // Wait for redirect to dashboard
    await page.waitForURL(BASE_URL + '/dashboard');
    await expect(page).toHaveURL(BASE_URL + '/dashboard');

    // Verify page content shows dashboard
    await expect(page.locator('text=Welcome')).toBeVisible();

    // Test persistence: refresh page
    await page.reload();

    // Verify still on dashboard after refresh
    await expect(page).toHaveURL(BASE_URL + '/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('Step 2: Subscription upgrade flow', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL);
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL(BASE_URL + '/dashboard');

    // Click "Upgrade Plan" button
    const upgradeButton = page.locator('button:has-text("Upgrade Plan")');
    await expect(upgradeButton).toBeVisible();
    await upgradeButton.click();

    // Wait for modal to appear
    await expect(page.locator('text=Pro').first()).toBeVisible();

    // Click on Pro ($29/mo) plan
    const proButton = page.locator('button:has-text("Pro")').first();
    await expect(proButton).toBeVisible();
    await proButton.click();

    // Wait for modal to close (button should disappear)
    await page.waitForTimeout(500);

    // Verify plan is now "Pro Plan"
    await expect(page.locator('text=Pro Plan')).toBeVisible();

    // Test persistence: refresh page
    await page.reload();

    // Verify tier persisted as "Pro"
    await expect(page.locator('text=Pro Plan')).toBeVisible();
  });

  test('Step 3: Settings flow - profile and billing address', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL);
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL(BASE_URL + '/dashboard');

    // Click "Go to Settings" button
    const settingsButton = page.locator('button:has-text("Go to Settings")');
    await expect(settingsButton).toBeVisible();
    await settingsButton.click();

    // Wait for settings page
    await page.waitForURL(BASE_URL + '/settings');

    // Wait for ProfileForm inputs to be visible and fill them
    const nameInput = page.locator('input[type="text"]').first();
    await nameInput.waitFor({ state: 'visible' });
    await nameInput.fill(USER_NAME);

    // Click "Save Changes" button
    const saveButton = page.locator('button:has-text("Save Changes")');
    await expect(saveButton).toBeVisible();
    await saveButton.click();

    // Wait for save to complete
    await page.waitForTimeout(500);

    // Fill billing address form using placeholders
    await page.fill('input[placeholder="Street"]', '123 Main St');
    await page.fill('input[placeholder="City"]', 'San Francisco');
    await page.fill('input[placeholder="State/Province"]', 'CA');
    await page.fill('input[placeholder="Zip/Postal Code"]', '94102');
    await page.fill('input[placeholder="Country"]', 'USA');

    // Click "Save Address" button
    const saveAddressButton = page.locator('button:has-text("Save Address")');
    await expect(saveAddressButton).toBeVisible();
    await saveAddressButton.click();

    // Wait for save to complete
    await page.waitForTimeout(500);

    // Click "Back to Dashboard" button
    const backButton = page.locator('button:has-text("Back to Dashboard")');
    await expect(backButton).toBeVisible();
    await backButton.click();

    // Wait for redirect to dashboard
    await page.waitForURL(BASE_URL + '/dashboard');

    // Verify welcome message shows name (not email)
    await expect(page.locator(`text=Welcome, ${USER_NAME}`)).toBeVisible();

    // Test persistence: refresh page
    await page.reload();

    // Verify name is still shown
    await expect(page.locator(`text=Welcome, ${USER_NAME}`)).toBeVisible();
  });

  test('Step 4: Dark mode toggle and persistence', async ({ page }) => {
    // Navigate to login page
    await page.goto(BASE_URL);

    // Find and click dark mode toggle button
    const toggleButton = page.locator('button[aria-label="Toggle dark mode"]');
    await expect(toggleButton).toBeVisible();
    await toggleButton.click();

    // Verify dark mode is applied by checking if dark class is present on html
    await page.waitForTimeout(300);
    const isDarkMode = await page.locator('html').evaluate(el =>
      el.classList.contains('dark')
    );
    expect(isDarkMode).toBe(true);

    // Click toggle again to return to light mode
    await toggleButton.click();

    await page.waitForTimeout(300);
    const isLightMode = await page.locator('html').evaluate(el =>
      !el.classList.contains('dark')
    );
    expect(isLightMode).toBe(true);

    // Test persistence: refresh page
    await page.reload();

    // Verify light mode is still active after refresh
    const isStillLight = await page.locator('html').evaluate(el =>
      !el.classList.contains('dark')
    );
    expect(isStillLight).toBe(true);
  });

  test('Step 5: Logout flow', async ({ page }) => {
    // Login first
    await page.goto(BASE_URL);
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL(BASE_URL + '/dashboard');

    // Click red "Logout" button in top-right
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    // Verify redirect to login page
    await page.waitForURL(BASE_URL + '/');
    await expect(page).toHaveURL(BASE_URL + '/');

    // Verify user is not logged in (login form should be visible, no redirect)
    await expect(page.locator('text=Sign in to your account')).toBeVisible();

    // Login again with same email to verify it works
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL(BASE_URL + '/dashboard');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });
});
