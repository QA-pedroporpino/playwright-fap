import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Login
  await page.goto('https://staging.fap.clinic.kompa.com.br/login');
  await page.getByPlaceholder('Email').fill('pedroporpino@id.uff.br');
  await page.getByPlaceholder('Senha').fill('fapclinica');
  await page.getByRole('button', { name: /entrar/i }).click();
  
  // Wait for navigation
  await page.waitForURL(/dashboard/);
  
  // Save signed-in state
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
  await browser.close();
}

export default globalSetup; 