<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="site-header contenedor">
    <RouterLink :to="{ name: 'home' }">
      <img src="/img/logo.png" alt="Logo Meeti">
    </RouterLink>
    <nav class="nav">
      <RouterLink :to="{ name: 'home' }">Crear Grupo</RouterLink>
      <RouterLink :to="{ name: 'home' }">Iniciar Sesión</RouterLink>
      <RouterLink :to="{ name: 'register' }">Registrarse</RouterLink>
    </nav>
  </header>
  <slot />
  <footer class="site-footer contenedor">
    <nav class="nav">
      <RouterLink :to="{ name: 'home' }">Crear Grupo</RouterLink>
      <RouterLink :to="{ name: 'home' }">Iniciar Sesión</RouterLink>
      <RouterLink :to="{ name: 'register' }">Registrarse</RouterLink>
    </nav>
    <p class="copyright">Todos los derechos reservados Meeti {{ new Date().getFullYear() }} &copy;</p>
  </footer>
</template>