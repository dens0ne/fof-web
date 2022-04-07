import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/character/:id',
    component: () => import('../views/ViewCharacterPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
