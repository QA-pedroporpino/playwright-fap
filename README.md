# Playwright Test Automation Project

Este projeto contém testes automatizados usando Playwright para a aplicação FAP.

## Estrutura do Projeto

```
├── tests/
│   ├── pages/           # Page Objects
│   ├── utils/           # Funções utilitárias
│   ├── fixtures/        # Dados de teste
│   └── *.spec.ts        # Arquivos de teste
├── playwright.config.js # Configuração do Playwright
└── package.json
```

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

## Geração de Relatórios

Após a execução dos testes, um relatório HTML será gerado automaticamente. Para visualizar:
```bash
npx playwright show-report
``` 