import { createApp } from "vue"
import { createRouter, createWebHistory, Router } from "vue-router"
import "./style.css"
//import { createRouter, createWebHistory } from 'vue-router';
// Importazioni esistenti dai tuoi file .vue
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Hotel from "./pages/Hotel.vue";
import Spiaggia from "./pages/Spiaggia.vue";
import Ristorante from "./pages/Ristorante.vue";
import Login from "./pages/Login.vue";
import Prenotazioni from "./pages/Prenotazioni.vue";
import Contatti from "./pages/Contatti.vue"; 
import NotFound from "./pages/NotFound.vue"; 


const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    // 1. HOME
    { path: "/", component: Home },
    
    // 2. HOTEL
    { path: "/hotel", component: Hotel },
    
    // 3. SPIAGGIA
    { path: "/spiaggia", component: Spiaggia },
    
    // 4. RISTORANTE
    { path: "/ristorante", component: Ristorante },

    // 5. LOGIN
    { path: "/login", component: Login },
    
    // 6. LE MIE PRENOTAZIONI
    { path: "/prenotazioni", component: Prenotazioni },

    // 7. CONTATTI
    { path: "/contatti", component: Contatti },

    // 8. PAGINA NON TROVATA
    { path: "/:pathMatch(.*)*", component: NotFound },
  ]
});

export default router;

createApp(App)
  .use(router)
  .mount("#app")
