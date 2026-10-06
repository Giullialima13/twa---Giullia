# Ficha 02 — Módulo de Catálogo

Projeto desenvolvido para a Ficha 02 da disciplina de TWA.

O objetivo deste exercício foi criar um pequeno módulo de catálogo em JavaScript, utilizando funções para filtrar, pesquisar, ordenar e calcular informações sobre uma lista de jogos

## Estrutura do projeto

* `data.js` — contém os dados dos itens do catálogo.
* `catalog.js` — contém as funções responsáveis pelas operações sobre o catálogo.
* `app.js` — recebe os comandos através dos argumentos do terminal e apresenta os resultados.
* `check.js` — contém testes simples para verificar o funcionamento das funções.
* `catalog.ts` — versão em TypeScript das funções do catálogo.
* `package.json` — configuração do projeto como módulo ES.

## Funcionalidades

Foram implementadas as seguintes funções:

* `byCategory(list, cat)` — filtra os itens por categoria.
* `search(list, text)` — pesquisa texto no nome e nas tags dos itens, ignorando maiúsculas e minúsculas.
* `total(list)` — calcula o preço total dos itens.
* `top(list, n)` — devolve os `n` itens mais caros.
* `categories(list)` — obtém as categorias existentes, sem repetições e ordenadas.
* `withDiscount(list, pct)` — cria uma nova lista aplicando um desconto percentual aos preços.
* `groupByCategory(list)` — funcionalidade extra para agrupar os itens por categoria.

## Utilização pelo terminal

Alguns exemplos de utilização:

```bash
node app.js
```

Lista todos os itens.

```bash
node app.js game
```

Lista os itens da categoria `game`.

```bash
node app.js search clean
```

Pesquisa por `clean` no nome e nas tags.

```bash
node app.js top 3
```

Apresenta os 3 itens mais caros.

```bash
node app.js report
```

Cria o ficheiro `report.json` com o número de itens, preço total, categorias e os 3 itens mais caros.

## Testes

Os testes podem ser executados através de:

```bash
node check.js
```

Quando os testes passam, o programa não apresenta mensagens no terminal.

## TypeScript

Também foi criada uma versão `catalog.ts`, onde a estrutura dos itens é definida através de uma `interface` chamada `Item`.

Para executar o ficheiro TypeScript foi utilizado:

```bash
node --experimental-strip-types app.js
```
## Fontes utilizadas

Durante a realização do exercício foram consultadas principalmente as seguintes fontes:

[MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

[TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)

utilizei tbm os slides do professor como base lógica e adaptei pro exercicio

## Utilização de Inteligência Artificial

Foi utilizada Inteligência Artificial (ChatGPT) como apoio durante a realização deste exercício, pra entender erros de lógica na parte da pesquisa com várias palavras que mesmo apos eu ver documentação tive dúvidas de como fazer a adaptação pro pedido na lista
