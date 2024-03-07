<script setup>
import { useCategoryStore } from '@/stores/category.js';
import { onMounted } from 'vue';
const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategories()
})
</script>

<template>
  <div class="buscador-inicio">
    <div class="contenedor">
      <h2>Busca un grupo en tu ciudad</h2>
      <form action="#">
        <select name="categoria">
          <option value="" disabled selected>-- Selecciona Categoría --</option>
          <option v-for="category in categoryStore.categories" :key="category.id">{{ category.name }}</option>
        </select>
        <input type="text" name="nombre" placeholder="Nombre Meeti">
        <input type="text" name="ciudad" placeholder="Ciudad">
        <input type="text" name="pais" placeholder="País">
        <input type="submit" value="Buscar" class="btn btn-rosa">
      </form>
    </div>
  </div>
</template>