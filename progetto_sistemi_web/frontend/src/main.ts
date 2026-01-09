import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"

import App from "./App.vue";
import Home from "./pages/Home.vue";
import Hotel from "./pages/Hotel.vue";
import Spiaggia from "./pages/Spiaggia.vue";
import Ristorante from "./pages/Ristorante.vue";
import Login from "./pages/Login.vue";
import Contatti from "./pages/Contatti.vue"; 
import NotFound from "./pages/NotFound.vue"; 
import SceltaAccesso from "./pages/SceltaAccesso.vue"; 
import AreaRiservata from "./pages/AreaRiservata.vue"; 
import ModificaCamera from "./pages/ModificaCamera.vue"; 
import Prenotazioni from "./pages/Prenotazioni.vue";
import Prenota from "./pages/Prenota.vue";

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/hotel", component: Hotel },
    { path: "/spiaggia", component: Spiaggia },
    { path: "/ristorante", component: Ristorante },
    { path: "/scelta-accesso", component: SceltaAccesso },
    
    { path: "/login/:tipo", name: "login", component: Login, props: true },
    { path: "/login", redirect: "/scelta-accesso" },

    { 
      path: "/prenota/:idcamera", 
      name: "Prenota", 
      component: Prenota, 
      props: true 
    },

    { path: "/area-riservata/:tipo", name: "AreaRiservata", component: AreaRiservata, props: true },
    { path: "/modifica-camera/:idcamera", name: "ModificaCamera", component: ModificaCamera, props: true },
    { path: "/prenotazioni", name: "Prenotazioni", component: Prenotazioni },
    { path: "/contatti", component: Contatti },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ]
});

createApp(App).use(router).mount("#app");