<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['save'])

// Um ref por campo
const name = ref('')
const category = ref('game')
const price = ref(0)
const tagsInput = ref('')
const authorName = ref('')
const authorCountry = ref('')

// Controlo de erros por campo
const errors = ref({
  name: '',
  price: ''
})

// Validação geral do formulário
const isValid = computed(() => {
  return name.value.trim().length > 0 && price.value >= 0 && !errors.value.name
})

const validateField = (field) => {
  if (field === 'name') {
    errors.value.name = name.value.trim() ? '' : 'O nome e obrigatorio.'
  }
}

const handleSubmit = () => {
  validateField('name')
  if (!isValid.value) return

  // Converter a string de tags separadas por virgula num array limpo
  const tagsArray = tagsInput.value
    ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const newItem = {
    id: Date.now(), // ID unico baseado no timestamp
    name: name.value.trim(),
    category: category.value,
    price: Number(price.value),
    tags: tagsArray,
    author: {
      name: authorName.value.trim(),
      country: authorCountry.value.trim().toUpperCase()
    }
  }

  emit('save', newItem)

  // Limpar formulario
  name.value = ''
  category.value = 'game'
  price.value = 0
  tagsInput.value = ''
  authorName.value = ''
  authorCountry.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="item-form">
    <h3>Adicionar Novo Item</h3>

    <div class="form-group">
      <label>Nome</label>
      <input 
        v-model="name" 
        type="text" 
        placeholder="Nome do item..." 
        @blur="validateField('name')"
      />
      <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label>Categoria</label>
      <input v-model="category" type="text" placeholder="Ex: game" />
    </div>

    <div class="form-group">
      <label>Preco (EUR)</label>
      <input v-model.number="price" type="number" step="0.01" min="0" />
    </div>

    <div class="form-group">
      <label>Tags (separadas por virgula)</label>
      <input v-model="tagsInput" type="text" placeholder="indie, 2d, acao" />
    </div>

    <div class="form-group">
      <label>Autor / Criador</label>
      <input v-model="authorName" type="text" placeholder="Nome do autor" />
    </div>

    <div class="form-group">
      <label>Pais do Autor (Codigo)</label>
      <input v-model="authorCountry" type="text" maxlength="2" placeholder="Ex: PT, US" />
    </div>

    <button type="submit" :disabled="!isValid" class="submit-btn">Guardar Item</button>
  </form>
</template>

<style scoped>
.item-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

label {
  font-size: 0.85rem;
  color: #a1a1aa;
}

input {
  background: #09090b;
  border: 1px solid #3f3f46;
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  color: #f4f4f5;
  font-size: 0.9rem;
  outline: none;
}

input:focus {
  border-color: #10b981;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
}

.submit-btn {
  background: #10b981;
  color: #09090b;
  border: none;
  padding: 0.65rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s;
}

.submit-btn:disabled {
  background: #27272a;
  color: #71717a;
  cursor: not-allowed;
}
</style>