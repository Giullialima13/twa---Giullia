<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['save'])

const form = reactive({
  name: '',
  price: '',
  tag: ''
})

// Gestão de erross
const errors = computed(() => {
  const errs = {}
  if (!form.name.trim()) errs.name = 'O nome é obrigatório.'
  if (!form.price || form.price <= 0) errs.price = 'O preço deve ser superior a 0.'
  return errs
})

// Validação se o formulário é válido
const isValid = computed(() => {
  return Object.keys(errors.value).length === 0
})

const handleSubmit = () => {
  if (!isValid.value) return

  
  emit('save', {
    id: Date.now(),
    name: form.name,
    price: Number(form.price),
    tag: form.tag
  })

  // Reset do formulário
  form.name = ''
  form.price = ''
  form.tag = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="item-form">
    <h4>Adicionar Novo Item</h4>
    
    <div class="form-group">
      <label>Nome:</label>
      <input v-model="form.name" type="text" placeholder="Nome do item" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label>Preço:</label>
      <input v-model.number="form.price" type="number" placeholder="0.00" />
      <span v-if="errors.price" class="error">{{ errors.price }}</span>
    </div>

    <div class="form-group">
      <label>Categoria / Tag:</label>
      <input v-model="form.tag" type="text" placeholder="Ex: Eletrónicos" />
    </div>
    
    
    <button type="submit" :disabled="!isValid">Guardar Item</button>
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
.error {
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 2px;
}
</style>