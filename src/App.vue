<script setup lang="ts">
import QrButton from './components/DownloadQrButton.vue'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content mt-0">
    <NavBar />
    <router-view /> <!-- This renders the page component based on the route -->
  </div>
</template>

<style scoped>
</style>
