import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CredenciamentoPage {
  readonly page: Page;
  private readonly baseUrl = 'https://staging.fap.clinic.kompa.com.br';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(`${this.baseUrl}/credenciamento`, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
  }

  private getFormattedDateTime(): string {
    const now = new Date();
    return now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
  }

  async fillNomeClinica() {
    // Aguarda a página carregar completamente
    await this.page.waitForLoadState('networkidle');
    
    // Localiza o input usando role e placeholder
    const input = this.page.getByRole('textbox', { name: 'Nome da Clínica' });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    // Tenta clicar duas vezes para garantir o foco
    await input.click();
    await this.page.waitForTimeout(500);
    await input.click();
    
    const nomeClinica = `Teste Automatizado ${this.getFormattedDateTime()}`;
    
    // Tenta preencher duas vezes
    await input.fill(nomeClinica);
    await this.page.waitForTimeout(500);
    await input.fill(nomeClinica);

    // Verifica se o valor foi inserido corretamente
    await expect(input).toHaveValue(nomeClinica);

    return nomeClinica;
  }
} 