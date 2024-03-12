<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useMeetiStore } from '@/stores/meeti';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore()
const meetiStore = useMeetiStore()
const route = useRoute()

onMounted(async () => {
  await authStore.getUserAuth()
  await meetiStore.getAllMeeti(route.params.id)
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor asistentes">
      <h1>Lista de Asistentes</h1>
      <ul v-if="meetiStore.meetiAll?.users?.length > 0" class="listado-asistentes">
        <li
          v-for="user in meetiStore.meetiAll?.users"
          :key="user.id"
          class="lista-asistente"
        >
          <div>
            <img v-if="user.image" :src="`${BACKEND_URL}/files/profile/${user.image}`" alt="Image user" class="imagen-assist">
            <div v-else class="imagen-assist"></div>
          </div>
          <div class="titulo">{{ user.name }}</div>
        </li>
      </ul>
      <p v-else class="no-asistentes">No hay asistentes</p>
    </main>
  </MeetiLayout>
</template>