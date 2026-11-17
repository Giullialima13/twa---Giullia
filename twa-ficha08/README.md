# Ficha 08 – Uma API REST com Express

Unidade Curricular: TWA (Tecnologias da Web Avançadas)

Aplicação de servidor backend desenvolvida em Node.js com Express no âmbito da unidade curricular de Tecnologias da Web Avançadas (TWA).

## Funcionalidades Implementadas

- **Servidor Express (v5) e Módulos ES:** Configuração de um servidor HTTP contínuo em Node.js com suporte a módulos ES (`"type": "module"`) e reinicialização automática em desenvolvimento (`--watch`).
- **Gestão de Rotas Modulares (Router):** Organização das rotas do CRUD de itens através de mini-aplicações isoladas (`Router()`) montadas no caminho `/api/items`.
- **Endpoints REST e Operações CRUD:**
  - `GET /api/health`: Verificação de saúde e estado do servidor.
  - `GET /api/items`: Listagem de itens com suporte a pesquisa opcional (`?q=`) e paginação (`?page=` e `limit=`).
  - `GET /api/items/:id`: Consulta de um item específico por ID, retornando um erro 404 formatado estritamente em JSON se não for encontrado.
  - `POST /api/items`: Criação de novos registos com validação rigorosa no servidor (nome com mínimo de 3 caracteres e preço maior que zero), retornando código 201 com o cabeçalho `Location` ou 400 em caso de erro.
  - `PUT /api/items/:id` e `PATCH /api/items/:id`: Atualização completa ou parcial de itens existentes.
  - `DELETE /api/items/:id`: Remoção de itens com resposta bem-sucedida de código 204 No Content.
- **Middlewares Personalizados:** Implementação de um sistema de registo (*logger*) de pedidos no terminal, leitor de corpos JSON (`express.json()`) posicionado antes das rotas, e um middleware de erro 404 global para apanhar URLs desconhecidos sem nunca devolver HTML.
- **Persistência em Ficheiro:** Gravação síncrona/assíncrona das alterações efetuadas via API diretamente no disco (`data/items.json`) utilizando `node:fs/promises`.

---
## Perguntas de Reflexão

- **1. Na Aula 03 viste que o fetch só rejeita quando não há resposta, e que um 404 chega como res.ok === false. Agora que escreveste o servidor: quem decide o estado, e porque é que faz sentido o fetch não lançar num 404?**
  O estado HTTP é decidido exclusivamente pelo servidor no momento da resposta (ex: `res.status(404)`). Faz sentido o `fetch` não lançar uma exceção num 404 porque a ausência de um recurso faz parte do fluxo normal de uma aplicação web (por exemplo, consultar ou apagar um registo que já não existe), permitindo que o cliente decida de forma controlada como tratar essa resposta sem quebrar o fluxo de execução.

- **2. O express.json() tem de estar antes das rotas. Porquê? E o que acontece a um POST sem o cabeçalho Content-Type: application/json no servidor e no req.body?**
  Os middlewares executam estritamente por ordem sequencial na fila; se o `express.json()` não estiver antes das rotas, o corpo do pedido (`req.body`) chega indefinido (`undefined`) aos manipuladores. Sem o cabeçalho `Content-Type: application/json`, o Express não sabe descodificar o payload recebido, resultando igualmente num `req.body` vazio ou indefinido.

- **3. Criaste um item com POST, reiniciaste o servidor e ele desapareceu. Compara com o create() local do M1: o que é igual, o que é diferente, e o que muda no M2.**
  O comportamento é idêntico: em ambos os casos, os dados são armazenados de forma volátil na memória RAM (num array em JavaScript), pelo que reiniciar o processo limpa as alterações. Na próxima fase (M2 / Aula 10), este armazenamento em memória será substituído por uma base de dados persistente real (MongoDB).

- **4. O mesmo GET /api/items/:id em Laravel: o que é igual (rota, handler, JSON, estado) e o que é diferente (o que o framework dá, o modelo de processo)? Porque é que um array em memória funciona em Node e não funcionaria em PHP?**
  Em frameworks como o Laravel (PHP), o ciclo de vida de cada pedido HTTP é isolado e destrói o ambiente a cada requisição, tornando obrigatória uma base de dados persistente. Em Node.js, como o servidor corre num processo contínuo (*long-running process*), um array em memória sobrevive entre múltiplos pedidos, embora continue a ser desadequado para produção devido à falta de atomicidade, concorrência transacional e escalabilidade.

## Referências e Fontes de Ajuda

1. Documentação Oficial do Node.js:
   - [Node.js - File System (`node:fs/promises`)](https://nodejs.org/docs/latest/api/fs.html)
   - [Node.js - Assert Module](https://nodejs.org/docs/latest/api/assert.html)
2. Documentação Oficial do Express:
   - [Express 5 - Routing & Router](https://expressjs.com/en/guide/routing.html)
   - [Express - Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
3. Materiais de Apoio da Unidade Curricular:
   - Enunciado e slides da Ficha 08 – Uma API REST com Express, Tecnologias da Web Avançadas (TWA)

## Como Rodar o Projeto

1. Instalar as dependências:
   ```bash
   npm install

2. iniciar sevidor:
npm run dev

3. executar scripts de teste automatizados
node check.mjs

##   Declaração de IA
Em conformidade com as normas da unidade curricular para o trabalho autónomo realizado em casa, recorreu-se a ferramentas de Inteligência Artificial (IA) como suporte para o esclarecimento de dúvidas conceptuais e estruturação do código