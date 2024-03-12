<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()
onMounted(async () => {
  await authStore.getUserAuth()
  await authStore.getUser(route.params.id)
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <h1>Perfil de Usuario: {{ authStore.userOne.name }}</h1>
    <div class="usuario-perfil contenedor">
      <img v-if="authStore.userOne.image" :src="`${BACKEND_URL}/files/profile/${authStore.userOne.image}`" alt="Image user" class="image">
      <div v-else class="imagen-assist"></div>
      <div class="informacion" v-html="authStore.userOne.description">
      </div>
    </div>
    <h1>Grupos de {{ authStore.userOne.name }}</h1>
    <div v-if="authStore.userOne?.groups?.length > 0" class="grupos-usuario contenedor">
      <ul class="lista-grupos">
        <li
          v-for="group in authStore.userOne?.groups"
          :key="group.id"
        >
          <div class="imagen">
            <img v-if="group.image" :src="`${BACKEND_URL}/files/group/${group.image}`" alt="">
          </div>
          <div class="texto">
            <RouterLink :to="{ name: 'group', params: {id: group.id} }"><h3>{{ group.title }}</h3></RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </MeetiLayout>
</template>