import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly baseUrl = 'https://staging.fap.clinic.kompa.com.br';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(this.baseUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
  }

  async login(email: string, password: string) {
    // Fill in email
    await this.page.locator('input[placeholder="Digite seu e-mail"]').fill(email);

    // Fill in password
    await this.page.locator('input[placeholder="Digite sua senha"]').fill(password);

    // Click login button
    await this.page.getByRole('button', { name: /entrar/i }).click();

    // Wait for navigation after login
    await this.page.waitForURL('**/dashboard**', { timeout: 30000 });
  }
} 