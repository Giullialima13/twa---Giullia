<template>
  <ul class="game-list">
    <li v-for="game in games" :key="game.id">
      <RouterLink :to="`/games/${game.id}`">
        {{ game.title || game.name }}
      </RouterLink>
    </li>
  </ul>
</template>