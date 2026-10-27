<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

defineEmits(['select'])
</script>

<template>
  <div class="item-list">
    <h3>Lista de Itens</h3>
    
    <!-- Se houver itens, mostra a lista -->
    <ul v-if="items && items.length > 0">
      <li 
        v-for="item in items" 
        :key="item.id" 
        @click="$emit('select', item)"
        class="item-li"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- Mensagem de lista vazia-->
    <p v-else class="empty-message">Nenhum item encontrado.</p>
  </div>
</template>

<style scoped>
.item-list {
  margin: 1rem 0;
}
.item-li {
  cursor: pointer;
  padding: 4px 0;
}
.item-li:hover {
  color: #42b883;
}
.empty-message {
  color: #888;
  font-style: italic;
}
</style>