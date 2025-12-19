<template>
    <div class="prenota-page">
      <h2>Completa la tua prenotazione</h2>
      <p>Stai prenotando la camera ID: <strong>{{ idcamera }}</strong></p>
  
      <form @submit.prevent="inviaPrenotazione" class="form-prenota">
        <div class="input-group">
          <label>Data di Arrivo:</label>
          <input type="date" v-model="dataInizio" required>
        </div>
  
        <div class="input-group">
          <label>Data di Partenza:</label>
          <input type="date" v-model="dataFine" required>
        </div>
  
        <button type="submit" class="btn-conferma">Conferma Soggiorno</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    // 'idcamera' viene passato dall'URL grazie a :to="'/prenota/' + camera.idcamera"
    props: ['idcamera'],
    data() {
      return {
        dataInizio: "",
        dataFine: "",
        // Recuperiamo l'utente loggato dal localStorage
        utente: JSON.parse(localStorage.getItem('utente_loggato') || '{}')
      };
    },
    methods: {
      async inviaPrenotazione() {
        try {
          const payload = {
            id_utente: this.utente.id_utente, // Preso dal login
            id_camera: this.idcamera,        // Preso dall'URL
            data_inizio: this.dataInizio,
            data_fine: this.dataFine
          };
  
          // Invio al backend (prenotazioni-router.ts)
          const response = await axios.post("/api/prenotazioni", payload);
  
          if (response.data.success) {
            alert("Prenotazione registrata con successo!");
            this.$router.push('/'); // Torna alla Home
          }
        } catch (error) {
          console.error("Errore durante la prenotazione:", error);
          alert("Errore nel salvataggio. Riprova.");
        }
      }
    }
  });
  </script>
  
  <style scoped>
  .prenota-page { padding: 40px; text-align: center; }
  .form-prenota { max-width: 400px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
  .input-group { display: flex; flex-direction: column; text-align: left; }
  .btn-conferma { background-color: #27ae60; color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px; }
  </style>