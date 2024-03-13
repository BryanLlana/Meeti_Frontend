<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  category: {
    type: Object
  }
})
</script>

<template>
  <li>
    <RouterLink :to="{name: 'meetis-category', params: { id: category.id}}">
      <img :src="`/img/categoria_${category.id}.jpg`">
      <p>{{ category.name }}</p>
    </RouterLink>
  </li>
</template>
