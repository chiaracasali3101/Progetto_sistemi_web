import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

//pagine frontend
import HomeView from '../pages/Home.vue';
import Hotel from '../pages/Hotel.vue';
import Login from '../pages/Login.vue';
import SceltaAccesso from '../pages/SceltaAccesso.vue';
import Prenota from '../pages/Prenota.vue'; 
import ModificaCamera from '../pages/ModificaCamera.vue'; 

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
    component: ModificaCamera, 
    props: true 
  },

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