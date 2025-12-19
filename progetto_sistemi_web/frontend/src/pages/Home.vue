<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios";

</script>

<template>
  <section class="hotel-presentation">
    <h1>Benvenuti al Grand Hotel Mattei.</h1>
    <h2>Da generazioni, un'accoglienza di tradizione ed eleganza</h2>
    
    <div class="intro-text">
      <h4>Ospitalità e Relax sulla Riviera Romagnola</h4>
      <p>
        Situato in una posizione privilegiata a pochi passi dal mare, il Grand Hotel Mattei 
        è la scelta ideale per chi cerca il perfetto equilibrio tra comfort moderno e 
        tradizione romagnola. Con camere eleganti, servizi di alta qualità e un'atmosfera accogliente, 
        il nostro hotel ti offre tutto ciò di cui hai bisogno per una vacanza indimenticabile.
      </p>
    </div>

    <div class="features-grid">
      <article>
        <h4>La Nostra Spiaggia Privata</h4>
        <p>
          Dimentica lo stress e goditi il sole presso la nostra spiaggia convenzionata. 
          Un'ampia distesa di sabbia dorata attrezzata con ombrelloni e lettini, 
          perfetta per il relax degli adulti e il divertimento dei più piccoli in totale sicurezza. 
        </p>
      </article>

      <article>
        <h4>Sapori Autentici al Ristorante</h4>
        <p>
          Il nostro ristorante interno ti aspetta per farti scoprire i piatti tipici della cucina 
          locale e internazionale. Ingredienti freschi e di stagione si uniscono per offrirti 
          un'esperienza enogastronomica d'eccellenza ogni giorno. 
        </p>
      </article>
    </div>
  </section>
</template>



