import { search, byCategory, categories, sortByPrice } from './catalog.js';

const state = {
  status: 'loading', //os estados aqui
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
};

//Carregamento com Promise.all (itens locais + PokéAPI)
async function load() {
  state.status = 'loading';
  state.error = null;
  render();

  try {
    const [localRes, pokeRes] = await Promise.all([
      fetch('/items.json'),
      fetch('https://pokeapi.co/api/v2/pokemon?limit=6')
    ]);

    if (!localRes.ok) throw new Error(`Erro HTTP local: ${localRes.status}`);
    if (!pokeRes.ok) throw new Error(`Erro HTTP API externa: ${pokeRes.status}`);

    const localContentType = localRes.headers.get('content-type');
    if (localContentType && localContentType.includes('text/html')) {
      throw new Error('Ficheiro de dados local não encontrado (resposta HTML detetada).');
    }

    const localItems = await localRes.json();
    const pokeData = await pokeRes.json();

    //pega as coisas do pokeapi e coloca pro padrão da losta
    const pokeItems = pokeData.results.map((p, index) => ({
      id: 1000 + index,
      name: `Pokémon: ${p.name.toUpperCase()}`,
      price: Number((Math.random() * 40 + 10).toFixed(2)),
      category: 'Colecionáveis',
      tags: ['api', 'pokemon', 'externo']
    }));

    // Junta os itens locais com os do api
    state.items = [...localItems, ...pokeItems];
    state.status = 'ready';
  } catch (err) {
    state.status = 'error';
    state.error = err.message;
  } finally {
    render();
  }
}

function render() {
  const listEl = document.getElementById('list');
  const detailEl = document.getElementById('detail');
  const categorySelect = document.getElementById('category');

  // Limpar conteúdos de antes
  listEl.textContent = '';
  detailEl.textContent = '';

  //Loading
  if (state.status === 'loading') {
    const p = document.createElement('p');
    p.textContent = 'A carregar catálogo (Local + API)...';
    listEl.appendChild(p);
    return;
  }

  //Erro com Botão "Tentar de novo"
  if (state.status === 'error') {
    const p = document.createElement('p');
    p.textContent = `Erro ao carregar: ${state.error}`;
    
    const retryBtn = document.createElement('button');
    retryBtn.textContent = 'Tentar de novo';
    retryBtn.addEventListener('click', load);

    listEl.appendChild(p);
    listEl.appendChild(retryBtn);
    return;
  }

  // Preencher o <select> com as categoriasque existem
  if (categorySelect.options.length <= 1) {
    const cats = categories(state.items);
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  // Filtrar e Ordenar
  let filtered = search(state.items, state.query);
  
  if (state.category) {
    filtered = byCategory(filtered, state.category);
  }

  filtered = sortByPrice(filtered, state.sortDir);

  if (filtered.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Nenhum item encontrado.';
    listEl.appendChild(p);
  } else {
    filtered.forEach(item => {
      const li = document.createElement('li');
      li.dataset.id = item.id;
      
      const span = document.createElement('span');
      span.textContent = `${item.name} - ${item.price}€`;
      
      li.appendChild(span);
      listEl.appendChild(li); 
    });
  }

  // mostra coisas do item selecionado
  if (state.selectedId !== null) {
    const selectedItem = state.items.find(i => i.id === Number(state.selectedId));
    if (selectedItem) {
      const h2 = document.createElement('h2');
      h2.textContent = selectedItem.name;

      const pPrice = document.createElement('p');
      pPrice.textContent = `Preço: ${selectedItem.price}€`;

      const pCategory = document.createElement('p');
      pCategory.textContent = `Categoria: ${selectedItem.category || 'N/A'}`;

      const pTags = document.createElement('p');
      pTags.textContent = `Tags: ${selectedItem.tags ? selectedItem.tags.join(', ') : 'Nenhuma'}`;

      detailEl.appendChild(h2);
      detailEl.appendChild(pCategory);
      detailEl.appendChild(pPrice);
      detailEl.appendChild(pTags);
    }
  }
}


document.getElementById('list').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const itemId = li.dataset.id;
  if (itemId) {
    state.selectedId = itemId;
    render();
  }
});

// Event Listeners para os controles de pesquisa, categoria e ordenação
document.getElementById('search').addEventListener('input', (e) => {
  state.query = e.target.value;
  render();
});

document.getElementById('category').addEventListener('change', (e) => {
  state.category = e.target.value;
  render();
});

const sortBtn = document.getElementById('sort');
if (sortBtn) {
  sortBtn.addEventListener('click', () => {
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    sortBtn.textContent = `Ordenar por preço (${state.sortDir.toUpperCase()})`;
    render();
  });
}


load();