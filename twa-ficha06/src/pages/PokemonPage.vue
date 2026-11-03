<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

const page = computed(() => Number(route.query.page ?? 1))


const { status, error, items: data } = useLoad(() => list(page.value))

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <div class="pokemon-page">
    <h2>Lista Paginada - PokéAPI</h2>

    <div v-if="status === 'loading'">A carregar Pokémon...</div>
    <div v-else-if="status === 'error'">{{ error }}</div>
    
    <div v-else-if="status === 'ready' && data">
      <div class="pagination-controls">
        <button :disabled="page <= 1" @click="go(page - 1)">Anterior</button>
        <span>Página {{ page }} de {{ pages }}</span>
        <button :disabled="page >= pages" @click="go(page + 1)">Seguinte</button>
      </div>

      <ul class="pokemon-list">
        <li v-for="p in data.results" :key="p.name">
          {{ p.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pokemon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}
.pagination-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.pagination-controls button {
  padding: 0.4rem 0.8rem;
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #f4f4f5;
  border-radius: 4px;
  cursor: pointer;
}
.pagination-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pokemon-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 300px;
}
.pokemon-list li {
  background: #18181b;
  border: 1px solid #27272a;
  padding: 0.75rem;
  border-radius: 6px;
  text-transform: capitalize;
}
</style>