# Playwright Test Automation Project - FAP

Este projeto contém testes automatizados usando Playwright para a aplicação FAP (FAP Clinic), seguindo o padrão Page Object Model (POM).

## Estrutura do Projeto

```
├── tests/
│   ├── pages/           # Page Objects (LoginPage, UserManagementPage, CredenciamentoPage)
│   ├── utils/           # Funções utilitárias (helpers)
│   ├── fixtures/        # Dados de teste
│   ├── cadastroUsuarioProfissional.spec.ts  # Teste de cadastro de usuário profissional
│   ├── criarTabelaExames.spec.ts            # Teste de criação de tabela de exames
│   ├── credenciamento.spec.ts               # Teste de credenciamento
│   └── auth.setup.ts                        # Setup de autenticação
├── playwright.config.ts # Configuração do Playwright
├── package.json
└── docs/POM_PATTERN.md  # Documentação do padrão POM
```

## Casos de Teste Implementados

- Cadastro de Usuário Profissional
- Criação de Tabela de Preços/Exames
- Credenciamento

## Padrão de Automação

O projeto segue o padrão Page Object Model (POM) para garantir manutenibilidade e escalabilidade dos testes.

- Veja detalhes e exemplos em [`docs/POM_PATTERN.md`](docs/POM_PATTERN.md)

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Instale os navegadores do Playwright:
```bash
npx playwright install
```

## Executando os Testes

Para executar todos os testes:
```bash
npx playwright test
```

Para executar testes em modo UI:
```bash
npx playwright test --ui
```

Para executar testes em modo debug:
```bash
npx playwright test --debug
```

Para executar testes em um navegador específico:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Geração de Relatórios

Após a execução dos testes, um relatório HTML será gerado automaticamente. Para visualizar:
```bash
npx playwright show-report
```

## Configuração

O projeto está configurado para:
- Executar testes em paralelo
- Gerar screenshots em caso de falha
- Gravar vídeo em caso de falha
- Timeout de navegação: 30 segundos
- Timeout de ações: 15 segundos
- Timeout de expectativas: 10 segundos

## Ambiente de Teste

Os testes são executados contra o ambiente de staging:
- URL Base: https://staging.fap.clinic.kompa.com.br

## Dependências Principais

- @playwright/test: ^1.52.0
- @types/node: ^22.15.18 