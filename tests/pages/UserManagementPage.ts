import { Page } from '@playwright/test';

export class UserManagementPage {
  readonly page: Page;
  private readonly baseUrl = 'https://staging.fap.clinic.kompa.com.br';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    // Navigate to the user management page
    await this.page.goto(`${this.baseUrl}/gestao-perfil-usuario`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Wait for the page to be fully loaded and authenticated
    await this.page.waitForURL('**/gestao-perfil-usuario', { timeout: 30000 });
    
    // Additional wait to ensure the page is fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async clickNewProfile() {
    await this.page.getByRole('button', { name: '+ Novo perfil' }).click();
  }

  async fillProfileName(name: string) {
    await this.page.locator('ion-input[placeholder="Nome do Perfil"] input').fill(name);
  }

  async selectHealthcareProfessional() {
    const radio = this.page.locator('ion-radio[value="healthcare"]');
    await radio.evaluate((el) => {
      const button = el.shadowRoot && el.shadowRoot.querySelector('button');
      if (button) (button as HTMLElement).click();
    });
  }
} 