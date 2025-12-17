import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"

import App from "./App.vue";
import Home from "./pages/Home.vue";
import Hotel from "./pages/Hotel.vue";
import Spiaggia from "./pages/Spiaggia.vue";
import Ristorante from "./pages/Ristorante.vue";
import Login from "./pages/Login.vue";
import Prenotazioni from "./pages/Prenotazioni.vue";
import Contatti from "./pages/Contatti.vue"; 
import NotFound from "./pages/NotFound.vue"; 
// AGGIUNTO: Importa il componente per la scelta (controlla il nome esatto del file)
import SceltaAccesso from "./pages/SceltaAccesso.vue"; 

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/hotel", component: Hotel },
    { path: "/spiaggia", component: Spiaggia },
    { path: "/ristorante", component: Ristorante },

    // MODIFICATO: Rotta per la scelta tra Cliente e Staff
    { path: "/scelta-accesso", component: SceltaAccesso },
    
    // MODIFICATO: Login ora accetta il parametro :tipo (cliente o dipendente)
    { path: "/login/:tipo", name: "login", component: Login, props: true },
    
    // Manteniamo anche il path /login base per sicurezza o reindirizzamento
    { path: "/login", redirect: "/scelta-accesso" },

    { path: "/prenotazioni", component: Prenotazioni },
    { path: "/contatti", component: Contatti },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ]
});

createApp(App)
  .use(router)
  .mount("#app")