<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="tabs mb-4">
      <button class="tab tab-bordered" :class="{ 'tab-active': tab === 'login' }" @click="tab = 'login'">Login</button>
      <button class="tab tab-bordered" :class="{ 'tab-active': tab === 'register' }"
        @click="tab = 'register'">Register</button>
    </div>
    <LoginForm v-if="tab === 'login'" />
    <RegisterForm v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';


const tab = ref<'login' | 'register'>('login');
</script>