<script lang="ts">
    import { defineComponent } from "vue";
    import axios from "axios";
    // Importiamo il tipo per la lista (assicurati che DettagliCamera sia esportato in types.ts)
    import { DettagliCamera } from "../types"; 
    
    export default defineComponent({
        data() {
            return {
                // Stato per contenere l'array di tutte le camere recuperate dal DB
                camere: [] as DettagliCamera[]
            }
        },
        methods: {
            // Funzione per recuperare la lista completa delle camere
            getCamere() {
                // Chiamata API al backend (assicurati che la rotta /api/camere esista)
                axios.get("/api/camere")
                    .then(response => {
                        // Salviamo l'array di camere nello stato
                        this.camere = response.data; 
                    })
                    .catch(error => {
                         console.error("Errore nel caricamento della lista camere:", error);
                    });
            }
        },
        mounted() {
            // Avviamo il caricamento quando entriamo nella pagina
            this.getCamere();
        }
    })
    </script>
        
    <template>
      <section class="hotel-page">
        <h1>Le Nostre Camere</h1>
        <p>Scopri la tradizione e l'eleganza delle nostre soluzioni di soggiorno.</p>
    
        <div v-if="camere.length > 0" class="camere-container">
          
          <article v-for="camera in camere" :key="camera.idcamera" class="camera-card">
            
            <img :src="'/img/' + camera.imgcamera" :alt="camera.nomecamera" class="camera-img" />
            
            <div class="camera-info">
              <h3>{{ camera.nomecamera }}</h3>
              <p>{{ camera.descrizionecamera }}</p>
              <p class="price">Prezzo: <strong>{{ camera.prezzocamera }} €</strong> / notte</p>
              
              <router-link :to="'/prenota/' + camera.idcamera" class="btn-dettagli">
                Scegli questa camera
              </router-link>
            </div>
    
          </article>
    
        </div>
    
        <div v-else class="loading-status">
            Caricamento delle camere in corso...
        </div>
      </section>
    </template>
    
    <style scoped>
    /* Il CSS è rimosso come richiesto. 
       Ricordati di definire .camere-container (flex o grid) e .camera-card 
       nel tuo file style.css per rendere la pagina ordinata. 
    */
    </style>