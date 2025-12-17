<template>
  <div style="text-align: center; padding: 50px;">
    <h1>Benvenuto all'Hotel</h1>
    <div style="display: flex; justify-content: center; gap: 20px;">
      
      <router-link to="/login/cliente" style="padding: 20px; border: 1px solid blue;">
        Area Clienti
      </router-link>

      <router-link to="/login/dipendente" style="padding: 20px; border: 1px solid red;">
        Area Staff
      </router-link>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SceltaAccesso'
});
</script>