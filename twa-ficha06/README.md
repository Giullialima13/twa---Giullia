# Ficha 06 – Rotas e Paginação em Vue.js

Unidade Curricular: TWA (Tecnologias da Web Avançadas)

Aplicação web interativa desenvolvida em Vue.js (com Vite) no âmbito da unidade curricular de Tecnologias da Web Avançadas (TWA).

## Funcionalidades Implementadas

- **Gestão de Rotas (Vue Router):**

- **Estado Global Reativo (Store ao Nível do Módulo):**

- **Paginação de APIs Externas:**

- **Integração da Entidade do Grupo (Parte 4):**

---
## perguntas

--A página de resultados vive no URL (?page=3) e não num ref. O que deixaria de funcionar com um ref?
Com um ref, o estado da página perder-se-ia ao fazer reload ou ao partilhar o link diretamente com outro utilizador. O URL como fonte de verdade permite que o estado de paginação seja persistido, permitindo usar os botões back/forward do browser e o acesso direto via link.   

--Criaste um item em /items/new, voltaste à lista e lá estava; fizeste reload e desapareceu. Explica as duas coisas e o que muda no M2.
O item apareceu porque o store.js mantém o estado em memória RAM durante o ciclo de vida da aplicação SPA. Desapareceu no reload porque os dados não foram persistidos numa base de dados ou API externa. No M2, a persistência passará a ser garantida através da gravação remota na API do projeto.
--/items/1 para /items/2 reutiliza o ItemPage; / para /items/1 monta-o de novo. Quando chega o onMounted e quando é preciso um watch?
O onMounted corre apenas quando o componente é montado pela primeira vez na árvore DOM (como na transição de / para /items/1). Quando mudamos de /items/1 para /items/2, o componente é reutilizado e o onMounted não volta a disparar, sendo necessário usar um watch para detetar a alteração do parâmetro no URL e atualizar os dados.   
--SPA, SSR ou SSG: qual escolherias para o vosso projeto, e qual para o site público da ISLA? Porquê?
Para o projeto da UC (TWA), uma SPA é ideal pela simplicidade e interatividade dinâmica. Para o site público da ISLA, escolheria SSG (Static Site Generation) ou SSR (Server-Side Rendering) devido à necessidade de excelente otimização para motores de busca (SEO) e tempos de carregamento iniciais rápidos.

## Referências e Fontes de Ajuda

1. Documentação Oficial do Vue.js:
   - [Vue.js - Guide](https://vuejs.org/guide/introduction.html)
   - [Vue.js - Reactivity (reactive vs ref)](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
   - [Vue.js - Watchers](https://vuejs.org/guide/essentials/watchers.html)
2. Documentação Oficial do Vue Router:
   - [Vue Router Documentation](https://router.vuejs.org/)
3. Documentação Oficial da PokéAPI:
   - [PokéAPI Documentation](https://pokeapi.co/)
4. Documentação Oficial do Vite:
   - [Vite - Getting Started](https://vitejs.dev/guide/)
5. Materiais de Apoio da Unidade Curricular:
   - Enunciado e slides da Ficha 06 – Rotas e paginação, Tecnologias da Web Avançadas (TWA)

## Como Rodar o Projeto

1. Instalar as dependências:
   ```bash
   npm install
   npm install vue-router

##   Declaração de IA
Em conformidade com as normas da unidade curricular para o trabalho autónomo realizado em casa, recorreu-se a ferramentas de Inteligência Artificial (IA) como suporte para o esclarecimento de dúvidas conceptuais e estruturação do código