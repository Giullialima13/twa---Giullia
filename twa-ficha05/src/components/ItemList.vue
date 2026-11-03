<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])

const selectItem = (id) => {
  emit('select', id)
}
</script>

<template>
  <div class="item-list">
    <h3>Lista de Itens</h3>
    <ul>
      <li v-for="item in items" :key="item.id" @click="selectItem(item.id)" class="item-card">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">{{ item.price }} EUR</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.item-list {
  width: 100%;
  max-width: 450px;
}

h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: #ffffff;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-card {
  background: #18181b;
  border: 1px solid #27272a;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.item-card:hover {
  border-color: #10b981;
}

.item-name {
  font-weight: 500;
  color: #f4f4f5;
}

.item-price {
  color: #10b981;
  font-size: 0.9rem;
}
</style>