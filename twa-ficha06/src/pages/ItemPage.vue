<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { items, status, ensureLoaded } from '../store.js'

onMounted(ensureLoaded)
const route = useRoute()


const id = computed(() => Number(route.params.id))
const item = computed(() => (items.value ?? []).find(i => i.id === id.value))
</script>

<template>
  <div class="item-page">
    <RouterLink to="/">← Voltar à Lista</RouterLink>

    <div v-if="status === 'loading'">A carregar...</div>
    <div v-else-if="!item">Item {{ id }} não encontrado.</div>
    <div v-else class="details">
      <h3>{{ item.name }}</h3>
      <p><strong>Categoria:</strong> {{ item.category }}</p>
      <p><strong>Preço:</strong> {{ item.price }} EUR</p>
    </div>
  </div>
</template>

<style scoped>
.item-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}
.details {
  background: #18181b;
  border: 1px solid #27272a;
  padding: 1.5rem;
  border-radius: 8px;
  width: 100%;
}
</style>