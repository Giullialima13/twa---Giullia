<script setup>
import { useRouter } from 'vue-router'
import { addItem } from '../store.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

const onSave = (newItem) => {
  const newId = addItem(newItem)
  router.push({ name: 'item', params: { id: newId } })
}
</script>

<template>
  <div class="new-item-page">
    <h2>Adicionar Novo Item</h2>
    <ItemForm @save="onSave" />
  </div>
</template>