<template>
    <div class="prenotazioni-container">
      <h2>Le tue Prenotazioni</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Camera</th>
            <th v-if="tipoUtente === 'dipendente'">Utente</th>
            <th>Inizio</th>
            <th>Fine</th>
            <th>Ospiti</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in lista" :key="p.idprenotazione">
            <td>{{ p.idprenotazione }}</td>
            <td>{{ p.idcamera }}</td>
            <td v-if="tipoUtente === 'dipendente'">{{ p.username }}</td>
            <td>{{ p.datainizio }}</td>
            <td>{{ p.datafine }}</td>
            <td>{{ p.ospiti }}</td>
            <td>
              <button @click="cancella(p.idprenotazione)" style="color: red;">Cancella</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        lista: [] as any[],
        tipoUtente: localStorage.getItem('tipo') || 'cliente',
        username: localStorage.getItem('username') || ''
      };
    },
    methods: {
      caricaPrenotazioni() {
        // Passiamo tipo e username come parametri query
        axios.get(`/api/prenotazioni?tipo=${this.tipoUtente}&username=${this.username}`)
          .then(res => this.lista = res.data);
      },
      cancella(id: number) {
        if (confirm("Vuoi davvero cancellare?")) {
          axios.delete(`/api/prenotazioni/${id}`)
            .then(() => this.caricaPrenotazioni());
        }
      }
    },
    mounted() {
      this.caricaPrenotazioni();
    }
  });
  </script>