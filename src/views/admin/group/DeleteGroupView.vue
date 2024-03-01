<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useGroupStore } from '@/stores/group';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const groupStore = useGroupStore()
const authStore = useAuthStore()

onMounted(async () => {
  await groupStore.getGroup(route.params.id)
  await authStore.getUserAuth()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Eliminar Grupo: {{ groupStore.editGroup.title }}</h1>

      <form @submit.prevent="groupStore.deleteGroup" class="default-form">
        <legend>¿Eliminar Grupo? Un grupo eliminado no se puede recuperar</legend>
        <div class="campo enviar">
          <input type="submit" value="Eliminar Grupo" class="btn btn-rosa">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>