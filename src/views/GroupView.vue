<script setup>
import { formatDate } from '@/helpers';
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useGroupStore } from '@/stores/group';
import { onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const authStore = useAuthStore()
const groupStore = useGroupStore()
const route = useRoute()

onMounted(async () => {
  await authStore.getUserAuth()
  await groupStore.getGroupPublic(route.params.id)
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <div class="contenedor">
      <h1>{{ groupStore.group.title }}</h1>
      <div class="informacion-grupo">
        <img v-if="groupStore.group.image" :src="`${BACKEND_URL}/files/group/${groupStore.group.image}`" alt="">
        <div class="texto">
          <div v-html="groupStore.group.description"></div>
          <a target="_blank" class="url" v-if="groupStore.group.url" :href="groupStore.group.url">Visita nuestro sitio web</a>
          <div v-if="groupStore.group?.meetis?.length > 0">
            <h2>Próximos Meetis</h2>
            <ul class="lista-meetis">
              <li
                v-for="meeti in groupStore.group?.meetis"
                :key="meeti.id"
              >
                <div class="texto">
                  <RouterLink :to="{name: 'meeti', params: { id: meeti.id}}">
                    <h3 style="margin: 0;">{{ meeti.title }}</h3>
                    <p class="fecha">{{ formatDate(meeti.date) }}, {{ meeti.hour.substring(0, 5) }}</p>
                  </RouterLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </MeetiLayout>
</template>