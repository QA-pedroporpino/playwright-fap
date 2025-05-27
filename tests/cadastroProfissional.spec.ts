import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { takeScreenshot, logError } from './utils/helpers';

test.describe('Cadastro de Profissional', () => {
  test('Realiza cadastro de profissional após login', async ({ page }) => {
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
      
      // Clica no botão "Cadastro de Profissional" pelo texto visível
      const cadastroProfissionalBtn = page.getByRole('button', { name: /cadastro de profissional/i });
      await expect(cadastroProfissionalBtn).toBeVisible({ timeout: 10000 });
      await cadastroProfissionalBtn.click();
      await takeScreenshot(page, '3-cadastro-profissional-click');

      // Aguarda a navegação para a página de cadastro de profissional
      await expect(page).toHaveURL('https://staging.fap.clinic.kompa.com.br/criar-novo-usuario-profissional', { timeout: 10000 });
      await takeScreenshot(page, '4-pagina-cadastro-profissional');

      // Etapa 5: Seleciona o perfil
      await test.step('Selecionar perfil', async () => {
        // Localiza o campo de seleção de perfil
        const perfilSelect = page.getByPlaceholder('Selecione um perfil');
        
        // Aguarda o campo estar visível
        await expect(perfilSelect).toBeVisible({ timeout: 10000 });
        
        // Aguarda o loading desaparecer e o campo ficar ativo
        await expect(async () => {
          // Verifica se o campo está habilitado e não tem o indicador de loading
          const isDisabled = await perfilSelect.getAttribute('disabled');
          const hasLoading = await page.locator('.loading-spinner').isVisible();
          expect(isDisabled).toBeNull();
          expect(hasLoading).toBeFalsy();
        }).toPass({ timeout: 15000 }); // Timeout maior para o carregamento
        
        // Tira screenshot antes do clique
        await takeScreenshot(page, '5-1-campo-perfil-carregado');
        
        // Clica no campo com retry
        await expect(async () => {
          await perfilSelect.click();
          // Verifica se o dropdown abriu
          const dropdown = page.locator('ion-select-popover');
          await expect(dropdown).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });
        
        await takeScreenshot(page, '5-2-dropdown-perfil-aberto');
      });

      // Etapa 6: Seleciona a opção "Profissional X"
      await test.step('Selecionar opção Profissional X', async () => {
        // Aguarda o dropdown estar visível
        const dropdown = page.locator('ion-select-popover');
        await expect(dropdown).toBeVisible({ timeout: 10000 });

        // Localiza a opção pelo texto exato
        const opcaoProfissionalX = dropdown.getByText('Profissional X', { exact: true });
        await expect(opcaoProfissionalX).toBeVisible({ timeout: 10000 });

        // Tira screenshot antes do clique
        await takeScreenshot(page, '6-1-opcao-profissional-x-visivel');

        // Clica na opção
        await opcaoProfissionalX.click();

        // Após clicar na opção, valide que o botão com o texto "Profissional X" está visível
        const perfilSelecionado = page.getByRole('button', { name: 'Profissional X' });
        await expect(perfilSelecionado).toBeVisible({ timeout: 5000 });

        // Tira screenshot após a seleção
        await takeScreenshot(page, '6-2-opcao-profissional-x-selecionada');
      });

      // Aqui você pode seguir com os próximos passos do fluxo de cadastro de profissional...

    } catch (error) {
      await logError(page, error, 'cadastro-profissional');
      throw error;
    }
  });
}); 