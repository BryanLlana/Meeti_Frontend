<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useGroupStore } from '@/stores/group';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const groupStore = useGroupStore()

onMounted(async () => {
  await groupStore.getGroup(route.params.id)
})
</script>

<template>
  <MeetiLayout>
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