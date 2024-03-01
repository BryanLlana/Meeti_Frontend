<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import { useGroupStore } from '@/stores/group';
import useLocationMap from '@/composable/useLocationMap'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const authStore = useAuthStore()
const groupStore = useGroupStore()
const { zoom, center, marker, name, lastName, lat, lon } = useLocationMap()

onMounted(async () => {
  await authStore.getUserAuth()
  await groupStore.getGroups()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <main class="contenedor contenedor-formularios">
      <h1>Crear Meeti</h1>
      <form class="default-form">
        <legend>Sobre el Meeti</legend>
        <div class="campo">
          <label>Grupo</label>
          <select>
            <option value="" disabled selected>-- Selecciona Grupo --</option>
            <option v-for="group in groupStore.groups" :key="group.id" :value="group.id">{{ group.title }}</option>
          </select>
        </div>
        <div class="campo">
          <label>Titulo</label>
          <input type="text" placeholder="Titulo Meeti">
        </div>
        <div class="campo">
          <label>Invitado</label>
          <input type="text" placeholder="Nombre Invitado o Ponente (si aplica)">
        </div>
        <div class="columnas-2 grid">
          <div class="campo">
            <label>Fecha</label>
            <input type="date" placeholder="Fecha Meeti">
          </div>
          <div class="campo">
            <label>Hora</label>
            <input type="time" placeholder="Hora Meeti">
          </div>
        </div>
        <div class="campo">
          <label>Cupo</label>
          <input type="number" min="1" placeholder="Cupo Meeti (si aplica)">
        </div>
        <div class="campo descripcion">
          <label>Descripción</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor input="x"></trix-editor>
          </div>
        </div>

        <legend>Ubicación Meeti</legend>
        <div class="campo buscador">
          <label>Coloca la Dirección del Meeti</label>
          <div style="width: 100%;">
            <input v-model="name" style="width: 100%;" type="text">
            <button @click.prevent="marker" style="margin-top: 1rem; margin-left: 0;" class="cerrar-sesion">Buscar</button>
          </div>
        </div>
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
          <input type="submit" class="btn btn-rosa" value="Crear Meeti">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>