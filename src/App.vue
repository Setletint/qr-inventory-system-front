<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

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
    <Footer v-if="showNavbar" />
  </div>
</template>

<style scoped>
</style>