<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add-item'])

const name = ref('')
const price = ref('')
const tag = ref('')

// Validação 
const isFormValid = computed(() => {
  return name.value.trim() !== '' && price.value > 0 && tag.value.trim() !== ''
})

const handleSubmit = () => {
  if (!isFormValid.value) return

  emit('add-item', {
    id: Date.now(),
    name: name.value,
    price: Number(price.value),
    tag: tag.value
  })

  // Reset automático do formulário
  name.value = ''
  price.value = ''
  tag.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="item-form">
    <h4>Adicionar Novo Item</h4>
    
    <div class="form-group">
      <label>Nome:</label>
      <input v-model="name" type="text" placeholder="Nome do item" />
    </div>

    <div class="form-group">
      <label>Preço:</label>
      <input v-model.number="price" type="number" placeholder="0.00" />
    </div>

    <div class="form-group">
      <label>Categoria / Tag:</label>
      <input v-model="tag" type="text" placeholder="Ex: Eletrónicos" />
    </div>
    
    <!-- Botão desativado se o formulário não for válido -->
    <button type="submit" :disabled="!isFormValid">Guardar Item</button>
  </form>
</template>

<style scoped>
.item-form {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
</style>