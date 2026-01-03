import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// Importazione delle pagine del frontend
import HomeView from '../views/Home.vue';
import Hotel from '../views/Hotel.vue';
import Login from '../views/Login.vue';
import SceltaAccesso from '../views/SceltaAccesso.vue';
import Prenota from '../views/Prenota.vue'; 
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
    props: true // Permette di ricevere il 'tipo' (cliente/dipendente)
  },

  {
    path: '/prenota/:idcamera', 
    name: 'Prenota',
    component: Prenota,
    props: true // Passa l'ID camera dal DB al componente
  },
  
  {
    path: '/modifica-camera/:idcamera', // Deve avere i due punti per il parametro dinamico
    name: 'ModificaCamera',
    component: () => import('../views/ModificaCamera.vue'), // Assicurati che il percorso sia giusto
    props: true // Obbligatorio per passare l'ID come prop al componente
  },

  // Risolve il problema del 404 reindirizzando alla Home
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