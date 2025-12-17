<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    // Riceviamo 'tipo' dal router (sarà 'cliente' o 'dipendente')
    props: {
      tipo: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        username: "",
        password: "",
        errore: "" // Per mostrare eventuali messaggi di errore
      }
    },
    methods: {
      async gestisciLogin() {
        try {
          // Prepariamo i dati da inviare
          const dati = {
            username: this.username,
            password: this.password,
            ruolo: this.tipo // Passiamo il tipo al backend
          };
  
          // Chiamata al backend (assicurati che l'URL sia corretto per il tuo server)
          const response = await axios.post("/api/login", dati);
  
          if (response.data.success) {
            // Se il login va a buon fine, reindirizziamo all'area riservata
            this.$router.push("/area-riservata");
          } else {
            this.errore = "Credenziali non valide.";
          }
        } catch (err) {
          console.error("Errore durante il login:", err);
          this.errore = "Errore di connessione al server.";
        }
      }
    }
  });
  </script>
  
  <template>
    <div class="login-container">
      <h1>Login {{ tipo === 'dipendente' ? 'Area Staff' : 'Area Clienti' }}</h1>
  
      <div class="login-form">
        <div class="form-group">
          <div class="field">
            <label>Username:</label>
            <input 
              v-model="username" 
              type="text" 
              placeholder="Inserisci username"
            >
          </div>
  
          <div class="field">
            <label>Password:</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Inserisci password"
            >
          </div>
  
          <div class="actions">
            <button @click="gestisciLogin" class="btn-invia">Invia</button>
          </div>
  
          <p v-if="errore" class="error-message">{{ errore }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Il CSS è rimosso come richiesto. 
     Usa il tuo style.css per togliere margini e decorazioni 
     alle liste se decidi di usarle. 
  */
  </style>