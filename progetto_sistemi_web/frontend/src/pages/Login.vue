<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  
  export default defineComponent({
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
        errore: ""
      }
    },
    methods: {
      // Dentro Login.vue
async gestisciLogin() {
  try {
    const response = await axios.post("/api/login", {
      username: this.username,
      password: this.password,
      ruolo: this.tipo // 'cliente' o 'dipendente'
    });

    if (response.data.success) {
      // SALVIAMO I DATI NEL BROWSER
      localStorage.setItem('utente_loggato', JSON.stringify(response.data.user));
      localStorage.setItem('ruolo_utente', response.data.user.ruolo);
      
      // Ora cambiamo pagina
      this.$router.push('/prenota'); 
    } else {
      alert("Credenziali errate!");
    }
  } catch (error) {
    console.error("Errore login", error);
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
          <input v-model="username" type="text" placeholder="Inserisci username">
        </div>

        <div class="field">
          <label>Password:</label>
          <input v-model="password" type="password" placeholder="Inserisci password">
        </div>

        <div class="actions">
          <button @click="gestisciLogin" class="btn-invia">Invia</button>
        </div>

        <p v-if="errore" class="error-message">{{ errore }}</p>
      </div>
    </div>
  </div>
</template>