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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <header class="site-header contenedor">
    <RouterLink :to="{ name: 'home' }">
      <img src="/img/logo.png" alt="Logo Meeti">
    </RouterLink>
    <nav class="nav">
      <img v-if="userAuth.image" :src="`${BACKEND_URL}/files/profile/${userAuth.image}`" alt="Imagen perfil" class="profile">
      <input v-else type="hidden">
      <RouterLink v-if="userAuth.email" :to="{ name: 'admin' }">Administrador</RouterLink>
      <RouterLink v-if="userAuth.email" :to="{ name: 'new-group' }">Crear Grupo</RouterLink>
      <RouterLink v-if="userAuth.email" :to="{ name: 'new-meeti' }">Crear Meeti</RouterLink>
      <RouterLink v-if="!userAuth.email" :to="{ name: 'login' }">Iniciar Sesión</RouterLink>
      <RouterLink v-if="!userAuth.email" :to="{ name: 'register' }">Registrarse</RouterLink>
      <button @click="logout" class="cerrar-sesion" v-if="userAuth.email">Cerrar Sesión</button>
    </nav>
  </header>
  <slot />
  <footer class="site-footer contenedor">
    <nav class="nav">
      <input type="hidden">
      <RouterLink v-if="userAuth.email" :to="{ name: 'admin' }">Administrador</RouterLink>
      <RouterLink v-if="userAuth.email" :to="{ name: 'new-group' }">Crear Grupo</RouterLink>
      <RouterLink v-if="userAuth.email" :to="{ name: 'new-meeti' }">Crear Meeti</RouterLink>
      <RouterLink v-if="!userAuth.email" :to="{ name: 'login' }">Iniciar Sesión</RouterLink>
      <RouterLink v-if="!userAuth.email" :to="{ name: 'register' }">Registrarse</RouterLink>
    </nav>
    <p class="copyright">Todos los derechos reservados Meeti {{ new Date().getFullYear() }} &copy;</p>
  </footer>
</template>
