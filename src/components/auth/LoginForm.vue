<template>
    <div
        class="w-fit sm:min-w-[450px] p-8 sm:p-6 px-4 py-6 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">

        <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email Field -->
            <div class="form-control">
                <label for="email" class="label">
                    <span class="label-text text-gray-600">Email</span>
                </label>
                <input type="email" id="email" v-model="email" required placeholder="Enter your email"
                    class="input input-bordered w-full" />
            </div>

            <!-- Password Field -->
            <div class="form-control">
                <label for="password" class="label">
                    <span class="label-text text-gray-600">Password</span>
                </label>
                <input type="password" id="password" v-model="password" required placeholder="Enter your password"
                    class="input input-bordered w-full" />
            </div>

            <!-- Error Message -->
            <p v-if="errorMessage" class="text-red-500 text-sm text-center">{{ errorMessage }}</p>

            <!-- Submit Button -->
            <div class="form-control mt-6">
                <button type="submit" class="btn btn-primary w-full">
                    Log In
                </button>
            </div>
        </form>

    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');


const router = useRouter();

const handleLogin = () => {
    if (!email.value || !password.value) {
        errorMessage.value = 'Please enter both email and password.';
        return;
    }

    axios.post('/api/auth/login', {
        email: email.value,
        password: password.value
    })
    .then(function (res) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userId', res.data.userId);
        router.push('/dashboard');
        return;
    })
    .catch(function (err) {
        errorMessage.value = err.response.data.message;
        return;
    })

    // Add login logic here
    // Example: Call API to authenticate
    console.log('Logging in with', email.value, password.value);

    // If login fails, show an error message
    // errorMessage.value = 'Invalid email or password';
};
</script>