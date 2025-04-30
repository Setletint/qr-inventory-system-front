<template>
    <div
        class="w-fit sm:min-w-[450px] p-8 sm:p-6 px-4 py-6 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">

        <form @submit.prevent="handleRegister" class="space-y-4">
            <!-- Email Field -->
            <div class="form-control">
                <label for="email" class="label">
                    <span class="label-text text-gray-600">Email</span>
                </label>
                <input type="email" id="email" v-model="email" required placeholder="Enter your email"
                    class="input input-bordered w-full" />
            </div>
            <!-- Username Field -->
            <div class="form-control">
                <label for="username" class="label">
                    <span class="label-text text-gray-600">Username</span>
                </label>
                <input type="text" id="username" v-model="username" required placeholder="Enter your desired username"
                    class="input input-bordered w-full" />
            </div>

            <!-- Password Fields -->
            <div class="form-control">
                <label for="password" class="label">
                    <span class="label-text text-gray-600">Password</span>
                </label>
                <input type="password" id="password" v-model="password" required placeholder="Enter your password"
                    class="input input-bordered w-full" />
            </div>
            <div class="form-control">
                <label for="password-controll" class="label">
                    <span class="label-text text-gray-600">Confirm Password</span>
                </label>
                <input type="password" id="password-controll" v-model="passwordControll" required
                    placeholder="Confirm your password" class="input input-bordered w-full" />
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
const username = ref<string>('');
const password = ref<string>('');
const passwordControll = ref<string>('');
const errorMessage = ref<string>('');

const router = useRouter();

const handleRegister = () => {
    if (!email.value || !password.value || !passwordControll.value) {
        errorMessage.value = 'Please enter both email and password.';
        return;
    }

    if (password.value != passwordControll.value) {
        errorMessage.value = 'Passwords aren\t identical.';
        return;
    }

    axios.post('/api/user/register', {
        email: email.value,
        username: username.value,
        password: password.value
    })
        .then(function () {
            axios.post(`/api/auth/login`, {
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
            router.push('/dashboard');
            return;
        })
        .catch(function (err) {
            errorMessage.value = err.response.data.message;
            return;
        });
};
</script>