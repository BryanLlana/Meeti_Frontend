<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useGroupStore } from '@/stores/group';
import { useAuthStore } from '@/stores/auth';

const groupStore = useGroupStore()
const authStore = useAuthStore()

onMounted(async () => {
  await groupStore.getGroups()
  await authStore.getUserAuth()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor panel-administracion">
      <h1>Panel de Administración</h1>

      <div class="contenedor-botones">
        <RouterLink :to="{ name: 'new-group' }" class="btn btn-amarillo">Nuevo Grupo</RouterLink>
        <RouterLink :to="{ name: 'admin' }" class="btn btn-azul">Nuevo Meeti</RouterLink>
        <RouterLink :to="{ name: 'admin' }" class="btn btn-rosa">Editar Perfil</RouterLink>
        <RouterLink :to="{ name: 'admin' }" class="btn btn-amarillo">Imagen Perfil</RouterLink>
      </div>

      <div class="seccion-admin">
        <h2>Tus Meetis</h2>
        <ul>
          <li>
            <div class="informacion-admin">
              <p class="fecha">Lunes, 22 de Mayo 2024</p>
              <h3>E-Commerce</h3>
              <small>23 Asistentes</small>
            </div>
            <div class="acciones contenedor-botones">
              <RouterLink :to="{ name: 'admin' }" class="btn btn-verde">Editar</RouterLink>
              <RouterLink :to="{ name: 'admin' }" class="btn btn-azul2">Asistentes</RouterLink>
              <RouterLink :to="{ name: 'admin' }" class="btn btn-rojo">Eliminar</RouterLink>
            </div>
          </li>
        </ul>
      </div>

      <div class="seccion-admin">
        <h2>Tus Grupos</h2>
        <ul v-if="groupStore.groups.length > 0">
          <li
            v-for="group in groupStore.groups"
            :key="group.id"
          >
            <div class="informacion-admin">
              <h3>{{ group.title }}</h3>
            </div>
            <div class="acciones contenedor-botones">
              <RouterLink :to="{ name: 'edit-group', params: { id: group.id } }" class="btn btn-verde">Editar</RouterLink>
              <RouterLink :to="{ name: 'edit-image-group', params: {id: group.id } }" class="btn btn-azul2">Imagen</RouterLink>
              <RouterLink :to="{ name: 'delete-group', params: { id: group.id} }" class="btn btn-rojo">Eliminar</RouterLink>
            </div>
          </li>
        </ul>
        <p v-else>No hay grupos</p>
      </div>
    </main>
  </MeetiLayout>
</template>
