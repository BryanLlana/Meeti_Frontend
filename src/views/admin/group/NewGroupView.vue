<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategories()
})
</script>

<template>
  <MeetiLayout>
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Crea un Nuevo Grupo</h1>

      <form class="default-form">
        <div class="campo">
          <label for="title">Título</label>
          <input type="text" id="title" placeholder="Ejm: Grupo Maravilla">
        </div>
        <div class="campo descripcion">
          <label for="description">Descripción</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor input="x"></trix-editor>
          </div>
        </div>
        <div class="campo">
          <label for="category">Categoría</label>
          <select id="category">
            <option value="" selected disabled>--Seleccione una categoría--</option>
            <option
              v-for="category in categoryStore.categories"
              :value="category.id"
            >{{ category.name }}
            </option>
          </select>  
        </div>
        <div class="campo">
          <label for="image">Imagen</label>
          <input type="file" id="image">
        </div>
        <div class="campo">
          <label for="website">Sitio Web</label>
          <input type="url" id="website" placeholder="Ejm: wwww.grupo.com">
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Crear Grupo">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>