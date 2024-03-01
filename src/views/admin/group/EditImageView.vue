<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useGroupStore } from '@/stores/group';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const groupStore = useGroupStore()
const authStore = useAuthStore()
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

onMounted(async () => {
  await groupStore.getGroup(route.params.id)
  await authStore.getUserAuth()
  groupStore.imageNow = groupStore.editGroup.image
})

const readImage = e => {
  groupStore.editGroup.image = e.target.files[0]
}
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Editar Imagen del Grupo: {{ groupStore.editGroup.title }}</h1>

      <form @submit.prevent="groupStore.updateImage" class="default-form">
        <div class="campo">
          <label for="image">Imagen Nueva</label>
          <input @change="readImage" type="file" id="image">
        </div>
        <p class="error-input" v-if="groupStore.errorInput.image">{{ groupStore.errorInput.image }}</p>
        <div class="campo">
          <label>Imagen Actual</label>
          <img :src="`${BACKEND_URL}/files/group/${groupStore.imageNow}`" :alt="`Imagen grupo ${groupStore.editGroup.title}`" width="400">
        </div>
        <div class="campo enviar">
          <input type="submit" value="Subir Imagen" class="btn btn-rosa">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>