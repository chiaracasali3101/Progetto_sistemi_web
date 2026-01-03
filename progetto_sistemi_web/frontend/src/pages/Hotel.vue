<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { DettagliCamera } from "../types"; 
  
  export default defineComponent({
    data() {
      return {
        camere: [] as DettagliCamera[],
        isLoggedIn: false,
        ruolo: "", 
        utente: null as any 
      }
    },
    methods: {
      getCamere() {
            console.log("Hotel.vue: Avvio richiesta AJAX...");
            
            axios.get("/api/camere")
              .then(response => {
                // 1. Logga tutto l'oggetto response per vedere lo status code
                console.log("Status Code:", response.status);
                console.log("Dati grezzi ricevuti:", response.data);
                
                // 2. Controllo flessibile del formato dati
                let datiValidi = [];
                if (Array.isArray(response.data)) {
                  datiValidi = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                  datiValidi = response.data.data;
                }

                // 3. Assegnazione forzata
                if (datiValidi.length > 0) {
                  this.camere = datiValidi;
                  console.log("Successo: Array 'camere' popolato con", this.camere.length, "elementi.");
                } else {
                  console.warn("Attenzione: Il backend ha risposto correttamente ma l'elenco camere è vuoto.");
                }
              })
              .catch(error => {
                // Se vedi questo log, il problema è il Proxy o il Server spento
                console.error("Errore di connessione al backend:", error.message);
                if (error.response) {
                  console.error("Dettagli errore server:", error.response.status, error.response.data);
                }
              });
          },
      checkLogin() {
        const token = localStorage.getItem('userToken');
        const userData = localStorage.getItem('utente_loggato');
        const ruoloSalvato = localStorage.getItem('ruolo_utente'); 
        
        if (token && userData) {
          this.isLoggedIn = true;
          this.utente = JSON.parse(userData);
          this.ruolo = ruoloSalvato || ""; 
          console.log("Utente loggato:", this.utente.username, "Ruolo:", this.ruolo);
        }
      },
      logout() {
          console.log("Eseguo logout...");
          localStorage.removeItem('userToken');
          localStorage.removeItem('utente_loggato');
          localStorage.removeItem('ruolo_utente');
          this.isLoggedIn = false;
          this.utente = null;
          this.ruolo = "";
          this.$router.push('/').then(() => {
            window.location.reload(); 
          }).catch(err => {
            console.error("Errore nel reindirizzamento logout:", err);
            window.location.href = "/";
          });
        }
    },
    mounted() {
      this.checkLogin();
      this.getCamere();
    }
  })
  </script>
  
  <template>
    <section class="hotel-page">
      <div v-if="isLoggedIn && utente" class="welcome-banner">
        <span>Benvenuto, <strong>{{ utente.username }}</strong> ({{ ruolo }})</span>
        <button @click="logout" class="btn-logout">Esci</button>
      </div>
  
      <h1>Le Nostre Camere</h1>
      <p>Scopri la tradizione e l'eleganza delle nostre soluzioni di soggiorno.</p>
  
      <div v-if="camere.length > 0" class="camere-container">
        <article v-for="camera in camere" :key="camera.idcamera" class="camera-card">
          
          <img :src="'/img/' + camera.imgcamera" :alt="camera.nomecamera" class="camera-img" />
          
          <div class="camera-info">
            <h3>{{ camera.nomecamera }}</h3>
            <p>{{ camera.descrizionecamera }}</p>
            <p class="price">Prezzo: <strong>{{ camera.prezzocamera }} €</strong> / notte</p>
            
            <div class="actions">
              <router-link 
                v-if="isLoggedIn && ruolo === 'cliente'" 
                :to="'/prenota/' + camera.idcamera" 
                class="btn-prenota"
              >
                Scegli questa camera
              </router-link>
  
              <router-link 
                  v-if="isLoggedIn && ruolo === 'dipendente'" 
                  :to="'/modifica-camera/' + camera.idcamera" 
                  class="btn-modifica"
                >
                  Modifica Camera
              </router-link>
  
              <router-link 
                v-else 
                to="/scelta-accessso" 
                class="btn-login-required"
              >
                Accedi per interagire
              </router-link>
            </div>
          </div>
        </article>
      </div>
  
      <div v-else class="loading-status">
        <p>Caricamento delle camere in corso o nessuna camera trovata...</p>
        <small>Controlla la console (F12) per errori di connessione.</small>
      </div>
    </section>
  </template>
  
