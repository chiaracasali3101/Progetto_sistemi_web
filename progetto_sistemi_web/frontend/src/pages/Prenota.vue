<template> 
    <div class="prenota-container">
      <h2>Prenota Camera ID: {{ idcamera }}</h2>
      <div class="form-prenotazione">
        <div class="campo">
          <label>Data Inizio:</label>
          <input type="date" v-model="form.datainizio" :min="oggi" @change="controllaDisponibilita" />
        </div>
  
        <div class="campo">
          <label>Data Fine:</label>
          <input type="date" v-model="form.datafine" :min="form.datainizio" @change="controllaDisponibilita" />
        </div>
  
        <div class="campo">
          <label>Numero Ospiti:</label>
          <input type="number" v-model="form.ospiti" min="1" max="4" />
        </div>
  
        <p v-if="messaggioErrore" style="color: red;">{{ messaggioErrore }}</p>
  
        <button @click="inviaPrenotazione" :disabled="!disponibile" class="btn-prenota">
          {{ disponibile ? 'Conferma Prenotazione' : 'Date non disponibili' }}
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    props: ['idcamera'],
    data() {
      return {
        form: {
          datainizio: '',
          datafine: '',
          ospiti: 1,
          username: localStorage.getItem('username') || '' // Recupera chi è loggato
        },
        disponibile: false,
        messaggioErrore: '',
        oggi: new Date().toISOString().split('T')[0]
      };
    },
    methods: {
      controllaDisponibilita() {
        if (!this.form.datainizio || !this.form.datafine) return;
        
        this.messaggioErrore = "";
        // Chiamata al backend per vedere se la camera è libera in queste date
        axios.post('/api/prenotazioni/check', {
          idcamera: this.idcamera,
          inizio: this.form.datainizio,
          fine: this.form.datafine
        }).then(res => {
          this.disponibile = res.data.libera;
          if (!this.disponibile) this.messaggioErrore = "La camera è già occupata in questo periodo.";
        });
      },
      inviaPrenotazione() {
        axios.post('/api/prenotazioni', { ...this.form, idcamera: this.idcamera })
          .then(() => {
            alert("Prenotazione registrata!");
            this.$router.push('/prenotazioni');
          })
          .catch(() => alert("Errore durante la prenotazione."));
      }
    }
  });
  </script>