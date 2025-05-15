import { test, expect } from '@playwright/test';
import { UserManagementPage } from './pages/UserManagementPage';
import { getNextProfileNumber, logError, takeScreenshot } from './utils/helpers';

test.describe('Gestão de Usuários - Criar Perfil', () => {
  test('Acessa a página de gestão de usuários, clica em Novo perfil, preenche nome e seleciona Profissional de Saúde', async ({ page }) => {
    const userManagement = new UserManagementPage(page);
    
    const now = new Date();
    const dateTime = now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
    
    try {
      // Navega para a página e verifica se carregou corretamente
      await userManagement.navigate();
      await takeScreenshot(page, '1-pagina-inicial');
      await expect(page).toHaveURL(/gestao-perfil-usuario/);
      // await expect(page).toHaveTitle(/Gestão de Usuários/); // Remova ou ajuste para /FAP CLINICA/
      
      // Verifica se o botão de novo perfil está visível antes de clicar
      const novoPerfilButton = page.locator('ion-button', { hasText: 'Novo perfil' }).first();
      await expect(novoPerfilButton).toBeVisible();
      await takeScreenshot(page, '2-botao-novo-perfil-visivel');
      await novoPerfilButton.click();
      
      // Verifica se navegou para a página correta
      await expect(page).toHaveURL(/criar-perfil-usuario/);
      // await expect(page).toHaveTitle(/Criar Perfil/);
      await takeScreenshot(page, '3-pagina-criar-perfil');
      
      // Preenche o nome do perfil
      const profileNumber = getNextProfileNumber();
      const profileName = `teste automatizado ${dateTime}`;
      const nameInput = page.locator('input[placeholder="Nome do Perfil"]');
      await nameInput.click();
      await nameInput.fill(profileName);
      await expect(nameInput).toHaveValue(profileName);
      
      // Seleciona o tipo de profissional
      await userManagement.selectHealthcareProfessional();
      await takeScreenshot(page, '5-profissional-selecionado');
      
      // Clica diretamente no texto "Profissional de Saúde"
      const radioItem = page.locator('ion-item:has-text("Profissional de Saúde")');
      await expect(radioItem).toBeVisible();
      await radioItem.click();
      
      // Agora espere o radio estar selecionado
      const radio = page.locator('ion-radio[value="healthcare"]');
      await expect(radio).toHaveAttribute('aria-checked', 'true');

      // Clica no checkbox "Dashboard Gerencial"
      const dashboardItem = page.locator('ion-item:has-text("Dashboard Gerencial")');
      await expect(dashboardItem).toBeVisible();
      await dashboardItem.click();

      // Clica no checkbox "Gestão Financeira"
      const gestaoFinanceiraItem = page.locator('ion-item:has-text("Gestão Financeira")');
      await expect(gestaoFinanceiraItem).toBeVisible();
      await gestaoFinanceiraItem.click();

      const dashboardCheckbox = dashboardItem.locator('ion-checkbox');
      await expect(dashboardCheckbox).toHaveAttribute('aria-checked', 'true');

      const gestaoFinanceiraCheckbox = gestaoFinanceiraItem.locator('ion-checkbox');
      await expect(gestaoFinanceiraCheckbox).toHaveAttribute('aria-checked', 'true');

      // Localiza o botão pelo texto
      const salvarButton = page.getByRole('button', { name: 'Salvar Perfil de Usuário' });

      // Faz scroll até o botão (opcional, mas robusto)
      await salvarButton.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300); // opcional, só se notar problemas de renderização

      // Garante que está visível e habilitado
      await expect(salvarButton).toBeVisible();
      await expect(salvarButton).toBeEnabled();

      // Clica no botão
      await salvarButton.click();

      // Aguarda a mensagem de sucesso no modal
      const successMessage = page.locator('h2.success-title');
      await expect(successMessage).toHaveText('Perfil de Usuário Criado com sucesso!');

      // Valida o botão "Voltar ao início"
      const voltarButton = page.getByRole('button', { name: 'Voltar ao início' });
      await expect(voltarButton).toBeVisible();
    } catch (error) {
      await logError(page, error, 'criação de perfil');
      throw error;
    }
  });
}); 