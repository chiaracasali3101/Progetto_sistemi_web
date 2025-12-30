<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    props: {
      tipo: {
        type: String, // Riceve 'cliente' o 'dipendente' dalla rotta SceltaAccesso
        required: true
      }
    },
    data() {
      return {
        username: "",
        password: "",
        errore: "" // Usiamo questa variabile invece dell'alert per la UI
      };
    },
    methods: {
      async gestisciLogin() {
        // Reset del messaggio di errore ad ogni tentativo
        this.errore = "";
  
        // Controllo campi vuoti prima di inviare
        if (!this.username || !this.password) {
          this.errore = "Per favore, inserisci sia username che password.";
          return;
        }
  
        try {
          const response = await axios.post("/api/login", {
            username: this.username,
            password: this.password,
            ruolo: this.tipo // Invia 'cliente' o 'dipendente' al backend
          });
  
          if (response.data.success) {
            // 1. Salvataggio dati nel Browser per la persistenza
            localStorage.setItem('userToken', 'valido');
            localStorage.setItem('utente_loggato', JSON.stringify(response.data.user));
            localStorage.setItem('ruolo_utente', response.data.user.ruolo);
            
            // 2. Reindirizzamento alla Home (Percorso '/')
            // Usiamo '/' per evitare il 404 se la rotta Home è la principale
            this.$router.push('/'); 
          } else {
            // Se il backend risponde success: false
            this.errore = "Credenziali non valide per l'area " + this.tipo;
          }
  
        } catch (error) {
          console.error("Errore login:", error);
          this.errore = "Errore di connessione al server. Controlla il terminale backend.";
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
            <input v-model="username" type="text" placeholder="Inserisci username" @keyup.enter="gestisciLogin">
          </div>
  
          <div class="field">
            <label>Password:</label>
            <input v-model="password" type="password" placeholder="Inserisci password" @keyup.enter="gestisciLogin">
          </div>
  
          <div class="actions">
            <button @click="gestisciLogin" class="btn-invia">Invia</button>
          </div>
  
          <p v-if="errore" class="error-message">{{ errore }}</p>
        </div>
      </div>
    </div>
  </template>
  