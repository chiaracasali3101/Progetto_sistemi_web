<template>
  <div id="app-wrapper">
    
    <header class="main-header">
      <button class="hamburger-btn" @click="toggleMenu" :aria-expanded="isMenuOpen">
        <span class="line" :class="{ open: isMenuOpen }"></span>
        <span class="line" :class="{ open: isMenuOpen }"></span>
        <span class="line" :class="{ open: isMenuOpen }"></span>
      </button>
      
      <nav :class="{ 'menu-open': isMenuOpen }">
        <ul>
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/hotel" @click="closeMenu">Hotel</router-link></li>
          <li><router-link to="/spiaggia" @click="closeMenu">Spiaggia</router-link></li>
          <li><router-link to="/ristorante" @click="closeMenu">Ristorante</router-link></li>
          <li><router-link to="/login" @click="closeMenu">Login</router-link></li>
          <li><router-link to="/prenotazioni" @click="closeMenu">Le mie Prenotazioni</router-link></li>
          <li><router-link to="/contatti" @click="closeMenu">Contattaci</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="content-area">
      <router-view />
    </main>

    <footer>
      <p>Viale Bologna 5, Ravenna</p>
      <p>&copy; 2024 Hotel Vue App. Tutti i diritti riservati.</p>
    </footer>

  </div>
</template>

<script setup lang="ts">
// Composition API e TypeScript
import { ref } from 'vue';

// Stato per controllare l'apertura/chiusura del menù
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Gestisce il blocco dello scroll del body su mobile
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = 'auto';
};
</script>

<style>
/* Questo blocco <style> è ora vuoto, poiché tutti gli stili (incluse le variabili CSS e le media query) 
   sono stati spostati nel file globale importato in main.ts (style.css).
*/
</style>