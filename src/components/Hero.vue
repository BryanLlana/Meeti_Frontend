<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="hero">
    <h1>Encuentra o crea un grupo para compartir lo que más te gusta</h1>
    <RouterLink :to="{ name: 'register' }" class="btn btn-amarillo">Obtener Cuenta</RouterLink>
  </div>
</template>