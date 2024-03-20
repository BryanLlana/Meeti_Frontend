<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue'
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import Hero from '@/components/Hero.vue'
import Searcher from '@/components/Searcher.vue'
import Categories from '@/components/Categories.vue'
import Meetis from '@/components/Meetis.vue'
import MeetiBg from '@/components/MeetiBg.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUserAuth()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <Hero />
    <Meetis />
    <Categories />
    <MeetiBg />
  </MeetiLayout>
</template>
