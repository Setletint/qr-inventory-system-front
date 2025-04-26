<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import QrButton from './components/DownloadQrButton.vue'
import NavBar from './components/NavBar.vue';

const route = useRoute()

const hiddenNavbarPaths = ['/auth']

const showNavbar = computed(() => {
  return !hiddenNavbarPaths.includes(route.path)
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content mt-0">
    <NavBar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<style scoped>
</style>