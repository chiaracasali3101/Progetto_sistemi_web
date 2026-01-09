<template>
  <div class="prenotazioni-container">
    <h1>Le mie Prenotazioni</h1>

    <div v-if="listaPrenotazioni.length === 0" class="no-data">
      <p>Non hai ancora effettuato nessuna prenotazione.</p>
      <router-link to="/hotel" class="btn-primary">Prenota ora la tua camera</router-link>
    </div>

    <div v-else class="tabella-prenotazioni">
      <table>
        <thead>
          <tr>
            <th>Camera</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Ospiti</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in listaPrenotazioni" :key="p.idprenotazione">
            <td>Camera #{{ p.idcamera }}</td>
            
            <td>{{ new Date(p.datainizio).toLocaleDateString('it-IT') }}</td>
            <td>{{ new Date(p.datafine).toLocaleDateString('it-IT') }}</td>
            
            <td>{{ p.ospiti }}</td>
            <td>
              <button @click="cancellaPrenotazione(p.idprenotazione)" class="btn-delete">
                Annulla
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variabile reattiva per i dati
const listaPrenotazioni = ref<any[]>([]);

// Recupero dati dall'utente loggato
const username = localStorage.getItem('username');
const tipo = localStorage.getItem('tipo') || 'cliente'; // Default a cliente se manca

/**
 * Funzione per caricare le prenotazioni dal Backend
 */
const caricaPrenotazioni = async () => {
  if (!username) {
    console.error("Errore: Nessun utente loggato nel localStorage");
    return;
  }

  try {
    // Chiamata al backend passando i parametri come query string
    const res = await axios.get('/api/prenotazioni', {
      params: { 
        username: username,
        tipo: tipo 
      }
    });

    listaPrenotazioni.value = res.data;
    console.log("Dati caricati correttamente:", res.data);
  } catch (err) {
    console.error("Errore nel caricamento delle prenotazioni:", err);
  }
};

/**
 * Funzione per cancellare una prenotazione
 */
const cancellaPrenotazione = async (id: number) => {
  if (!confirm("Sei sicuro di voler annullare questa prenotazione?")) return;

  try {
    await axios.delete(`/api/prenotazioni/${id}`);
    // Ricarica la lista dopo la cancellazione
    await caricaPrenotazioni();
  } catch (err) {
    console.error("Errore durante la cancellazione:", err);
  }
};

// Esegue il caricamento appena il componente viene montato
onMounted(() => {
  caricaPrenotazioni();
});
</script>

