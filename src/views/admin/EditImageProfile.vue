<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  await authStore.getUserAuth()
  authStore.imageNow = authStore.profile.image
})

const readImage = e => {
  authStore.profile.image = e.target.files[0]
}
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Editar Imagen Perfil</h1>

      <form @submit.prevent="authStore.saveImage" class="default-form">
        <div class="campo">
          <label for="image">Imagen Nueva</label>
          <input @change="readImage" type="file" id="image">
        </div>
        <p class="error-input" v-if="authStore.inputError.image">{{ authStore.inputError.image }}</p>
        <div v-if="authStore.imageNow !== null" class="campo">
          <label>Imagen Actual</label>
          <img :src="`${BACKEND_URL}/files/profile/${authStore.imageNow}`" :alt="`Imagen  ${authStore.profile.name}`" width="200">
        </div>
        <div class="campo enviar">
          <input type="submit" value="Subir Imagen" class="btn btn-rosa">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>