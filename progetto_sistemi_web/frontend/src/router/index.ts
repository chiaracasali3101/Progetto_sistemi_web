import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
import Hotel from '../pages/Hotel.vue';
import SceltaAccesso from '../pages/SceltaAccesso.vue';
import Login from '../pages/Login.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  },
  // Questa è la rotta che ti serve per vedere i pulsanti
  {
    path: '/scelta-accesso',
    name: 'SceltaAccesso',
    component: SceltaAccesso
  },
  // Questa rotta serve il form di login e riceve il parametro 'tipo'
  {
    path: '/login/:tipo',
    name: 'login',
    component: Login,
    props: true
  },
  // Se l'utente scrive un URL sbagliato, lo rimandiamo alla Home invece di mostrare il 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;