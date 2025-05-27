import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { takeScreenshot, logError } from './utils/helpers';

test.describe('Cadastro de Feriados', () => {
  test('Acessa a tela de Cadastro de Feriados após login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      // Login
      await loginPage.navigate();
      await takeScreenshot(page, '1-pagina-login');
      await loginPage.login('pedroporpino@id.uff.br', 'fapclinica');
      await takeScreenshot(page, '2-login-realizado');
      await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

      // Clica no botão "Cadastro de Feriados"
      const cadastroFeriadosBtn = page.getByRole('button', { name: /cadastro de feriados/i });
      await expect(cadastroFeriadosBtn).toBeVisible({ timeout: 10000 });
      await cadastroFeriadosBtn.click();
      await takeScreenshot(page, '3-cadastro-feriados-click');

      // Clica no botão "Cadastrar Feriado"
      const cadastrarFeriadoBtn = page.getByRole('button', { name: /cadastrar feriado/i });
      await expect(cadastrarFeriadoBtn).toBeVisible({ timeout: 10000 });
      await cadastrarFeriadoBtn.click();
      await takeScreenshot(page, '4-cadastrar-feriado-click');

      // Preenche o campo "Nome do feriado" de forma robusta
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible({ timeout: 10000 });

      // Etapa 1: Clica no elemento pelo ID
      await test.step('Clicar no campo pelo ID', async () => {
        const holidayNameElement = page.locator('#holidayName');
        await expect(holidayNameElement).toBeVisible({ timeout: 10000 });
        await holidayNameElement.waitFor({ state: 'visible', timeout: 10000 });
        await holidayNameElement.click();
        await takeScreenshot(page, '5-1-click-holiday-id');
      });

      // Etapa 2: Localiza o input pelo placeholder
      await test.step('Localizar input pelo placeholder', async () => {
        const nomeFeriadoInput = page.locator('#holidayName input.native-input');
      await expect(nomeFeriadoInput).toBeVisible({ timeout: 10000 });
        await nomeFeriadoInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '5-2-localize-input');
      });

      // Etapa 3: Preenche o campo com o nome do feriado
      await test.step('Preencher nome do feriado', async () => {
        const nomeFeriadoInput = page.locator('#holidayName input.native-input');
      const now = new Date();
      const dateTime = now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
        const holidayName = `Feriado Automatizado ${dateTime}`;

        await expect(async () => {
          await nomeFeriadoInput.fill(holidayName);
          const value = await nomeFeriadoInput.inputValue();
          expect(value).toBe(holidayName);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '5-3-nome-feriado-preenchido');
      });

      // Função para gerar data aleatória no formato DD/MM/AAAA
      function gerarDataAleatoria(): string {
        const ano = Math.floor(Math.random() * (2030 - 2024) + 2024); // Ano entre 2024 e 2030
        const mes = Math.floor(Math.random() * 12) + 1; // Mês entre 1 e 12
        const dia = Math.floor(Math.random() * 28) + 1; // Dia entre 1 e 28 (evita problemas com fevereiro)
        
        return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
      }

      // Etapa 4: Preenche o campo de data
      await test.step('Preencher data do feriado', async () => {
        // Clica no campo de data pelo ID
        const dateElement = page.locator('#holidayDate');
        await expect(dateElement).toBeVisible({ timeout: 10000 });
        await dateElement.waitFor({ state: 'visible', timeout: 10000 });
        await dateElement.click();
        await takeScreenshot(page, '6-1-click-date-id');

        // Localiza o input de data usando placeholder e role
        const dateInput = page.getByRole('textbox', { name: 'DD/MM/AAAA' });
        await expect(dateInput).toBeVisible({ timeout: 10000 });
        await dateInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '6-2-localize-date-input');

        // Preenche a data com retry e verificação
        const dataAleatoria = gerarDataAleatoria();
        await test.step('Preencher data com retry', async () => {
          await expect(async () => {
            // Limpa o campo primeiro
            await dateInput.clear();
            await page.waitForTimeout(500);
            
            // Preenche a data
            await dateInput.fill(dataAleatoria);
            await page.waitForTimeout(500);
            
            // Verifica se o valor foi preenchido corretamente
            const value = await dateInput.inputValue();
            expect(value).toBe(dataAleatoria);
          }).toPass({ timeout: 10000 });
        });

        await takeScreenshot(page, '6-3-data-preenchida');
      });

      // Etapa 5: Clica no botão Salvar
      await test.step('Clicar no botão Salvar', async () => {
        // Localiza o botão pelo texto exato
        const salvarButton = page.getByRole('button', { name: 'Salvar' });
        
        // Verifica se o botão está visível
        await expect(salvarButton).toBeVisible({ timeout: 10000 });
        
        // Garante que o botão está na viewport
        await salvarButton.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // Pequena pausa após scroll
        
        // Verifica se o botão está habilitado
        await expect(salvarButton).toBeEnabled({ timeout: 10000 });
        
        // Tira screenshot antes do clique
        await takeScreenshot(page, '7-1-botao-salvar-visivel');
        
        // Clique com retry em caso de falha
        await expect(async () => {
          await salvarButton.click();
          // Verifica se o modal/dialog foi fechado após o clique
          await expect(dialog).not.toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });
        
        // Tira screenshot após o clique
        await takeScreenshot(page, '7-2-botao-salvar-clicado');
      });

      // Etapa 6: Verifica o toast de sucesso
      await test.step('Verificar mensagem de sucesso', async () => {
        // Aguarda e verifica o toast de sucesso
        const toastMessage = page.getByText('Feriado cadastrado com sucesso', { exact: true });
        
        // Verifica se o toast aparece
        await expect(async () => {
          await expect(toastMessage).toBeVisible({ timeout: 5000 });
          // Verifica se o texto está exatamente correto
          const text = await toastMessage.textContent();
          expect(text).toBe('Feriado cadastrado com sucesso');
        }).toPass({ timeout: 10000 });

        // Tira screenshot do toast
        await takeScreenshot(page, '8-toast-sucesso');
        
        // Aguarda o toast desaparecer (opcional, se necessário)
        await expect(toastMessage).not.toBeVisible({ timeout: 10000 });
      });

      // Aqui você pode seguir com os próximos passos do fluxo de cadastro de feriados...

    } catch (error) {
      await logError(page, error, 'cadastro-feriados');
      throw error;
    }
  });
});