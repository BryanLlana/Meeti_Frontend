<script setup>
import { useCategoryStore } from '@/stores/category.js';
import { onMounted } from 'vue';
import CategoryItem from './CategoryItem.vue';

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategories()
})
</script>

<template>
  <main class="bg-gris categorias">
    <h2>Encuentra Grupos por Categoría</h2>

    <div class="contenedor">
      <ul class="listado-categorias  grid columnas-2 columnas-md-3">
        <CategoryItem v-for="category in categoryStore.categories" :category="category" :key="category.id"/>
      </ul>
    </div>
  </main>
</template>
