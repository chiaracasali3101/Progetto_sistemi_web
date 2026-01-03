<script lang="ts">
    import { defineComponent } from "vue";
    import axios from "axios";
    
    export default defineComponent({
      // Il router passa l'id qui grazie a 'props: true'
      props: ['idcamera'], 
      data() {
        return {
          camera: {
            idcamera: null,
            nomecamera: "",
            descrizionecamera: "",
            prezzocamera: 0
          },
          caricamento: true,
          messaggio: ""
        };
      },
      methods: {
        fetchCamera() {
          // Recuperiamo tutte le camere e filtriamo per l'id ricevuto
          axios.get("/api/camere")
            .then(res => {
              const lista = res.data;
              // Cerchiamo la camera specifica (attenzione ai nomi dei campi del DB)
              const trovata = lista.find((c: any) => c.idcamera == this.idcamera);
              
              if (trovata) {
                this.camera = trovata;
                console.log("Dati camera caricati:", this.camera);
              }
              this.caricamento = false;
            })
            .catch(err => {
              console.error("Errore nel recupero dati camera:", err);
              this.caricamento = false;
            });
        },
        aggiornaCamera() {
          // Invia i nuovi dati al backend tramite PUT
          axios.put(`/api/camere/${this.idcamera}`, this.camera)
            .then(res => {
              this.messaggio = "Camera aggiornata con successo!";
              // Torna alla pagina Hotel dopo 1.5 secondi
              setTimeout(() => this.$router.push('/hotel'), 1500);
            })
            .catch(err => {
              this.messaggio = "Errore durante il salvataggio.";
              console.error(err);
            });
        }
      },
      mounted() {
        this.fetchCamera();
      }
    });
    </script>
    
    <template>
      <div class="edit-page">
        <h2>Modifica Stanza #{{ idcamera }}</h2>
        <hr />
    
        <div v-if="caricamento">Caricamento dati in corso...</div>
    
        <div v-else-if="camera.idcamera" class="form-container">
          <div class="form-group">
            <label>Nome della Camera:</label>
            <input v-model="camera.nomecamera" type="text" placeholder="Nome camera" />
          </div>
    
          <div class="form-group">
            <label>Descrizione:</label>
            <textarea v-model="camera.descrizionecamera" rows="4"></textarea>
          </div>
    
          <div class="form-group">
            <label>Prezzo per notte (€):</label>
            <input v-model="camera.prezzocamera" type="number" />
          </div>
    
          <div class="buttons">
            <button @click="aggiornaCamera" class="btn-save">Salva Modifiche</button>
            <router-link to="/hotel" class="btn-cancel">Annulla</router-link>
          </div>
    
          <p v-if="messaggio" class="status-message">{{ messaggio }}</p>
        </div>
    
        <div v-else class="error-msg">
          Impossibile trovare la camera specificata.
        </div>
      </div>
    </template>
    
    <style scoped>
    .edit-page { max-width: 600px; margin: 40px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .form-container { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
    .form-group { display: flex; flex-direction: column; text-align: left; }
    .form-group label { font-weight: bold; margin-bottom: 5px; }
    input, textarea { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
    .buttons { display: flex; gap: 10px; margin-top: 10px; }
    .btn-save { background: #27ae60; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; flex: 1; }
    .btn-cancel { background: #95a5a6; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; text-align: center; flex: 1; }
    .status-message { color: #2980b9; font-weight: bold; margin-top: 15px; }
    .error-msg { color: #e74c3c; margin-top: 20px; }
    </style>