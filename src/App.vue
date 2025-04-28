<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

const route = useRoute()

const hiddenNavbarPaths = ['/auth', '/item/:id']

const showNavbar = computed(() => {
  return !hiddenNavbarPaths.some(path => route.path.startsWith(path))
})

const isNavbarFixed = computed(() => {
  return !route.path.startsWith('/item/')
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content mt-0">
    <NavBar v-if="showNavbar" :isFixed="isNavbarFixed" />
    <router-view />
    <Footer v-if="showNavbar" />
  </div>
</template>

<style scoped>
</style>
