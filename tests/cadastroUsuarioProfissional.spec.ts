import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { takeScreenshot, logError } from './utils/helpers';

test.describe('Cadastro de Usuário Profissional', () => {
  test('Realiza login na aplicação', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    try {
      // Navega para a página de login
      await loginPage.navigate();
      await takeScreenshot(page, '1-pagina-login');

      // Realiza o login
      await loginPage.login('pedroporpino@id.uff.br', 'fapclinica');
      await takeScreenshot(page, '2-login-realizado');

      // Verifica se foi redirecionado para o dashboard
      await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
      
      // Clica no botão "Cadastro de Usuário" pelo texto visível
      const cadastroUsuarioBtn = page.getByRole('button', { name: /cadastro de usuário/i });
      await expect(cadastroUsuarioBtn).toBeVisible({ timeout: 10000 });
      await cadastroUsuarioBtn.click();
      await takeScreenshot(page, '3-cadastro-usuario-click');

      // Preenche o nome do perfil
      const now = new Date();
      const dateTime = now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
      const profileName = `teste automatizado ${dateTime}`;
      const nameInput = page.locator('input[placeholder="Nome do Perfil"]');
      await nameInput.click();
      await nameInput.fill(profileName);
      await expect(nameInput).toHaveValue(profileName);

      // Seleciona o tipo de profissional
      const radioItem = page.locator('ion-item:has-text("Profissional de Saúde")');
      await expect(radioItem).toBeVisible();
      await radioItem.click();

      // Aguarda o radio estar selecionado
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
      await page.waitForTimeout(300); // opcional

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
      await logError(page, error, 'login');
      throw error;
    }
  });
}); 