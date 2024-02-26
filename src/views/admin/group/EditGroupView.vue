<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
import { useCategoryStore } from '@/stores/category'
import { useGroupStore } from '@/stores/group'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const categoryStore = useCategoryStore()
const groupStore = useGroupStore()

onMounted(async () => {
  await groupStore.getGroup(route.params.id)
  await categoryStore.getCategories()
})

const inputDescription = e => {
  groupStore.editGroup.description = e.target.innerHTML.toString().replace(/<!--block-->/g, '')
}
</script>

<template>
  <MeetiLayout>
    <main class="contenedor contenedor-formularios no-padding">
      <h1>Editar Grupo: {{ groupStore.editGroup.title }}</h1>

      <form @submit.prevent="groupStore.updateGroup" class="default-form">
        <div class="campo">
          <label for="title">Título</label>
          <input v-model="groupStore.editGroup.title" type="text" id="title" placeholder="Ejm: Grupo Maravilla">
        </div>
        <p class="error-input" v-if="groupStore.errorInput.title">{{ groupStore.errorInput.title }}</p>
        <div class="campo descripcion">
          <label for="description">Descripción</label>
          <div class="contenedor-editor">
            <input type="hidden" id="x">
            <trix-editor @input="inputDescription" input="x" v-html="groupStore.editGroup.description"></trix-editor>
          </div>
        </div>
        <p class="error-input" v-if="groupStore.errorInput.description">{{ groupStore.errorInput.description }}</p>
        <div class="campo">
          <label for="category">Categoría</label>
          <select v-model="groupStore.editGroup.category" id="category">
            <option value="" selected disabled>--Seleccione una categoría--</option>
            <option
              v-for="category in categoryStore.categories"
              :value="category.id"
            >{{ category.name }}
            </option>
          </select>  
        </div>
        <p class="error-input" v-if="groupStore.errorInput.category">{{ groupStore.errorInput.category }}</p>
        <div class="campo">
          <label for="website">Sitio Web</label>
          <input v-model="groupStore.editGroup.website" type="url" id="website" placeholder="Ejm: wwww.grupo.com">
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Guardar Cambios">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>