<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="relative tabs mb-4">
      <button
        class="tab tab-bordered px-6"
        :class="{ 'tab-active': tab === 'login' }"
        @click="tab = 'login'"
        ref="loginBtn"
      >
        Login
      </button>

      <button
        class="tab tab-bordered px-6"
        :class="{ 'tab-active': tab === 'register' }"
        @click="tab = 'register'"
        ref="registerBtn"
      >
        Register
      </button>

      <!-- Sliding Underline -->
      <div
        class="absolute bottom-0 h-1 bg-primary transition-all duration-300 rounded-full"
        :style="underlineStyle"
      ></div>
    </div>

    <LoginForm v-if="tab === 'login'" />
    <RegisterForm v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';

const route = useRoute();
const router = useRouter();

onMounted(() => {
    if (sessionStorage.getItem('token')) {
        router.push('/dashboard');
    }
});

const tab = ref<'login' | 'register'>(
  ['login', 'register'].includes(route.query.ref as string) ? (route.query.ref as 'login' | 'register') : 'login'
);

const loginBtn = ref<HTMLElement | null>(null);
const registerBtn = ref<HTMLElement | null>(null);
const underlineStyle = ref<Record<string, string>>({});

const updateUnderline = () => {
  nextTick(() => {
    const activeBtn = tab.value === 'login' ? loginBtn.value : registerBtn.value;
    if (activeBtn && activeBtn.parentElement) {
      const rect = activeBtn.getBoundingClientRect();
      const containerRect = activeBtn.parentElement.getBoundingClientRect();
      underlineStyle.value = {
        width: rect.width + 'px',
        left: rect.left - containerRect.left + rect.width / 2 + 'px',
        transform: 'translateX(-50%)',
      };
    }
  });
};

onMounted(updateUnderline);
watch(tab, updateUnderline);
</script>
