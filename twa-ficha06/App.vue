<script setup>
import { ref, computed } from 'vue'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'
import { useLoad } from './Composables/useLoad.js'


const activeTab = ref('lista')
const { items, status } = useLoad('/catalog/items.json')

const selectedItemId = ref(null)
const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!items.value) return []
  if (!searchQuery.value.trim()) return items.value
  return items.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectedItem = computed(() => {
  if (!items.value || !selectedItemId.value) return null
  return items.value.find(item => item.id === selectedItemId.value)
})

const handleSelect = (id) => {
  selectedItemId.value = id
  activeTab.value = 'consulta'
}

const handleSave = (newItem) => {
  if (Array.isArray(items.value)) {
    items.value.push(newItem)
  }
  selectedItemId.value = newItem.id
  activeTab.value = 'consulta'
}
</script>

<template>
  <div class="app-container">
    <h2>Gestao de Produtos</h2>

    <nav class="tabs-nav">
      <button 
        :class="{ active: activeTab === 'lista' }" 
        @click="activeTab = 'lista'"
      >
        Lista Completa
      </button>
      <button 
        :class="{ active: activeTab === 'consulta' }" 
        @click="activeTab = 'consulta'"
      >
        Consulta
      </button>
      <button 
        :class="{ active: activeTab === 'novo' }" 
        @click="activeTab = 'novo'"
      >
        Adicionar Item
      </button>
    </nav>

    <main class="tab-content">
      <section v-if="activeTab === 'lista'">
        <p v-if="status === 'loading'">A carregar itens...</p>
        <ItemList 
          v-else-if="status === 'ok'" 
          :items="items" 
          @select="handleSelect" 
        />
        <p v-else class="error">Erro ao carregar dados.</p>
      </section>

      <section v-if="activeTab === 'consulta'" class="consulta-section">
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Pesquisar item por nome..." 
            class="search-input"
          />
        </div>

        <div v-if="searchQuery && filteredItems.length > 0" class="search-results">
          <ul>
            <li 
              v-for="item in filteredItems" 
              :key="item.id" 
              @click="selectedItemId = item.id" 
              class="search-item"
            >
              {{ item.name }} - {{ item.price }}€
            </li>
          </ul>
        </div>

        <ItemDetail 
          v-if="selectedItem" 
          :item="selectedItem" 
        />
        <p v-else class="empty-hint">Nenhum item selecionado. Escreve na pesquisa acima ou escolhe um item na lista.</p>
      </section>

      <section v-if="activeTab === 'novo'">
        <ItemForm @save="handleSave" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #121214;
  border-radius: 12px;
  color: #e4e4e7;
  font-family: system-ui, -apple-system, sans-serif;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffffff;
}

.tabs-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #27272a;
  padding-bottom: 8px;
  margin-bottom: 1.5rem;
}

.tabs-nav button {
  flex: 1;
  background: transparent;
  border: 1px solid transparent;
  color: #a1a1aa;
  padding: 0.65rem 0.5rem;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tabs-nav button:hover {
  background: #18181b;
  color: #f4f4f5;
}

.tabs-nav button.active {
  background: #27272a;
  color: #10b981;
  border-color: #3f3f46;
  font-weight: 600;
}

.tab-content {
  display: flex;
  justify-content: center;
  min-height: 250px;
}

.tab-content > section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.consulta-section {
  width: 100%;
}

.search-box {
  width: 100%;
  max-width: 340px;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  background: #09090b;
  border: 1px solid #3f3f46;
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  color: #f4f4f5;
  font-size: 0.9rem;
  outline: none;
}

.search-input:focus {
  border-color: #10b981;
}

.search-results {
  width: 100%;
  max-width: 340px;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 6px;
  margin-bottom: 1rem;
  max-height: 150px;
  overflow-y: auto;
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #27272a;
  font-size: 0.85rem;
}

.search-item:hover {
  background: #27272a;
  color: #10b981;
}

.empty-hint {
  color: #71717a;
  font-style: italic;
  margin-top: 1rem;
  text-align: center;
}

.error {
  color: #ef4444;
}
</style>