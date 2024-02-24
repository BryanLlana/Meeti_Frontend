<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useCategoryStore } from '@/stores/category'
import { useGroupStore } from '@/stores/group'
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()
const groupStore = useGroupStore()

onMounted(async () => {
  await categoryStore.getCategories()
})

const inputDescription = e => {
  groupStore.newGroup.description = e.target.innerHTML.toString().replace(/<!--block-->/g, '')
}

const readImage = e => {
  groupStore.newGroup.image = e.target.files[0]
}
</script>

<template>
  <MeetiLayout>
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Crea un Nuevo Grupo</h1>

      <form @submit="groupStore.createGroup" class="default-form">
        <div class="campo">
          <label for="title">Título</label>
          <input v-model="groupStore.newGroup.title" type="text" id="title" placeholder="Ejm: Grupo Maravilla">
        </div>
        <div class="campo descripcion">
          <label for="description">Descripción</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor @input="inputDescription" input="x"></trix-editor>
          </div>
        </div>
        <div class="campo">
          <label for="category">Categoría</label>
          <select v-model="groupStore.newGroup.category" id="category">
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
          <input @change="readImage" type="file" id="image">
        </div>
        <div class="campo">
          <label for="website">Sitio Web</label>
          <input v-model="groupStore.newGroup.url" type="url" id="website" placeholder="Ejm: wwww.grupo.com">
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Crear Grupo">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>