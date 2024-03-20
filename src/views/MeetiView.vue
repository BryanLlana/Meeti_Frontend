<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted, computed, ref } from 'vue';
import { useMeetiStore } from '@/stores/meeti';
import { useRoute, RouterLink } from 'vue-router';
import { formatDate } from '@/helpers';
import { useCommentStore } from '@/stores/comment';

const authStore = useAuthStore()
const meetiStore = useMeetiStore()
const commentStore = useCommentStore()
const route = useRoute()
const button = ref(false)
const assistanceQuantity = ref(0)


onMounted(async () => {
  await authStore.getUserAuth()
  await meetiStore.getAllMeeti(route.params.id)
  await commentStore.getComments(meetiStore.meetiAll.id)
  button.value = meetiStore.meetiAll?.users?.some(user => user.id === authStore.userAuth.id)
  assistanceQuantity.value = meetiStore.meetiAll.users.length
})

const register = async () => {
  await meetiStore.confirmAssistance(meetiStore?.meetiAll?.id, button.value)
  button.value = !button.value
  if (button.value) {
    assistanceQuantity.value = ++assistanceQuantity.value
  } else {
    assistanceQuantity.value = --assistanceQuantity.value
  }
}

const isCreator = computed(() => {
  return meetiStore.meetiAll?.user?.id === authStore.userAuth.id
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
                <RouterLink :to="{ name: 'user', params: { id: meetiStore.meetiAll?.user?.id}}">{{ meetiStore.meetiAll?.user?.name }}</RouterLink> Creador de:
                <RouterLink :to="{ name: 'group', params: {id: meetiStore.meetiAll?.group?.id} }">{{ meetiStore.meetiAll?.group?.title }}</RouterLink>
              </p>
            </div>
          </div>
        </div>
        
        <div v-if="authStore.userAuth.id" class="pregunta-asistencia">
          <div v-if="!isCreator">
            <p>{{ button ? 'Ya estás registrado' : '¿Asistirás?' }}</p>
            <button
              @click="register"
              class="assist"
              :class="`${button ? 'red' : 'aqua'}`"
              type="submit"
            >{{button ? 'Cancelar' : 'SI'}}
            </button>
          </div>
          <div v-else>Tú creaste este meeti</div>
        </div>
        <p v-else>Iniciar Sesión para confirmar tu asistencia</p>
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
              <h3>{{assistanceQuantity}} Asistentes</h3>
              <RouterLink :to="{name: 'assistants', params: { id: meetiStore.meetiAll.id}}">Ver todos</RouterLink>
            </div>
          </div>

          <div class="comentarios">
            <h2>Comentarios</h2>
            <p v-if="meetiStore.meetiAll?.comments?.length === 0">No hay comentarios aún</p>
            <div 
              v-else
              v-for="comment in commentStore.comments"
              class="comentario"
            >
              <div class="comment">
                <img v-if="comment.user.image" :src="`${BACKEND_URL}/files/profile/${comment.user.image}`" class="imagen" />
                <div v-else class="imagen"></div>
              </div>
              <div class="texto">
                <p>{{ comment.message }}</p>
                <p>Escrito por: <span>{{ comment.user.name }}</span></p>
                <input
                  v-if="comment.user.id === authStore.userAuth.id"
                  @click="() => commentStore.deleteComment(comment.id)" 
                  type="button" 
                  value="Eliminar" 
                  class="btn btn-azul"
                >
              </div>
            </div>
            <form @submit.prevent="() => commentStore.createComment(meetiStore.meetiAll?.id)" v-if="authStore.userAuth?.email" class="default-form comentarios">
              <legend>Agrega un Comentario</legend>
              <div class="campo">
                <label>Comentario</label>
                <textarea v-model="commentStore.message"></textarea>
              </div>
              <p class="error-input" v-if="commentStore.errorInput.message">{{ commentStore.errorInput.message }}</p>
              <div class="campo enviar">
                <input type="submit" value="Enviar" class="btn btn-rosa">
              </div>
            </form>
            <p v-else>Inicia Sesión para agregar un comentario</p>
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