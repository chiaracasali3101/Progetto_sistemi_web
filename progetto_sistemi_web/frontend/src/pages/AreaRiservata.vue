<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from 'axios';
    
    export default defineComponent({
      props: {
        tipo: { type: String, required: true }
      },
      data() {
        return {
          prenotazioni: [] as any[], // Inizialmente vuoto
          caricamento: true,
          errore: ""
        }
      },
      async mounted() {
        // Quando la pagina viene caricata, se l'utente è un cliente, chiediamo i dati
        if (this.tipo === 'cliente') {
          try {
            // Chiamata al backend per prendere le prenotazioni dell'utente loggato
            const response = await axios.get('/api/mie-prenotazioni');
            this.prenotazioni = response.data;
          } catch (err) {
            this.errore = "Impossibile caricare le tue prenotazioni.";
          } finally {
            this.caricamento = false;
          }
        }
      }
    });
    </script>
    
    <template>
      <div class="area-container">
        <h1>Le mie Prenotazioni</h1>
    
        <div v-if="caricamento">Caricamento in corso...</div>
        
        <div v-else-if="errore">{{ errore }}</div>
    
        <div v-else class="sezione-cliente">
          <div class="card-prenotazione" v-for="res in prenotazioni" :key="res.id_prenotazione">
            <div class="info">
              <h3>Prenotazione #{{ res.id_prenotazione }}</h3>
              <p><strong>Camera:</strong> {{ res.numero_camera }}</p>
              <p><strong>Dal:</strong> {{ res.data_inizio }} <strong>Al:</strong> {{ res.data_fine }}</p>
            </div>
          </div>
    
          <div v-if="prenotazioni.length === 0" class="no-data">
            <p>Non hai ancora effettuato nessuna prenotazione reale.</p>
            <button @click="$router.push('/hotel')">Vai a prenotare</button>
          </div>
        </div>
      </div>
    </template>