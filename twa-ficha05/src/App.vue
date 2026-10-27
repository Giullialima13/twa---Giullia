<script setup>
import { ref, computed, watch } from 'vue'
import { search, categories, sortByPrice, byCategory } from './catalog.js'
import { useLoad } from './composables/useLoad.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

const { status, error, items, load } = useLoad('/items.json')

const query = ref('')
const category = ref('')
const sortDir = ref('asc')
const selectedId = ref(null)

// watch: pesquisar limpa a seleção
watch(query, () => {
  selectedId.value = null
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

// Cálculo do próximo ID 
const nextId = computed(() => {
  return Math.max(0, ...items.value.map(i => i.id)) + 1
})

function addItem(newItem) {
  items.value.push({ id: nextId.value, ...newItem })
}

function clearQuery() {
  query.value = ''
}
</script>

<template>
  <main class="catalog-container">
    <h1>Catálogo de Produtos - Ficha 05</h1>

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

      <!-- Componente da Lista -->
      <ItemList 
        :items="visible" 
        :selectedId="selectedId"
        @select="id => selectedId = id" 
      />

      <!-- Componente de Detalhes -->
      <ItemDetail :item="selected" />

      <!-- Componente do Formulário -->
      <ItemForm :cats="cats" @save="addItem" />
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
.error-box {
  color: red;
}
</style>