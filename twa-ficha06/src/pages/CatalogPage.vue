<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items, status, error, ensureLoaded } from '../store.js'
import ItemList from '../components/ItemList.vue'

const router = useRouter()
onMounted(ensureLoaded)

const handleSelect = (id) => {
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <div class="catalog-page">
    <h2>Catálogo Completo</h2>
    <div v-if="status === 'loading'">A carregar...</div>
    <div v-else-if="status === 'error'">{{ error }}</div>
    <div v-else-if="status === 'ready'">
      <ItemList :items="items" @select="handleSelect" />
    </div>
  </div>
</template>