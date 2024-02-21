<script setup>
import MeetiLayout from '@/layout/MeetiLayout.vue';
</script>

<template>
  <MeetiLayout>
    <main class="contenedor contenedor-formularios">
      <h1>Crear Cuenta</h1>
      <form class="default-form">
        <div class="campo">
          <label for="email">E-mail</label>
          <input type="email" id="email" placeholder="Tiene que ser un email válido">
        </div>
        <div class="campo">
          <label for="name">Nombre</label>
          <input type="text" id="name" >
        </div>
        <div class="campo">
          <label for="password">Password</label>
          <input type="password" id="password" >
        </div>
        <div class="campo">
          <label for="password2">Password</label>
          <input type="password" id="password2" >
        </div>
        <div class="campo enviar">
          <input type="submit" class="btn btn-rosa" value="Crear Cuenta">
        </div>
      </form>
    </main>
  </MeetiLayout>
</template>