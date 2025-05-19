import { test, expect } from '@playwright/test';
import { CredenciamentoPage } from './pages/CredenciamentoPage';

test.describe('Credenciamento', () => {
  test('Acessa a página de credenciamento e preenche o nome da clínica', async ({ page }) => {
    const credenciamento = new CredenciamentoPage(page);
    
    try {
      // Navega para a página de credenciamento
      await credenciamento.navigate();
      
      // Verifica se a URL está correta
      await expect(page).toHaveURL(/credenciamento/);
      
      // Preenche o nome da clínica
      const nomeClinica = await credenciamento.fillNomeClinica();
      console.log(`Nome da clínica preenchido: ${nomeClinica}`);
      
    } catch (error) {
      console.error('Erro ao interagir com a página de credenciamento:', error);
      throw error;
    }
  });
}); 