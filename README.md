# Playwright Test Automation Project - FAP

Este projeto contém testes automatizados usando Playwright para a aplicação FAP (FAP Clinic).

## Estrutura do Projeto

```
├── tests/
│   ├── pages/           # Page Objects (CredenciamentoPage, etc.)
│   ├── utils/           # Funções utilitárias
│   ├── fixtures/        # Dados de teste
│   └── *.spec.ts        # Arquivos de teste
├── playwright.config.js # Configuração do Playwright
└── package.json
```

## Casos de Teste Implementados

- Credenciamento
  - Acesso à página de credenciamento
  - Preenchimento do nome da clínica
  - Preenchimento do perfil

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