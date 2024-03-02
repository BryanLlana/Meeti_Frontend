<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="authStore.login" class="default-form">
        <div class="campo">
          <label for="email">E-mail</label>
          <input v-model="authStore.loginUser.email" type="email" id="email" >
        </div>
        <p class="error-input" v-if="authStore.inputError.email">{{ authStore.inputError.email }}</p>
        <div class="campo">
          <label for="password">Password</label>
          <input v-model="authStore.loginUser.password" type="password" id="password" >
        </div>
        <p class="error-input" v-if="authStore.inputError.password">{{ authStore.inputError.password }}</p>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Crear Cuenta">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>