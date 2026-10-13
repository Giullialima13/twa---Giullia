# Ficha 03 – Página do Catálogo

Aplicação web interativa desenvolvida para unidade curricular de *Tecnologias Web Avançadas (TWA)*

## Funcionalidades Implementadas
* **Gestão de Estado Assíncrona (`load`)**: Controlo robusto dos três estados da aplicação (`loading`, `error` e `ready`), incluindo botão dinâmico para novas tentativas
* **Carregamento Combinado (`Promise.all`)**: Integração em paralelo de dados locais (`items.json`) com uma API externa pública (**PokéAPI**), expandindo dinamicamente o catálogo
* **Delegação de Eventos**: Otimização de performance com um único ouvinte de eventos (`EventListener`) centralizado no elemento pai (`#list`), utilizando `e.target.closest('li')`
* **Renderização Segura do DOM**: Construção de elementos via `document.createElement` e `textContent`, prevenindo vulnerabilidades de injeção de HTML e ataques XSS
* **Tratamento de Erros e Resiliência**: Mitigação da "Armadilha do Vite" (validação rigorosa do tipo de conteúdo HTTP) e captura de falhas de rede (`404`)

---

##Fontes
* Guia oficial sobre o servidor de desenvolvimento, asset handling e diretoria `public/` — [Vite Guide](https://vite.dev/guide/)
* [Utilizar Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
* [Promise.all() - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
* [Delegação de Eventos](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/Events#delegação_de_eventos)
* Documentação da API pública utilizada para fontes de dados secundárias — [PokéAPI Docs](https://pokeapi.co/docs/v2)

---

## Tutoriais usados
* (https://www.youtube.com/watch?v=V_Kr9OSfDeU) — Demonstração de como carregar múltiplos endpoints em paralelo de forma eficiente.
---

## Declaração de IA
Em conformidade com as normas da unidade curricular para o trabalho autónomo realizado em casa, recorreu-se a ferramentas de Inteligência Artificial (IA) como suporte para a implementação do `Promise.all` pq tive dificuldades em entender a lógica

---

## Como Executar o Projeto
1. Clonar ou abrir a pasta do projeto no terminal.
2. Instalar as dependências necessárias:
   ```bash
   npm install