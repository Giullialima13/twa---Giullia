# Ficha 09 – Estrutura, validação e erros

Unidade Curricular: TWA (Tecnologias da Web Avançadas)

Reestruturação da API REST em Express com separação de responsabilidades, configuração por ambiente, validação declarativa com `zod` e tratamento centralizado de erros

## Funcionalidades Implementadas

- **Estrutura Modular e Configuração (`.env`):** Separação entre `server.js` (arranque e porta) e `app.js` (middlewares e rotas), leitura de variáveis de ambiente via `config.js` e suporte nativo do Node a `--env-file-if-exists=.env` com `.env.example` versionado
- **Organização por Entidade:** Dados, geração/procura de IDs (`data.js`), esquemas de validação (`schema.js`) e rotas HTTP (`router.js`) isolados em `src/entities/items/`
- **Validação com `zod`:** Esquemas reutilizados em `POST`, `PUT`, `PATCH` (via `validate.js`) e query string (`listQuerySchema`), devolvendo objetos limpos (`trim()`, valores por omissão e remoção de campos extra) e um erro por campo (`{ errors }`) em caso de 400
- **Tratamento Centralizado de Erros (`errors.js`):** Classe `HttpError`, auxiliar `notFound()`, rotas a lançar exceções em vez de responderem manualmente a 404, e `errorHandler` único para `ZodError` (400), JSON inválido (400), erros HTTP (ex: 404) e erros internos (500 sem exposição de stack ao cliente)

## Perguntas de Reflexão

- **1. O `ItemForm.vue` já validava `name` e `price` no browser. Porque é que o servidor valida outra vez e o que é que o esquema `zod` faz que os `ifs` da Ficha 05 e da Ficha 08 não faziam (pensa no `id: 1` e no `foo` que mandaste no POST)?**
  O servidor tem de validar sempre porque clientes diretos (como `curl`, scripts ou ferramentas externas) podem contornar o formulário do browser e enviar dados inválidos ou maliciosos. Ao contrário dos `ifs` manuais, o `zod` valida tipos de forma declarativa, aplica transformações (`trim()`, `default()`) e devolve `result.data` limpo — descartando campos não permitidos ou controlados pelo servidor como `id` e `foo`

- **2. Onde deve estar a decisão «isto é um 404»: na rota ou no error handler? O que ganhas em ter `res.status(404)` num só sítio quando o projeto tiver 4 entidades e o que acontece no M2 quando o Mongoose lançar um `CastError` para um `id` mal formado?**
  A regra de negócio ou recurso inexistente deve lançar um erro semântico (como `throw notFound(...)`), enquanto a formatação da resposta HTTP fica centralizada no `errorHandler`. Com 4 entidades, evita-se repetir `res.status(404).json(...)` em todo o lado e garante-se um formato consistente. No M2, o `errorHandler` pode mapear o `CastError` do Mongoose para `400` ou `404` num único ponto.

- **3. `.env` vs `.env.example`: o que muda entre o teu portátil, o do teu colega e o meu quando corrijo o M2? Porque é que um entra no repositório e o outro não e o que correria mal se fosse ao contrário?**
  Entre cada máquina mudam valores locais como `PORT`, credenciais ou caminhos/URIs de base de dados. O `.env.example` entra no repositório para documentar as variáveis necessárias, enquanto o `.env` fica fora via `.gitignore` porque contém configurações locais e segredos. Se o `.env` fosse versionado, haveria conflitos constantes entre colegas e exposição de dados sensíveis; se o `.env.example` faltasse, seria mais difícil saber que variáveis configurar.

- **4. O mesmo `POST /api/items` em Express, Fastify e Hono: o que é igual (rota, handler, estado, JSON) e o que cada um dá de série (validação, erros, runtime)? Qual escolherias para uma API que corre num worker da Cloudflare, e porquê?**
  Em todos eles mantêm-se os conceitos HTTP base: o método/caminho (`POST /api/items`), a lógica do handler, os códigos de estado (como `201` e `400`) e o corpo em JSON. O Express dá um modelo minimalista baseado em middlewares; o Fastify traz validação por esquema, serialização e gestão de erros mais integradas; o Hono é leve, rápido e orientado a padrões Web/edge. Num worker da Cloudflare, escolheria o Hono pela leveza e compatibilidade nativa com o runtime de edge.

## Referências e Fontes de Ajuda

1. Documentação Oficial do Zod:
   - [Zod Documentation](https://zod.dev/)
2. Documentação Oficial do Node.js:
   - [Node.js - Command-line options (`--env-file-if-exists`)](https://nodejs.org/api/cli.html)
3. Documentação Oficial do Express:
   - [Express 5 - Error Handling](https://expressjs.com/en/guide/error-handling.html)
4. Materiais de Apoio da Unidade Curricular:
   - Enunciado da Ficha 09 – Estrutura, validação e erros, Tecnologias da Web Avançadas (TWA)

## Como Rodar o Projeto

1. Instalar as dependências:
   ```bash
   npm install

##   Declaração de IA
Em conformidade com as normas da unidade curricular para o trabalho autónomo realizado em casa, recorreu-se a ferramentas de Inteligência Artificial (IA) como suporte para o esclarecimento de dúvidas conceptuais e estruturação do código