# Honey Buzzy — Guia de edição e publicação

Este pacote contém a landing page da Honey Buzzy — Pétala Dourada. O site funciona como uma landing page demonstrativa, sem Shopify, checkout ou pagamentos reais.

## Como abrir no computador

Você precisa ter Node.js instalado. Depois de extrair o arquivo, abra o terminal dentro da pasta do projeto e execute:

```bash
pnpm install
pnpm dev
```

Em seguida, abra o endereço local mostrado pelo Vite, normalmente `http://localhost:5173`.

Se você não usa pnpm, também pode executar `npm install`, seguido de `npm run dev`.

## Onde modificar o site

A maior parte do conteúdo e das interações está em `client/src/pages/Home.tsx`. Edite esse arquivo para alterar textos, títulos, perguntas, preço, ingredientes, botões, quantidade e o painel lateral da sacola.

A identidade visual está em `client/src/index.css`. Nesse arquivo você pode alterar cores, tipografia, espaçamentos, tamanhos, responsividade e animações. O fundo roxo claro está definido nas variáveis `--background`, `--cream` e `--lilac-pale`.

As imagens ficam em `client/public/assets/`. Para trocar uma imagem, substitua o arquivo mantendo o mesmo nome ou atualize o caminho no início de `Home.tsx`.

## Como gerar a versão de produção

Antes de publicar, execute:

```bash
pnpm check
pnpm build
```

A pasta gerada para publicação é `dist/`. Em serviços de hospedagem estática, use o comando de build `pnpm build` e defina `dist` como diretório de saída/publicação.

## Publicação

Você pode importar esta pasta em um serviço de hospedagem estática que aceite projetos Vite. Ao configurar o projeto, use:

| Configuração | Valor |
|---|---|
| Comando de instalação | `pnpm install` |
| Comando de build | `pnpm build` |
| Diretório de saída | `dist` |

O site não depende de banco de dados, login, Shopify ou chaves secretas para abrir e publicar a landing page.

## Observações importantes

A sacola, o contador, o seletor de quantidade e o total são demonstrativos e funcionam apenas enquanto a página está aberta. Não existe cobrança nem checkout. Os ingredientes exibidos são os que foram informados: `Morus Alba Fruit Extract` e `Mel`; consulte sempre a embalagem para a composição completa.
