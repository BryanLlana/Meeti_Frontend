<script setup>
defineProps({
  category: {
    type: Object
  }
})
</script>

<template>
  <li>
    <a href="#">
      <img :src="`/img/categoria_${category.id}.jpg`">
      <p>{{ category.name }}</p>
    </a>
  </li>
</template>
