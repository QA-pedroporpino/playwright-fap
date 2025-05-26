import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { takeScreenshot, logError } from './utils/helpers';

test.describe('Criar nova Tabela de Preços/Especialidades', () => {
  test('Acessa a tela de Tabela de Preços/Especialidades após login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      // Login
      await loginPage.navigate();
      await takeScreenshot(page, '1-pagina-login');
      await loginPage.login('pedroporpino@id.uff.br', 'fapclinica');
      await takeScreenshot(page, '2-login-realizado');
      await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

      // Clica no botão "Tabela de Preços/Especialidades"
      const tabelaEspecialidadesBtn = page.getByRole('button', { name: /tabela de preços\/especialidades/i });
      await expect(tabelaEspecialidadesBtn).toBeVisible({ timeout: 10000 });
      await tabelaEspecialidadesBtn.click();
      await takeScreenshot(page, '3-tabela-especialidades-click');

      // Clica no botão "Nova Tabela"
      const novaTabelaBtn = page.getByRole('button', { name: /nova tabela/i });
      await expect(novaTabelaBtn).toBeVisible({ timeout: 10000 });
      await novaTabelaBtn.click();
      await takeScreenshot(page, '4-nova-tabela-click');

      // Preenche o campo "Nome da tabela"
      const nomeTabelaInput = page.locator('input[placeholder="Nome da tabela"]');
      await expect(nomeTabelaInput).toBeVisible({ timeout: 10000 });
      await nomeTabelaInput.click();
      const now = new Date();
      const dateTime = now.toLocaleString('pt-BR').replace(/[/: ]/g, '-');
      await nomeTabelaInput.fill(`Especialidade Automatizada ${dateTime}`);
      await takeScreenshot(page, '5-nome-tabela-preenchido');

      // Clica no botão "Criar tabela"
      const criarTabelaBtn = page.getByRole('button', { name: /criar tabela/i });
      await expect(criarTabelaBtn).toBeVisible({ timeout: 10000 });
      await criarTabelaBtn.click();
      await takeScreenshot(page, '6-criar-tabela-click');

      // Clica no checkbox
      const checkbox = page.locator('svg.checkbox-icon').first();
      await expect(checkbox).toBeVisible({ timeout: 10000 });
      await checkbox.scrollIntoViewIfNeeded();
      await expect(checkbox).not.toBeDisabled();
      await page.waitForTimeout(200);
      await checkbox.click({ force: true });
      await takeScreenshot(page, '7-checkbox-click');

      // Clica no botão "Adicionar" somente após o clique no checkbox "Todos"
      const adicionarBtn = page.getByRole('button', { name: /adicionar/i });
      await expect(adicionarBtn).toBeVisible({ timeout: 10000 });
      await adicionarBtn.scrollIntoViewIfNeeded();
      await expect(adicionarBtn).toBeEnabled();
      await page.waitForTimeout(200);
      await adicionarBtn.click({ force: true });
      await takeScreenshot(page, '8-adicionar-click');

      // Clica no botão "Prosseguir"
      const prosseguirBtn = page.getByRole('button', { name: /prosseguir/i });
      await expect(prosseguirBtn).toBeVisible({ timeout: 10000 });
      await prosseguirBtn.scrollIntoViewIfNeeded();
      await expect(prosseguirBtn).toBeEnabled();
      await page.waitForTimeout(200);
      await prosseguirBtn.click({ force: true });
      await takeScreenshot(page, '9-prosseguir-click');

      // Preenche os campos "Valor"
      const valorInputs = page.locator('input[type="number"][placeholder="Valor"]');
      await expect(valorInputs.nth(0)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(0).click({ force: true });
      await valorInputs.nth(0).fill('');
      await valorInputs.nth(0).type('349.99');
      await takeScreenshot(page, '10-valor-1-preenchido');

      await expect(valorInputs.nth(1)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(1).click({ force: true });
      await valorInputs.nth(1).fill('');
      await valorInputs.nth(1).type('349.99');
      await takeScreenshot(page, '11-valor-2-preenchido');

      await expect(valorInputs.nth(2)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(2).click({ force: true });
      await valorInputs.nth(2).fill('');
      await valorInputs.nth(2).type('349.99');
      await takeScreenshot(page, '12-valor-3-preenchido');

      await expect(valorInputs.nth(3)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(3).click({ force: true });
      await valorInputs.nth(3).fill('');
      await valorInputs.nth(3).type('349.99');
      await takeScreenshot(page, '13-valor-4-preenchido');

      await expect(valorInputs.nth(4)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(4).click({ force: true });
      await valorInputs.nth(4).fill('');
      await valorInputs.nth(4).type('349.99');
      await takeScreenshot(page, '14-valor-5-preenchido');

      await expect(valorInputs.nth(5)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(5).click({ force: true });
      await valorInputs.nth(5).fill('');
      await valorInputs.nth(5).type('349.99');
      await takeScreenshot(page, '15-valor-6-preenchido');

      await expect(valorInputs.nth(6)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(6).click({ force: true });
      await valorInputs.nth(6).fill('');
      await valorInputs.nth(6).type('349.99');
      await takeScreenshot(page, '16-valor-7-preenchido');

      await expect(valorInputs.nth(7)).toBeVisible({ timeout: 10000 });
      await valorInputs.nth(7).click({ force: true });
      await valorInputs.nth(7).fill('');
      await valorInputs.nth(7).type('349.99');
      await takeScreenshot(page, '17-valor-8-preenchido');



      // Preenche os campos "SLA"
      const slaInputs = page.locator('input[type="number"][placeholder="SLA"]');
      await expect(slaInputs.nth(0)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(0).click({ force: true });
      await slaInputs.nth(0).fill('');
      await slaInputs.nth(0).type('15');
      await takeScreenshot(page, '15-sla-1-preenchido');

      await expect(slaInputs.nth(1)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(1).click({ force: true });
      await slaInputs.nth(1).fill('');
      await slaInputs.nth(1).type('15');
      await takeScreenshot(page, '16-sla-2-preenchido');

      await expect(slaInputs.nth(2)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(2).click({ force: true });
      await slaInputs.nth(2).fill('');
      await slaInputs.nth(2).type('15');
      await takeScreenshot(page, '17-sla-3-preenchido');

      await expect(slaInputs.nth(3)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(3).click({ force: true });
      await slaInputs.nth(3).fill('');
      await slaInputs.nth(3).type('15');
      await takeScreenshot(page, '18-sla-4-preenchido');

      await expect(slaInputs.nth(4)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(4).click({ force: true });
      await slaInputs.nth(4).fill('');
      await slaInputs.nth(4).type('15');
      await takeScreenshot(page, '19-sla-5-preenchido');

      await expect(slaInputs.nth(5)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(5).click({ force: true });
      await slaInputs.nth(5).fill('');
      await slaInputs.nth(5).type('15');
      await takeScreenshot(page, '20-sla-6-preenchido');

      await expect(slaInputs.nth(6)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(6).click({ force: true });
      await slaInputs.nth(6).fill('');
      await slaInputs.nth(6).type('15');
      await takeScreenshot(page, '21-sla-7-preenchido');

      await expect(slaInputs.nth(7)).toBeVisible({ timeout: 10000 });
      await slaInputs.nth(7).click({ force: true });
      await slaInputs.nth(7).fill('');
      await slaInputs.nth(7).type('15');
      await takeScreenshot(page, '22-sla-8-preenchido');


      // Clica no botão "Concluir"
      const concluirBtn = page.getByRole('button', { name: /concluir/i });
      await expect(concluirBtn).toBeVisible({ timeout: 10000 });

      // Aguarde até que o botão esteja realmente habilitado (pode ser necessário um polling extra)
      await test.step('Aguardar botão Concluir habilitado', async () => {
        await expect(async () => {
          // Reavalie o estado do botão a cada polling
          const isEnabled = await concluirBtn.isEnabled();
          expect(isEnabled).toBeTruthy();
        }).toPass({ timeout: 10000 });
      });

      // Aguarde um pequeno tempo extra para garantir que o framework processou tudo
      await page.waitForTimeout(300);

      // Clique no botão
      await concluirBtn.click({ force: true });

      // Aguarde a navegação ou o elemento da próxima tela
      await expect(page).toHaveURL('https://staging.fap.clinic.kompa.com.br/tabela-precos', { timeout: 10000 });
      await takeScreenshot(page, '20-concluir-click');

    } catch (error) {
      await logError(page, error, 'tabela-especialidades');
      throw error;
    }
  });
}); 