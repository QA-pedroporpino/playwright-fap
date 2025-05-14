import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';

const COUNTER_FILE = 'tests/profile_counter.txt';

function getNextProfileNumber() {
  let num = 1;
  if (fs.existsSync(COUNTER_FILE)) {
    num = parseInt(fs.readFileSync(COUNTER_FILE, 'utf-8'), 10) + 1;
  }
  fs.writeFileSync(COUNTER_FILE, num.toString());
  return num;
}

test.describe('Gestão de Usuários - Criar Perfil', () => {
  test('Acessa a página de gestão de usuários, clica em Novo perfil, preenche nome e seleciona Profissional de Saúde', async ({ page }) => {
    try {
      // Aguarda o carregamento completo da página
      const response = await page.goto('https://staging.fap.clinic.kompa.com.br/gestao-usuario', { waitUntil: 'networkidle' });
      if (!response || !response.ok()) {
        console.log('Falha ao acessar a página de gestão de usuários:', response && response.status());
      } else {
        console.log('Página acessada com sucesso!');
      }
      await expect(page).toHaveURL(/gestao-usuario/);
      console.log('Título da página após goto:', await page.title());
      await page.screenshot({ path: 'debug-gestao-usuario.png', fullPage: true });

      // Clica no botão '+ Novo perfil' pelo texto visível, robusto para Ionic
      await page.getByRole('button', { name: '+ Novo perfil' }).click();

      // Aguarda navegação para a página de criação de perfil
      await expect(page).toHaveURL(/criar-perfil-usuario/);
      console.log('Título da página após clicar em Novo perfil:', await page.title());
      await page.screenshot({ path: 'debug-criar-perfil-usuario.png', fullPage: true });

      // Preenche o campo 'Nome do Perfil' com valor incremental
      const profileNumber = getNextProfileNumber();
      await page.locator('ion-input[placeholder="Nome do Perfil"] input').fill(`teste automatizado numero${profileNumber}`);

      // Seleciona o radio 'Profissional de Saúde' (valor="healthcare") dentro do shadow DOM
      const radio = page.locator('ion-radio[value="healthcare"]');
      await radio.evaluate((el) => {
        const button = el.shadowRoot && el.shadowRoot.querySelector('button');
        if (button) (button as HTMLElement).click();
      });
    } catch (error) {
      console.log('Erro durante o fluxo de criação de perfil:', error);
      await page.screenshot({ path: 'debug-erro.png', fullPage: true });
      throw error;
    }
  });
});

test('Teste com contexto manual', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'manual-context.png' });
  await browser.close();
}); 