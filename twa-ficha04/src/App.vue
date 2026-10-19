<script setup>
import { ref, computed, onMounted } from 'vue'
import { search, categories, sortByPrice, byCategory } from './catalog.js'
import ItemList from './components/ItemList.vue'

const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('asc')
const selectedId = ref(null)

async function load() {
  status.value = 'loading'
  error.value = null
  try {
    const res = await fetch('./items.json')
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
    items.value = await res.json()
    status.value = 'ok'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

onMounted(() => {
  load()
})

const cats = computed(() => categories(items.value))

const visible = computed(() => {
  let result = search(items.value, query.value)
  if (category.value) {
    result = byCategory(result, category.value)
  }
  return sortByPrice(result, sortDir.value)
})

const selected = computed(() => {
  return items.value.find(item => item.id === selectedId.value) || null
})

const counterText = computed(() => {
  return `${visible.value.length} de ${items.value.length} itens`
})

function clearQuery() {
  query.value = ''
}
</script>

<template>
  <main class="catalog-container">
    <h1>Catálogo de Produtos</h1>

    <div v-if="status === 'loading'">A carregar dados...</div>

    <div v-else-if="status === 'error'" class="error-box">
      <p>Ocorreu um erro: {{ error }}</p>
      <button @click="load">Retry</button>
    </div>

    <div v-else-if="status === 'ok'">
      <div class="filters">
        <input 
          type="text" 
          v-model="query" 
          placeholder="Pesquisar..." 
        />

        <button v-if="query" @click="clearQuery">Limpar</button>

        <select v-model="category">
          <option value="">Todas as categorias</option>
          <option v-for="cat in cats" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <button @click="sortDir = sortDir === 'asc' ? 'desc' : 'asc'">
          Ordenar ({{ sortDir }})
        </button>
      </div>

      <p class="counter-info">{{ counterText }}</p>

      <ItemList 
        :items="visible" 
        :selectedId="selectedId"
        @select="id => selectedId = id" 
      />

      <section v-if="selected" class="item-details">
        <h2>Detalhes do Item</h2>
        <p><strong>Nome:</strong> <span v-html="selected.name"></span></p>
        <p><strong>Preço:</strong> {{ selected.price.toFixed(2) }} €</p>
        <p><strong>Tags:</strong> {{ selected.tags?.join(', ') }}</p>
        <div v-if="selected.details">
          <p><strong>Detalhes Adicionais:</strong> {{ JSON.stringify(selected.details) }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.catalog-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 1rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.counter-info {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.item-details {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-box {
  color: red;
}
</style>