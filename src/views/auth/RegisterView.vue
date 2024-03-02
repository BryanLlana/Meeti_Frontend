<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios">
      <h1>Crear Cuenta</h1>
      <form @submit.prevent="authStore.register" class="default-form">
        <p>Registrar un email válido</p>
        <div class="campo">
          <label for="email">E-mail</label>
          <input v-model="authStore.user.email" type="email" id="email" >
        </div>
        <p class="error-input" v-if="authStore.inputError.email">{{ authStore.inputError.email }}</p>
        <div class="campo">
          <label for="name">Nombre</label>
          <input v-model="authStore.user.name" type="text" id="name" >
        </div>
        <p class="error-input" v-if="authStore.inputError.name">{{ authStore.inputError.name }}</p>
        <div class="campo">
          <label for="password">Password</label>
          <input v-model="authStore.user.password" type="password" id="password" >
        </div>
        <p class="error-input" v-if="authStore.inputError.password">{{ authStore.inputError.password }}</p>
        <div class="campo">
          <label for="password2">Repetir Password</label>
          <input v-model="authStore.user.password2" type="password" id="password2" >
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Crear Cuenta">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>