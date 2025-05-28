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

      // Etapa 7: Localiza e clica no campo de número do profissional
      await test.step('Localizar e clicar no campo de número do profissional', async () => {
        const numeroProfissionalInput = page.locator('#professionalNumber input.native-input');
        await expect(numeroProfissionalInput).toBeVisible({ timeout: 10000 });
        await numeroProfissionalInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '7-1-localize-input-numero-profissional');
      });

      // Etapa 8: Preenche o campo com um número de CRM aleatório
      await test.step('Preencher número de CRM', async () => {
        const numeroProfissionalInput = page.locator('#professionalNumber input.native-input');
        // Gera um número aleatório de 6 dígitos
        const crmNumber = Math.floor(100000 + Math.random() * 900000).toString();

        await expect(async () => {
          await numeroProfissionalInput.fill(crmNumber);
          const value = await numeroProfissionalInput.inputValue();
          expect(value).toBe(crmNumber);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '7-2-numero-crm-preenchido');
      });

      // Etapa 9: Localiza e clica no campo de CPF
      await test.step('Localizar e clicar no campo de CPF', async () => {
        const cpfInput = page.locator('#documentNumber input.native-input');
        await expect(cpfInput).toBeVisible({ timeout: 10000 });
        await cpfInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '8-1-localize-input-cpf');
      });

      // Etapa 10: Preenche o campo com um CPF aleatório
      await test.step('Preencher CPF', async () => {
        const cpfInput = page.locator('#documentNumber input.native-input');
        // Gera um CPF aleatório válido
        const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('') + '00';

        await expect(async () => {
          await cpfInput.fill(cpf);
          const value = await cpfInput.inputValue();
          expect(value).toBe(cpf);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '8-2-cpf-preenchido');
      });

      // Etapa 11: Localiza e clica no campo de nome completo
      await test.step('Localizar e clicar no campo de nome completo', async () => {
        const nomeCompletoInput = page.locator('#fullName input.native-input');
        await expect(nomeCompletoInput).toBeVisible({ timeout: 10000 });
        await nomeCompletoInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '9-1-localize-input-nome-completo');
      });

      // Etapa 12: Preenche o campo com nome do profissional e timestamp
      await test.step('Preencher nome do profissional', async () => {
        const nomeCompletoInput = page.locator('#fullName input.native-input');
        const now = new Date();
        const dateTime = now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
        const professionalName = `Usuario Profissional Automatizado ${dateTime}`;

        await expect(async () => {
          await nomeCompletoInput.fill(professionalName);
          const value = await nomeCompletoInput.inputValue();
          expect(value).toBe(professionalName);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '9-2-nome-profissional-preenchido');
      });

      // Etapa 13: Localiza e clica no campo de celular
      await test.step('Localizar e clicar no campo de celular', async () => {
        const celularInput = page.locator('#cellphone input.native-input');
        
        // Scroll até o elemento ficar visível
        await expect(async () => {
          await celularInput.scrollIntoViewIfNeeded();
          await expect(celularInput).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });

        await celularInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '10-1-localize-input-celular');
      });

      // Etapa 14: Preenche o campo com um número de celular aleatório
      await test.step('Preencher número de celular', async () => {
        const celularInput = page.locator('#cellphone input.native-input');
        // Gera um número de celular aleatório no formato (XX) XXXXX-XXXX
        const ddd = Math.floor(10 + Math.random() * 90).toString();
        const numero = Math.floor(100000000 + Math.random() * 900000000).toString();
        const celular = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;

        await expect(async () => {
          await celularInput.fill(celular);
          const value = await celularInput.inputValue();
          expect(value).toBe(celular);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '10-2-celular-preenchido');
      });

      // Etapa 15: Localiza e clica no campo de telefone
      await test.step('Localizar e clicar no campo de telefone', async () => {
        const telefoneInput = page.locator('#phone input.native-input');
        
        // Scroll até o elemento ficar visível
        await expect(async () => {
          await telefoneInput.scrollIntoViewIfNeeded();
          await expect(telefoneInput).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });

        await telefoneInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '11-1-localize-input-telefone');
      });

      // Etapa 16: Preenche o campo com um número de telefone aleatório
      await test.step('Preencher número de telefone', async () => {
        const telefoneInput = page.locator('#phone input.native-input');
        // Gera um número de telefone aleatório no formato (XX) XXXX-XXXX
        const ddd = Math.floor(10 + Math.random() * 90).toString();
        const numero = Math.floor(10000000 + Math.random() * 90000000).toString();
        const telefone = `(${ddd}) ${numero.slice(0, 4)}-${numero.slice(4)}`;

        await expect(async () => {
          await telefoneInput.fill(telefone);
          const value = await telefoneInput.inputValue();
          expect(value).toBe(telefone);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '11-2-telefone-preenchido');
      });

      // Etapa 17: Localiza e clica no campo de email
      await test.step('Localizar e clicar no campo de email', async () => {
        const emailInput = page.locator('#email input.native-input');
        
        // Scroll até o elemento ficar visível
        await expect(async () => {
          await emailInput.scrollIntoViewIfNeeded();
          await expect(emailInput).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });

        await emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '12-1-localize-input-email');
      });

      // Etapa 18: Preenche o campo com um email aleatório
      await test.step('Preencher email', async () => {
        const emailInput = page.locator('#email input.native-input');
        // Gera um email aleatório com timestamp para garantir unicidade
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const email = `usuario.profissional.${randomString}.${timestamp}@teste.com`;

        await expect(async () => {
          await emailInput.fill(email);
          const value = await emailInput.inputValue();
          expect(value).toBe(email);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '12-2-email-preenchido');
      });

      // Etapa 19: Scroll até o campo de número e garante visibilidade dos campos de endereço
      await test.step('Scroll até o campo de número para garantir visibilidade dos campos de endereço', async () => {
        const numeroInput = page.locator('#number input.native-input');
        await numeroInput.scrollIntoViewIfNeeded();
        await expect(numeroInput).toBeVisible({ timeout: 10000 });
        // Também garante que o campo de CEP está visível
        const cepInput = page.locator('#cep input.native-input');
        await cepInput.scrollIntoViewIfNeeded();
        await expect(cepInput).toBeVisible({ timeout: 10000 });
        await takeScreenshot(page, '13-0-scroll-campos-endereco-visiveis');
      });

      // Etapa 20: Localiza e clica no campo de CEP
      await test.step('Localizar e clicar no campo de CEP', async () => {
        const cepInput = page.locator('#cep input.native-input');
        await cepInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '13-1-localize-input-cep');
      });

      // Etapa 21: Preenche o campo de CEP e valida o auto-complete
      await test.step('Preencher CEP e validar auto-complete', async () => {
        const cepInput = page.locator('#cep input.native-input');
        const addressInput = page.locator('#address input.native-input');
        const cep = '20560040';

        await expect(async () => {
          await cepInput.fill(cep);
          const value = await cepInput.inputValue();
          expect(value).toBe(cep);
        }).toPass({ timeout: 10000 });

        // Aguarda e valida se o campo de endereço foi preenchido corretamente
        await expect(async () => {
          const addressValue = await addressInput.inputValue();
          expect(addressValue).toContain('Teodoro da Silva');
        }).toPass({ timeout: 15000 }); // Timeout maior para dar tempo da API responder

        await takeScreenshot(page, '13-2-cep-preenchido-e-endereco-validado');
      });

      // Etapa 22: Localiza e clica no campo de número
      await test.step('Localizar e clicar no campo de número', async () => {
        const numeroInput = page.locator('#number input.native-input');
        
        // Scroll até o elemento ficar visível
        await expect(async () => {
          await numeroInput.scrollIntoViewIfNeeded();
          await expect(numeroInput).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });

        await numeroInput.waitFor({ state: 'visible', timeout: 10000 });
        await takeScreenshot(page, '14-1-localize-input-numero');
      });

      // Etapa 23: Preenche o campo com o número
      await test.step('Preencher número', async () => {
        const numeroInput = page.locator('#number input.native-input');
        const numero = '123';

        await expect(async () => {
          await numeroInput.fill(numero);
          const value = await numeroInput.inputValue();
          expect(value).toBe(numero);
        }).toPass({ timeout: 10000 });

        await takeScreenshot(page, '14-2-numero-preenchido');
      });

      // Etapa 24: Localiza e clica no campo de especialidade
      await test.step('Localizar e clicar no campo de especialidade', async () => {
        const specialtySelect = page.locator('#specialty');
        await specialtySelect.scrollIntoViewIfNeeded();
        await expect(specialtySelect).toBeVisible({ timeout: 10000 });
        await expect(specialtySelect).toBeEnabled({ timeout: 10000 });
        await takeScreenshot(page, '15-1-campo-especialidade-visivel');

        // Clica no campo specialty
        await expect(async () => {
          await specialtySelect.click();
          // Aguarda o dropdown abrir (pode ser um ion-select-popover ou similar)
          const dropdown = page.locator('ion-select-popover, .select-dropdown, .dropdown-menu, .cdk-overlay-pane');
          await expect(dropdown).toBeVisible({ timeout: 5000 });
        }).toPass({ timeout: 10000 });
        await takeScreenshot(page, '15-2-dropdown-especialidade-aberto');
      });

      // Etapa 25: Seleciona a opção Dermatologia
      await test.step('Selecionar opção Dermatologia', async () => {
        // Procura o dropdown aberto
        const dropdown = page.locator('ion-select-popover, .select-dropdown, .dropdown-menu, .cdk-overlay-pane');
        await expect(dropdown).toBeVisible({ timeout: 10000 });

        // Aguarda loading sumir, se houver
        const loading = dropdown.locator('.loading-spinner, .spinner, .loading');
        if (await loading.isVisible({ timeout: 2000 }).catch(() => false)) {
          await expect(loading).not.toBeVisible({ timeout: 10000 });
        }

        // Localiza a opção Dermatologia
        const opcaoDermatologia = dropdown.getByText('Dermatologia', { exact: true });
        await expect(opcaoDermatologia).toBeVisible({ timeout: 10000 });
        await takeScreenshot(page, '15-3-opcao-dermatologia-visivel');

        // Clica na opção
        await opcaoDermatologia.click();

        // Valida que a opção foi selecionada (campo ou botão com texto Dermatologia)
        const selecionado = page.getByText('Dermatologia', { exact: true });
        await expect(selecionado).toBeVisible({ timeout: 5000 });
        await takeScreenshot(page, '15-4-opcao-dermatologia-selecionada');
      });

      // Etapa 26: Scroll até o final e clica no botão Salvar
      await test.step('Scroll até o final e clicar no botão Salvar', async () => {
        // Scroll até o final da página
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000); // Pequeno delay para garantir renderização

        // Localiza o botão Salvar pelo texto
        const salvarBtn = page.getByText('Salvar', { exact: true });
        await expect(salvarBtn).toBeVisible({ timeout: 10000 });
        await expect(async () => {
          // Espera o botão ficar habilitado/ativo
          const isDisabled = await salvarBtn.getAttribute('disabled');
          expect(isDisabled).toBeNull();
        }).toPass({ timeout: 10000 });
        await takeScreenshot(page, '16-1-botao-salvar-visivel-e-ativo');

        // Clica no botão
        await salvarBtn.click();
        await takeScreenshot(page, '16-2-botao-salvar-clicado');
      });

      // Etapa 27: Valida mensagem de sucesso no modal
      await test.step('Validar mensagem de sucesso após cadastro', async () => {
        const sucessoMsg = page.getByText('Profissional cadastrado com sucesso!', { exact: true });
        await expect(sucessoMsg).toBeVisible({ timeout: 15000 });
        await takeScreenshot(page, '17-1-modal-sucesso-cadastro-profissional');
      });

    } catch (error) {
      await logError(page, error, 'cadastro-profissional');
      throw error;
    }
  });
}); 