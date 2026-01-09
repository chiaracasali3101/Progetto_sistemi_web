import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Importazione delle pagine del frontend
import HomeView from '../views/Home.vue';
import Hotel from '../views/Hotel.vue';
import Login from '../views/Login.vue';
import SceltaAccesso from '../views/SceltaAccesso.vue';
import Prenota from '../views/Prenota.vue'; 
// IMPORTANTE: Unico import statico per evitare errori di caricamento
import ModificaCamera from '../views/ModificaCamera.vue'; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  },
  {
    path: '/scelta-accesso',
    name: 'SceltaAccesso',
    component: SceltaAccesso
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true 
  },
  {
    path: '/prenota/:idcamera', 
    name: 'Prenota',
    component: Prenota,
    props: true 
  },
  {
    path: '/modifica-camera/:idcamera',
    name: 'ModificaCamera',
    // Usiamo direttamente il componente importato sopra
    component: ModificaCamera, 
    props: true 
  },
  // Catch-all per gestire errori di navigazione
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
});

export default router;