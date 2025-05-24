# Padrão Page Object Model (POM) - FAP Clinic

Este documento descreve o padrão de Page Object Model utilizado no projeto de automação da FAP Clinic.

## Estrutura do POM

### 1. Page Object (PO)
```typescript
// Exemplo: LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly baseUrl = 'https://staging.fap.clinic.kompa.com.br';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(this.baseUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
  }

  async login(email: string, password: string) {
    // Fill in email
    await this.page.locator('input[placeholder="Digite seu e-mail"]').fill(email);

    // Fill in password
    await this.page.locator('input[placeholder="Digite sua senha"]').fill(password);

    // Click login button
    await this.page.getByRole('button', { name: /entrar/i }).click();

    // Wait for navigation after login
    await this.page.waitForURL('**/dashboard**', { timeout: 30000 });
  }
}
```

### 2. Arquivo de Teste
```typescript
// Exemplo: cadastroUsuarioProfissional.spec.ts
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
      
    } catch (error) {
      await logError(page, error, 'login');
      throw error;
    }
  });
});
```

## Boas Práticas Implementadas

1. **Separação de Responsabilidades**
   - Page Object: Contém apenas a lógica de interação com a página
   - Arquivo de Teste: Contém apenas a lógica de teste e validações

2. **Encapsulamento**
   - URLs e seletores são privados dentro do Page Object
   - Métodos públicos expõem apenas as ações necessárias

3. **Tratamento de Erros**
   - Uso de try/catch para capturar e logar erros
   - Screenshots em pontos críticos do teste

4. **Timeouts Configuráveis**
   - Timeouts explícitos para operações críticas
   - Valores padrão para navegação e ações

5. **Validações**
   - Verificações de URL após navegação
   - Esperas explícitas por elementos

## Como Usar o Padrão

1. Crie um novo Page Object para cada página da aplicação
2. Implemente métodos para cada ação possível na página
3. Use o Page Object no arquivo de teste
4. Mantenha as validações no arquivo de teste
5. Use screenshots e logs para debug

## Exemplo de Uso

```typescript
// Criando uma nova página
const novaPage = new NovaPage(page);

// Usando os métodos
await novaPage.navigate();
await novaPage.realizarAcao();
await novaPage.preencherCampo('valor');

// Validações no teste
await expect(page).toHaveURL(/url-esperada/);
await expect(elemento).toBeVisible();
``` 