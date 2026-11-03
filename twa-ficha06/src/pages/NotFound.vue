<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h2>404 - Página Não Encontrada</h2>
    <p>O endereço que procuras não existe.</p>
    <RouterLink to="/">Voltar ao Catálogo</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>