<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { DettagliCamera } from "../types"; 
  
  export default defineComponent({
      data() {
          return {
              camere: [] as DettagliCamera[],
              // Recuperiamo l'intero oggetto utente per mostrare il nome
              utente: null as any, 
              isLoggedIn: false
          }
      },
      methods: {
          getCamere() {
              axios.get("/api/camere")
                  .then(response => {
                      this.camere = response.data; 
                  })
                  .catch(error => {
                       console.error("Errore nel caricamento della lista camere:", error);
                  });
          },
          checkLogin() {
              // Leggiamo i dati salvati dal login
              const token = localStorage.getItem('userToken');
              const userData = localStorage.getItem('utente_loggato');
              
              if (token && userData) {
                  this.isLoggedIn = true;
                  this.utente = JSON.parse(userData); // Trasforma la stringa in oggetto
              }
          },
          logout() {
              // Rimuove tutto e aggiorna la pagina
              localStorage.removeItem('userToken');
              localStorage.removeItem('utente_loggato');
              localStorage.removeItem('userRole');
              this.isLoggedIn = false;
              this.utente = null;
              this.$router.push('/');
          }
      },
      mounted() {
          this.getCamere();
          this.checkLogin();
      }
  })
  </script>
  
  <template>
    <section class="hotel-page">
      <div v-if="isLoggedIn && utente" class="welcome-banner">
          <span>Benvenuto, <strong>{{ utente.username }}</strong> ({{ utente.ruolo }})</span>
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
            
            <router-link 
              v-if="isLoggedIn" 
              :to="'/prenota/' + camera.idcamera" 
              class="btn-dettagli"
            >
              Scegli questa camera
            </router-link>
  
            <router-link 
              v-else 
              to="/scelta-accesso" 
              class="btn-login-required"
            >
              Accedi per prenotare
            </router-link>
          </div>
  
        </article>
  
      </div>
  
      <div v-else class="loading-status">
          Caricamento delle camere in corso...
      </div>
    </section>
  </template>
  
  