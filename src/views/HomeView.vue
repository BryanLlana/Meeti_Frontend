<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue'
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import Hero from '@/components/Hero.vue'
import Searcher from '@/components/Searcher.vue'
import Categories from '@/components/Categories.vue'
import MeetiBg from '@/components/MeetiBg.vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getUserAuth()
})
</script>

<template>
  <MeetiLayout :userAuth="authStore.userAuth" :logout="authStore.logout">
    <Hero />
    <Searcher />

    <div class="contenedor">
      <h2>Próximos Meeti's</h2>
      <div class="grid columnas-md-3 ">
        <div class="card">
          <img src="/img/imagen1.jpg">
          <div class="card-texto">
            <p class="fecha">Jueves 30 De Diciembre de 2019</p>
            <a href="#">
              <h3>Desarrollo y Aceleración de Negocios</h3>
            </a>
            <div class="info-autor">
              <div class="imagen">
              </div>
              <div class="informacion">
                <p>Organizado por:</p>
                <p class="autor">Juan Pablo De la torre Valdez</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Categories />
    <MeetiBg />
  </MeetiLayout>
</template>
