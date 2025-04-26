<template>
    <nav class="navbar px-4 fixed top-0 left-0 right-0 z-10 pt-0 bg-base-100/95">
        <!-- Left side -->
        <div class="flex items-center space-x-4">

            <router-link to="/" class="text-2xl font-semibold text-primary">InventoryApp</router-link>

            <div class="flex space-x-4">
                <router-link to="/" class="btn btn-ghost btn-sm text-base">Home</router-link>
                <router-link to="/dashboard" class="btn btn-ghost btn-sm text-base"
                    v-if="isAuthenticated">Dashboard</router-link>
            </div>
        </div>

        <!-- Right side -->
        <div class="ml-auto flex-none">

            <div v-if="isAuthenticated" tabindex="0" role="button" class="btn btn-ghost btn-circle avatar mr-2">
                <div class="w-10 rounded-full">
                    <span class="text-xl text-green-500 leading-9">+</span>
                </div>
            </div>
            <div v-if="isAuthenticated" class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://i.pravatar.cc/100?img=3" alt="User Avatar" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <router-link to="/settings">Settings</router-link>
                    </li>
                    <li>
                        <button @click="logout">Logout</button>
                    </li>
                </ul>
            </div>

            <div v-else class="flex gap-2">
                <router-link to="/auth" class="btn btn-outline btn-sm">Login</router-link>
                <router-link to="/auth?ref=register" class="btn btn-primary btn-sm">Register</router-link>
            </div>

        </div>
    </nav>
</template>


<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';

// Testing purpose
export default {
    data() {
        return {
            router: useRouter(),
        };
    },
    computed: {
        isAuthenticated(): boolean {
            return !!(sessionStorage.getItem('token') && sessionStorage.getItem('userId'));
        }
    },
    methods: {
        async logout(){
            axios.post('/api/auth/logout', {
                userId: sessionStorage.getItem('userId'),
                token: sessionStorage.getItem('token')
            })
            sessionStorage.clear();
            await this.router.push('/');
            this.router.go(0);
            return;
        }
    }
};
</script>