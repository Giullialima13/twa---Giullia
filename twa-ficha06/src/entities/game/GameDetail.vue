<script setup>
import { useRoute } from 'vue-router'
import { useLoad } from '../../composables/useLoad.js'
import { get } from './api.js'

const route = useRoute()
const { status, error, items: game } = useLoad(() => get(route.params.id))
</script>

<template>
  <div class="game-detail">
    <RouterLink to="/">← Voltar à Lista</RouterLink>

    <div v-if="status === 'loading'">A carregar detalhes do jogo...</div>
    <div v-else-if="status === 'error'">Erro: {{ error }}</div>

    <div v-else-if="status === 'ready' && game" class="card">
      <h2>{{ game.name }}</h2>
      <p><strong>Categoria:</strong> {{ game.category }}</p>
      <p><strong>Preço:</strong> {{ game.price }} EUR</p>
    </div>
  </div>
</template>

<style scoped>
.game-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.card {
  background: #18181b;
  border: 1px solid #27272a;
  padding: 1.5rem;
  border-radius: 8px;
  color: #fff;
}
</style>