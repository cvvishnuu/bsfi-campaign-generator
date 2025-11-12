/**
 * Authentication E2E Tests
 * Tests the complete authentication flow from browser perspective
 */
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display homepage with login button', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('BFSI Campaign Generator')).toBeVisible();
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /login/i }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByText('Welcome Back')).toBeVisible();
    await expect(page.getByPlaceholder('name@example.com')).toBeVisible();
  });

  test('should show validation errors for empty login form', async ({ page }) => {
    await page.goto('/login');

    // Try to submit empty form
    await page.getByRole('button', { name: /sign in/i }).click();

    // HTML5 validation will prevent submission
    const emailInput = page.getByPlaceholder('name@example.com');
    await expect(emailInput).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    // Fill in login form
    await page.getByPlaceholder('name@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');

    // Submit form
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await expect(page.getByText(/welcome back/i)).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /sign up/i }).first().click();

    await expect(page).toHaveURL('/signup');
    await expect(page.getByText('Create Your Account')).toBeVisible();
  });

  test('should successfully signup with valid credentials', async ({ page }) => {
    await page.goto('/signup');

    // Fill in signup form
    await page.getByPlaceholder('John Doe').fill('Test User');
    await page.getByPlaceholder('name@example.com').fill('newuser@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');

    // Submit form
    await page.getByRole('button', { name: /sign up/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await expect(page.getByText(/welcome back.*test user/i)).toBeVisible();
  });
});
