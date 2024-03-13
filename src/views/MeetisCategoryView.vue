<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useMeetiStore } from '@/stores/meeti';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/category.js';
import { formatDate } from '@/helpers';

const authStore = useAuthStore()
const meetiStore = useMeetiStore()
const categoryStore = useCategoryStore()
const route = useRoute()
onMounted(async () => {
  await authStore.getUserAuth()
  await categoryStore.getCategory(route.params.id)
  await meetiStore.getMeetisCategory(route.params.id)
})
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <h2>Categoría: {{ categoryStore.category.name }}</h2>
    <div v-if="meetiStore.meetisCategory.length > 0" class="contenedor">
      <div class="grid columnas-md-3 ">
        <div v-for="meeti in meetiStore.meetisCategory" class="card">
          <img v-if="meeti.group.image" :src="`${BACKEND_URL}/files/group/${meeti.group.image}`" alt="">
          <div class="card-texto">
            <p class="fecha">{{ formatDate(meeti.date) }} | Horas: {{ meeti.hour.substring(0, 5) }}</p>
            <RouterLink :to="{ name: 'meeti', params: { id: meeti.id } }">
              <h3>{{ meeti.title }}</h3>
            </RouterLink>
            <div class="info-autor">
              <img v-if="meeti.user.image" :src="`${BACKEND_URL}/files/profile/${meeti.user.image}`" alt="Image user"
                class="imagen">
              <div v-else class="imagen"></div>
              <div class="informacion">
                <p>Organizado por:</p>
                <p class="autor">{{ meeti.user.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-bottom: 1.5rem;" v-else>No hay meetis</div>
  </MeetiLayout>
</template>