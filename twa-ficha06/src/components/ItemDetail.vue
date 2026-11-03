<script setup>
defineProps({
  item: Object
})
</script>

<template>
  <section v-if="item" class="item-details">
    <h2>Detalhes do Item</h2>
    <p><strong>Nome:</strong> <span>{{ item.name }}</span></p>
    <p><strong>Preço:</strong> {{ item.price.toFixed(2) }} €</p>
    <p><strong>Tags:</strong> {{ item.tags?.join(', ') }}</p>
    <div v-if="item.details">
      <p><strong>Detalhes Adicionais:</strong> {{ JSON.stringify(item.details) }}</p>
    </div>
  </section>
</template>

<style scoped>
.item-details {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>