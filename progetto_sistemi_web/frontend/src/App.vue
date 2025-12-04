<template>
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
    </ul>
  </nav>
</template>

<script setup lang="ts">
// Composizione API e TypeScript
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Blocca lo scroll del body quando il menù a tutto schermo è aperto
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : 'auto';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = 'auto';
};
</script>

<style lang="scss" scoped>
// Usa SCSS per una facile organizzazione degli stili (come suggerito nelle tue slide)

// ------------------------------------
// ⚠️ IMPORTANTE: Media Queries (Visibilità)
// Il menù è visibile solo su schermi piccoli (mobile)
// ------------------------------------
nav, .hamburger-btn {
  // Nasconde il menù hamburger su schermi grandi
  display: none; 
}

@media (max-width: 768px) {
  /* Mostra il menù hamburger solo su schermi piccoli */
  .hamburger-btn {
    display: block; 
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 1001; // Deve essere in primo piano
  }

  .line {
    display: block;
    width: 100%;
    height: 4px;
    margin: 6px 0;
    background-color: #333;
    transition: transform 0.3s, opacity 0.3s;
    
    // Transizione per la 'X'
    &.open:nth-child(1) { transform: translateY(10px) rotate(45deg); }
    &.open:nth-child(2) { opacity: 0; }
    &.open:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }
  }
  
  /* Stile di base per il menù a scomparsa */
  nav {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background-color: white;
    padding-top: 80px;
    box-shadow: -2px 0 5px rgba(0,0,0,0.2);
    
    // Lo nasconde fuori dallo schermo
    transform: translateX(300px); 
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
  
  /* Stato APERTO: sposta il menù nello schermo */
  .menu-open {
    transform: translateX(0);
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  nav a {
    display: block;
    padding: 15px 20px;
    text-decoration: none;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
</style>