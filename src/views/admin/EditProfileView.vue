<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUserAuth()
})

const inputDescription = e => {
  authStore.profile.description = e.target.innerHTML.toString().replace(/<!--block-->/g, '')
}
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Editar Perfil</h1>

      <form @submit.prevent="authStore.editProfile" class="default-form">
        <div class="campo">
          <label>Nombre</label>
          <input v-model="authStore.profile.name" type="text">
        </div>
        <div class="campo descripcion">
          <label>Quien soy</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor @input="inputDescription" input="x" v-html="authStore.profile.description"></trix-editor>
          </div>
        </div>
        <div class="campo">
          <label>E-mail</label>
          <input v-model="authStore.profile.email" type="email">
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Guardar Cambios">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>