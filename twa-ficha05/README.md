# Ficha 05 – Componentes e Formulários em Vue.js

Unidade Curricular: TWA (Tecnologias da Web Avançadas)

Aplicação web interativa desenvolvida em Vue.js (com Vite) no âmbito da unidade curricular de Tecnologias da Web Avançadas (TWA)

## Funcionalidades Implementadas

- Modularização de Componentes: 
  - ItemList.vue: Exibição da lista de produtos utilizando defineProps e eventos defineEmits para seleção
  - ItemDetail.vue: Componente dedicado à visualização detalhada do item selecionado através de propriedades descendentes
  - ItemForm.vue: Formulário reativo com validação em tempo real (computed) para adição de novos itens ao catálogo, restrição de botões em caso de erro e reset automático
- Lógica Assíncrona Reutilizável (useLoad): Extração do ciclo de vida de carregamento de dados (fetch) para um composable personalizado (src/composables/useLoad.js)
- Reatividade Avançada (watch): Utilização de observadores (watch) para limpar automaticamente o item selecionado sempre que o utilizador efetua uma nova pesquisa

---

## Como Rodar o Projeto

1. Instalar as dependências:
   npm install

2. Iniciar o servidor de desenvolvimento:
   npm run dev

3. Validar o código:
   node check.js

---

## Refercias e Fontes de Ajuda

1. Documentação Oficial do Vue.js:
   - Vue.js - Components Basics & Props / Emits: https://vuejs.org/guide/essentials/component-basics.html
   - Vue.js - Reactivity (reactive vs ref): https://vuejs.org/guide/essentials/reactivity-fundamentals.html
   - Vue.js - Composables: https://vuejs.org/guide/reusability/composables.html
   - Vue.js - Watchers: https://vuejs.org/guide/essentials/watchers.html

2. Documentação Oficial do Vite:
   - Vite - Getting Started: https://vitejs.dev/guide/

3. MDN Web Docs (Mozilla):
   - MDN Web Docs - Using Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

4. Materiais de Apoio da Unidade Curricular:
   - Enunciado e slides da Ficha 05 – Componentes e formulários (1/2 e 2/2), Tecnologias da Web Avançadas (TWA)

---
## Declaração de IA
Em conformidade com as normas da unidade curricular para o trabalho autónomo realizado em casa, recorreu-se a ferramentas de Inteligência Artificial (IA) como suporte para consultar alguns erros.
---
