<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  userAuth: {
    type: Object,
  },
  logout: {
    type: Function
  }
})
</script>

<template>
  <header class="site-header contenedor">
    <RouterLink :to="{ name: 'home' }">
      <img src="/img/logo.png" alt="Logo Meeti">
    </RouterLink>
    <nav class="nav">
      <RouterLink :to="{ name: 'new-group' }">Crear Grupo</RouterLink>
      <RouterLink v-if="!userAuth" :to="{ name: 'home' }">Iniciar Sesión</RouterLink>
      <RouterLink v-if="!userAuth" :to="{ name: 'register' }">Registrarse</RouterLink>
      <RouterLink v-if="userAuth" :to="{ name: 'admin' }">Administrador</RouterLink>
      <button @click="logout" class="cerrar-sesion" v-if="userAuth">Cerrar Sesión</button>
    </nav>
  </header>
  <slot />
  <footer class="site-footer contenedor">
    <nav class="nav">
      <RouterLink :to="{ name: 'new-group' }">Crear Grupo</RouterLink>
      <RouterLink v-if="!userAuth" :to="{ name: 'home' }">Iniciar Sesión</RouterLink>
      <RouterLink v-if="!userAuth" :to="{ name: 'register' }">Registrarse</RouterLink>
      <RouterLink v-if="userAuth" :to="{ name: 'admin' }">Administrador</RouterLink>
    </nav>
    <p class="copyright">Todos los derechos reservados Meeti {{ new Date().getFullYear() }} &copy;</p>
  </footer>
</template>