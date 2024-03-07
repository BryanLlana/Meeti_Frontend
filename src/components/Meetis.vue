<script setup>
import { useMeetiStore } from '@/stores/meeti';
import { onMounted } from 'vue';
import { formatDate } from '@/helpers';

const meetiStore = useMeetiStore()
onMounted(async () => {
  await meetiStore.getAllMeetis()
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div class="contenedor">
    <h2>Próximos Meeti's</h2>
    <div class="grid columnas-md-3 ">
      <div v-for="meeti in meetiStore.meetisAll" class="card">
        <img v-if="meeti.group.image" :src="`${BACKEND_URL}/files/group/${meeti.group.image}`" alt="">
        <div class="card-texto">
          <p class="fecha">{{ formatDate(meeti.date) }} | Horas: {{ meeti.hour.substring(0, 5) }}</p>
          <a href="#">
            <h3>{{ meeti.title }}</h3>
          </a>
          <div class="info-autor">
            <img v-if="meeti.user.image" :src="`${BACKEND_URL}/files/profile/${meeti.user.image}`" alt="Image user" class="imagen">
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
</template>