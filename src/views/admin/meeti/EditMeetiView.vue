<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { useGroupStore } from '@/stores/group'
import { onMounted } from 'vue';
import { useMeetiStore } from '@/stores/meeti';
import { useRoute } from 'vue-router';
import useLocationMap from '@/composable/useLocationMap';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const route = useRoute()
const authStore = useAuthStore()
const groupStore = useGroupStore()
const meetiStore = useMeetiStore()

const { zoom, center, marker, name, lastName, lat, lon } = useLocationMap()

onMounted(async() => {
  await authStore.getUserAuth()
  await groupStore.getGroups()
  await meetiStore.getMeeti(route.params.id)
  lastName.value = meetiStore.editMeeti.address
  lat.value = meetiStore.editMeeti.lat
  lon.value = meetiStore.editMeeti.lon
  center.value = [meetiStore.editMeeti.lat, meetiStore.editMeeti.lon]
})

const inputDescription = e => {
  meetiStore.editMeeti.description = e.target.innerHTML.toString().replace(/<!--block-->/g, '')
}
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logouy="authStore.logout">
    <main class="contenedor contenedor-formularios">
      <h1>Editar Meeti: {{ meetiStore.editMeeti.title }}</h1>
      <form @submit.prevent="() => meetiStore.updateMeeti(lastName, lat, lon)" class="default-form">
        <legend>Sobre el Meeti</legend>
        <div class="campo">
          <label>Grupo</label>
          <select v-model="meetiStore.editMeeti.group">
            <option value="" disabled selected>-- Selecciona Grupo --</option>
            <option v-for="group in groupStore.groups" :key="group.id" :value="group.id">{{ group.title }}</option>
          </select>
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.group">{{ meetiStore.errorInput.group }}</p>
        <div class="campo">
          <label>Titulo</label>
          <input v-model="meetiStore.editMeeti.title" type="text" placeholder="Titulo Meeti">
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.title">{{ meetiStore.errorInput.title }}</p>
        <div class="campo">
          <label>Invitado</label>
          <input v-model="meetiStore.editMeeti.speaker" type="text" placeholder="Nombre Invitado o Ponente (si aplica)">
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.speaker">{{ meetiStore.errorInput.speaker }}</p>
        <div class="columnas-2 grid">
          <div class="campo">
            <label>Fecha</label>
            <input v-model="meetiStore.editMeeti.date" type="date" placeholder="Fecha Meeti">
          </div>
          <div class="campo">
            <label>Hora</label>
            <input v-model="meetiStore.editMeeti.hour" type="time" placeholder="Hora Meeti">
          </div>
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.date">{{ meetiStore.errorInput.date }}</p>
        <div class="campo">
          <label>Cupo</label>
          <input v-model="meetiStore.editMeeti.quota" type="number" min="1" placeholder="Cupo Meeti (si aplica)">
        </div>
        <div class="campo descripcion">
          <label>Descripción</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor @input="inputDescription" input="x" v-html="meetiStore.editMeeti.description"></trix-editor>
          </div>
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.description">{{ meetiStore.errorInput.description }}</p>
        <legend>Ubicación Meeti</legend>
        <div class="campo buscador">
          <label>Coloca la Dirección del Meeti</label>
          <div style="width: 100%;">
            <input v-model="name" style="width: 100%;" type="text">
            <button @click.prevent="marker" style="margin-top: 1rem; margin-left: 0;" class="cerrar-sesion">Buscar</button>
          </div>
        </div>
        <p class="error-input" v-if="meetiStore.errorInput.address">{{ meetiStore.errorInput.address }}</p>
        <div style="height:600px; width:100%">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :latLng="center"/>
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
        <p class="informacion">Confirma que los siguientes campos sean correctos:</p>
        <div class="campo">
          <label>Dirección</label>
          <input :value="lastName" type="text" id="direccion" placeholder="Dirección">
        </div>
        <div class="campo">
          <label>Latitud</label>
          <input :value="lat" type="text" id="lat">
        </div>
        <div class="campo">
          <label>Longitud</label>
          <input :value="lon" type="text" id="lng">
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Guardar Cambios">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>

