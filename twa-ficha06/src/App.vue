<template>
  <div class="app-shell">
    <header>
      <h1>Aplicação TWA</h1>
      <nav>
        <RouterLink to="/">Catálogo</RouterLink> |
        <RouterLink to="/items/new">Adicionar Item</RouterLink>
        <RouterLink to="/pokemon">PokéAPI</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
<style scoped>
.app-shell {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #f4f4f5;
  font-family: system-ui, -apple-system, sans-serif;
}

header {
  margin-bottom: 2rem;
}

nav {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
}

nav a {
  color: #a1a1aa;
  text-decoration: none;
  font-weight: 500;
}

nav a.router-link-active {
  color: #10b981;
  text-decoration: underline;
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>