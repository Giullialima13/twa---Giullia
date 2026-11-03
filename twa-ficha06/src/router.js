import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from './pages/CatalogPage.vue'
import ItemPage from './pages/ItemPage.vue'
import NewItemPage from './pages/NewItemPage.vue'
import PokemonPage from './pages/PokemonPage.vue'
import GameDetail from './entities/game/GameDetail.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', name: 'catalog', component: CatalogPage },
  { path: '/items/new', name: 'new-item', component: NewItemPage },
  { path: '/items/:id', name: 'item', component: ItemPage },
  { path: '/pokemon', name: 'pokemon', component: PokemonPage },
  { path: '/games/:id', name: 'game-detail', component: GameDetail },
  { path: '/:pathMatch(.*)*', component: NotFound } // Rota 404 (deve ser sempre a última)
]

export default createRouter({
  history: createWebHistory(),
  routes
})