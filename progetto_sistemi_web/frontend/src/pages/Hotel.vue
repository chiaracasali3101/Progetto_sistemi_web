<script lang="ts">
    import { defineComponent } from "vue";
    import axios from "axios";
    // Si assume che DettagliCamera sia il tipo corretto per i dati ricevuti
    import { DettagliCamera } from "../types"; 
    
    export default defineComponent({
        data() {
            return {
                // Definiamo 'camera' come lo stato che conterrà i dati singoli.
                // Questo risolve l'errore se la riga 15 faceva riferimento a 'this.camera'.
                camera: null as DettagliCamera | null
            }
        },
        methods: {
            getCamera() {
                // Usa l'ID dalla rotta dinamica
                const id = this.$route.params.idCamera; 
                
                // Chiamata API per recuperare i dettagli di UNA singola camera
                axios.get("/api/camera/" + id)
                    // Assegnazione della risposta alla variabile di stato 'camera'
                    .then(response => {
                        // Usiamo [0] perché a volte l'API restituisce un array di un elemento
                        this.camera = response.data[0]; 
                    })
                    // Gestione errori, fondamentale per il debug
                    .catch(error => {
                         console.error("Errore nel caricamento della camera:", error);
                    });
            }
        },
        mounted() {
            // Avvia la funzione di caricamento dati quando il componente è pronto
            this.getCamera();
        }
    })
</script>
    
<template>
    <article v-if="camera" class="dettaglio-camera">
      
      <img :src="'/img/' + camera.imgcamera" :alt="camera.nomecamera" />
      
      <h3>{{ camera.nomecamera }}</h3>
      
      <p>Descrizione completa: {{ camera.descrizionecamera }}</p>
      
      <p>Prezzo: {{ camera.prezzocamera }} €/notte</p>
      
      </article>

    <div v-else>
        Caricamento dei dettagli della camera...
    </div>
</template>