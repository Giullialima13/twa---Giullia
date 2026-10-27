<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  cats: Array
})

const emit = defineEmits(['save'])

const form = reactive({
  name: '',
  category: '',
  price: 0,
  tags: ''
})

// Validação dos campos do formulário
const errors = computed(() => {
  const errs = {}
  if (!form.name.trim()) errs.name = 'O nome é obrigatório.'
  if (!form.price || form.price <= 0) errs.price = 'O preço deve ser maior que zero.'
  if (!form.category) errs.category = 'Selecione uma categoria.'
  return errs
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function onSubmit() {
  if (!isValid.value) return
  
  // Converte as tags de string (separadas por vírgula) para array
  const tagsArray = typeof form.tags === 'string' 
    ? form.tags.split(',').map(t => t.trim()).filter(Boolean) 
    : form.tags

  emit('save', {
    name: form.name.trim(),
    category: form.category,
    price: Number(form.price),
    tags: tagsArray
  })

  // Reset ao formulário
  form.name = ''
  form.category = ''
  form.price = 0
  form.tags = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="item-form">
    <h3>Adicionar Novo Item</h3>
    
    <div class="field">
      <label>Nome:</label>
      <input type="text" v-model.trim="form.name" placeholder="Nome do produto" />
      <span class="error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div class="field">
      <label>Categoria:</label>
      <select v-model="form.category">
        <option value="" disabled>Selecione uma categoria</option>
        <option v-for="cat in cats" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <span class="error" v-if="errors.category">{{ errors.category }}</span>
    </div>

    <div class="field">
      <label>Preço (€):</label>
      <input type="number" step="0.01" v-model.number="form.price" placeholder="0.00" />
      <span class="error" v-if="errors.price">{{ errors.price }}</span>
    </div>

    <div class="field">
      <label>Tags:</label>
      <input type="text" v-model="form.tags" placeholder="tag1, tag2" />
    </div>

    <button type="submit" :disabled="!isValid">Guardar Item</button>
  </form>
</template>

<style scoped>
.item-form {
  margin-top: 1.5rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fafafa;
}
.field {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
}
.field input, .field select {
  padding: 0.4rem;
  font-size: 1rem;
}
.error {
  color: #d32f2f;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>