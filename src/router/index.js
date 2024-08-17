import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/views/Catalog.vue';
import Auth from '@/views/Auth.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog,
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth,
    }
  ]
})

export default router
