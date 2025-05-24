import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://staging.fap.clinic.kompa.com.br/');

  // Fill in email
  await page.locator('input[placeholder="Digite seu e-mail"]').fill('pedroporpino@id.uff.br');

  // Fill in password
  await page.locator('input[placeholder="Digite sua senha"]').fill('fapclinica');

  // Click the login button (assuming there's a button with text "Entrar" or similar)
  await page.getByRole('button', { name: /entrar/i }).click();

  // Wait for navigation after login
  await page.waitForURL('**/dashboard**');

  // Store the authentication state
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
}); 