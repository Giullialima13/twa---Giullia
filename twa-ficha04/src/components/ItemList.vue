<script setup>
// Exibe a lista recebendo a prop 'items'
defineProps(['items', 'selectedId'])
defineEmits(['select'])
</script>

<template>
  <ul class="item-list">
    <li 
      v-for="item in items" 
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="$emit('select', item.id)"
    >
      <!-- Ponto C: Usando v-html num campo ou renderização normal -->
      <span v-html="item.name"></span> · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
.item-list {
  list-style: none;
  padding: 0;
}

.item-list li {
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  background: #f4f4f4;
  cursor: pointer;
  border-radius: 4px;
}

.item-list li.selected {
  background: #007bff;
  color: white;
}
</style>
