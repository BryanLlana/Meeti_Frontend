<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useGroupStore } from '@/stores/group';
import { useAuthStore } from '@/stores/auth';
import { useMeetiStore } from '@/stores/meeti';
import { formatDate } from '@/helpers';

const groupStore = useGroupStore()
const authStore = useAuthStore()
const meetiStore = useMeetiStore()

onMounted(async () => {
  await groupStore.getGroups()
  await authStore.getUserAuth()
  await meetiStore.getMeetis()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor panel-administracion">
      <h1>Panel de Administración</h1>

      <div class="contenedor-botones">
        <RouterLink :to="{ name: 'new-group' }" class="btn btn-amarillo">Nuevo Grupo</RouterLink>
        <RouterLink :to="{ name: 'new-meeti' }" class="btn btn-azul">Nuevo Meeti</RouterLink>
        <RouterLink :to="{ name: 'edit-profile' }" class="btn btn-rosa">Editar Perfil</RouterLink>
        <RouterLink :to="{ name: 'edit-image-profile' }" class="btn btn-amarillo">Imagen Perfil</RouterLink>
      </div>

      <div class="seccion-admin">
        <h2>Próximos Meetis</h2>
        <ul v-if="meetiStore.meetisNext.length > 0">
          <li
            v-for="meeti in meetiStore.meetisNext"
            :key="meeti.id"
          >
            <div class="informacion-admin">
              <p class="fecha">{{ formatDate(meeti.date) }} | Horas: {{ meeti.hour.substring(0, 5) }}</p>
              <RouterLink :to="{name: 'meeti', params: { id: meeti.id }}"><h3>{{ meeti.title }}</h3></RouterLink>
              <small>{{ meeti.users.length }} Asistentes</small>
            </div>
            <div class="acciones contenedor-botones">
              <RouterLink :to="{ name: 'edit-meeti', params: { id: meeti.id } }" class="btn btn-verde">Editar</RouterLink>
              <RouterLink :to="{ name: 'admin' }" class="btn btn-azul2">Asistentes</RouterLink>
              <RouterLink :to="{ name: 'delete-meeti', params: { id: meeti.id } }" class="btn btn-rojo">Eliminar</RouterLink>
            </div>
          </li>
        </ul>
        <p style="margin: 0 auto; max-width: 95%;" v-else>No hay meetis próximos</p>
      </div>

      <div class="seccion-admin">
        <h2>Tus Grupos</h2>
        <ul v-if="groupStore.groups.length > 0">
          <li
            v-for="group in groupStore.groups"
            :key="group.id"
          >
            <div class="informacion-admin">
              <RouterLink :to="{ name: 'group', params: {id: group.id} }">
                <h3>{{ group.title }}</h3>
              </RouterLink>
            </div>
            <div class="acciones contenedor-botones">
              <RouterLink :to="{ name: 'edit-group', params: { id: group.id } }" class="btn btn-verde">Editar</RouterLink>
              <RouterLink :to="{ name: 'edit-image-group', params: {id: group.id } }" class="btn btn-azul2">Imagen</RouterLink>
              <RouterLink :to="{ name: 'delete-group', params: { id: group.id} }" class="btn btn-rojo">Eliminar</RouterLink>
            </div>
          </li>
        </ul>
        <p style="margin: 0 auto; max-width: 95%;" v-else>No hay grupos</p>
      </div>

      <div class="seccion-admin">
        <h2>Meetis Anteriores</h2>
        <ul v-if="meetiStore.meetisPrevious.length > 0">
          <li
            v-for="meeti in meetiStore.meetisPrevious"
            :key="meeti.id"
          >
            <div class="informacion-admin">
              <p class="fecha">{{ formatDate(meeti.date) }} | Horas: {{ meeti.hour.substring(0, 5) }}</p>
              <RouterLink :to="{name: 'meeti', params: { id: meeti.id }}"><h3>{{ meeti.title }}</h3></RouterLink>
              <small>{{ meeti.users.length }} Asistentes</small>
            </div>
            <div class="acciones contenedor-botones">
              <RouterLink :to="{ name: 'edit-meeti', params: { id: meeti.id } }" class="btn btn-verde">Editar</RouterLink>
              <RouterLink :to="{ name: 'admin' }" class="btn btn-azul2">Asistentes</RouterLink>
              <RouterLink :to="{ name: 'delete-meeti', params: { id: meeti.id } }" class="btn btn-rojo">Eliminar</RouterLink>
            </div>
          </li>
        </ul>
        <p style="margin: 0 auto; max-width: 95%;" v-else>No hay meetis anteriores</p>
      </div>
    </main>
  </MeetiLayout>
</template>