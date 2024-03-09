<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useMeetiStore } from '@/stores/meeti';
import { useRoute } from 'vue-router';
import { formatDate } from '@/helpers';

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
    <div class="encabezado-evento">
      <div class="contenedor">
        <div class="resumen-evento">
          <h1>{{ meetiStore.meetiAll.title }}</h1>

          <div class="info-autor">
            <div class="imagen">
              <img v-if="meetiStore.meetiAll?.user?.image" :src="`${BACKEND_URL}/files/profile/${meetiStore.meetiAll?.user?.image}`" alt="Image user" class="imagen">
              <div v-else class="imagen"></div>
            </div>
            <div class="informacion">
              <p>Organizado por:</p>
              <p class="autor">
                <a href="">{{ meetiStore.meetiAll?.user?.name }}</a> Creador de:
                <a href="">{{ meetiStore.meetiAll?.group?.title }}</a>
              </p>
            </div>
          </div>
        </div>
        
        <div v-if="authStore.userAuth.id" class="pregunta-asistencia">
          <p>¿Asistirás?</p>
          <a href="#" class="btn btn-azul">Si</a>
        </div>
      </div>
    </div>

    <main class="contenido-evento">
      <div class="contenedor">
        <div class="informacion-evento">
          <div class="descripcion">
            <img v-if="meetiStore.meetiAll?.group?.image" :src="`${BACKEND_URL}/files/group/${meetiStore.meetiAll?.group?.image}`" alt="Image meeti">
            <p v-html="meetiStore.meetiAll.description"></p>
          </div>
          <div class="asistentes">
            <div class="titulo">
              <h3>{{meetiStore.meetiAll?.users?.length}} Asistentes</h3>
              <a href="#">Ver todos</a>
            </div>
          </div>

          <div class="comentarios">
            <h2>Comentarios</h2>
            <div class="comentario">
              <div class="imagen">

              </div>
              <div class="texto">
                <p>Hola</p>
                <p>Escrito por: <span>Juan</span></p>
                <input type="button" value="Eliminar" class="btn btn-azul">
              </div>
            </div>
            <div class="comentario">
              <div class="imagen">

              </div>
              <div class="texto">
                <p>Hola</p>
                <p>Escrito por: <span>Juan</span></p>
              </div>
            </div>
            <form class="default-form comentarios">
              <legend>Agrega un Comentario</legend>
              <div class="campo">
                <label>Comentario</label>
                <textarea></textarea>
              </div>
              <div class="campo enviar">
                <input type="submit" value="Enviar" class="btn btn-rosa">
              </div>
            </form>
          </div>
        </div>

        <aside class="informacion">
          <div class="fecha">
            <p>{{ formatDate(meetiStore.meetiAll.date) }}, {{ meetiStore.meetiAll?.hour?.substring(0, 5) }} horas</p>
          </div>
          <div class="ubicacion">
            <p>{{ meetiStore.meetiAll.address }}</p>
          </div>
          <div class="ubicacion-meeti"></div>
        </aside>
      </div>
    </main>
  </MeetiLayout>
</template>