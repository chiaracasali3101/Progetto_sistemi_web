import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// 1. Importa i tuoi componenti (assicurati che i nomi dei file siano giusti)
import HomeView from '../views/Home.vue';
import Hotel from '../views/Hotel.vue';
import Login from '../views/Login.vue';
import SceltaAccesso from '../views/SceltaAccesso.vue';
import Prenota from '../views/Prenota.vue'; // La nuova pagina che hai creato nel frontend

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
    component: Login
  },
  // 2. QUESTA È LA ROTTA CHE RISOLVE IL 404
  {
    path: '/prenota/:idcamera', // Accetta l'ID della camera dal database
    name: 'Prenota',
    component: Prenota,
    props: true // Passa l'ID al componente Prenota.vue come variabile
  },
  // Rotta di cattura per errori 404 nel frontend
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;