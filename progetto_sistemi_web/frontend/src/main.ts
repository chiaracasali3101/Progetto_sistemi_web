import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"

import App from "./App.vue";
import Home from "./pages/Home.vue";
import Hotel from "./pages/Hotel.vue";
import Spiaggia from "./pages/Spiaggia.vue";
import Ristorante from "./pages/Ristorante.vue";
import Login from "./pages/Login.vue";
//import Prenotazioni from "./pages/Prenotazioni.vue";
import Contatti from "./pages/Contatti.vue"; 
import NotFound from "./pages/NotFound.vue"; 
import SceltaAccesso from "./pages/SceltaAccesso.vue"; 

// AGGIUNTO: Importa il nuovo componente dell'area riservata
import AreaRiservata from "./pages/AreaRiservata.vue"; 

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/hotel", component: Hotel },
    { path: "/spiaggia", component: Spiaggia },
    { path: "/ristorante", component: Ristorante },
    { path: "/scelta-accesso", component: SceltaAccesso },
    
    // Login con parametro :tipo
    { path: "/login/:tipo", name: "login", component: Login, props: true },
    { path: "/login", redirect: "/scelta-accesso" },

    // AGGIUNTO: Rotta per l'Area Riservata dopo il login
    // Usiamo :tipo per sapere se mostrare i tasti staff o quelli cliente
    { 
      path: "/area-riservata/:tipo", 
      name: "AreaRiservata", 
      component: AreaRiservata, 
      props: true 
    },

    //{ path: "/prenotazioni", component: Prenotazioni },
    { path: "/contatti", component: Contatti },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ]
});

createApp(App)
  .use(router)
  .mount("#app")