<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useMeetiStore } from '@/stores/meeti';

const route = useRoute()
const meetiStore = useMeetiStore()
const authStore = useAuthStore()

onMounted(async () => {
  await meetiStore.getMeeti(route.params.id)
  await authStore.getUserAuth()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Eliminar Meeti: {{ meetiStore.editMeeti.title }}</h1>

      <form @submit.prevent="meetiStore.deleteMeeti" class="default-form">
        <legend>¿Eliminar Meeti? Un meeti eliminado no se puede recuperar</legend>
        <div class="campo enviar">
          <input type="submit" value="Eliminar Meeti" class="btn btn-rosa">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>
