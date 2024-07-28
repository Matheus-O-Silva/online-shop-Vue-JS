import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/views/Catalog.vue';
import Auth from '@/views/Auth.vue';
import Register from '@/views/Register.vue';


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
    },
    {
      path: '/cadastrar',
      name: 'Register',
      component: Register,
    }
  ]
})

export default router
