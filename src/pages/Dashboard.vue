<template>
    <div class="pt-20 sm:pt-30  px-6 md:px-16 lg:px-32 bg-base-100 text-base-content min-h-screen">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold">My Items</h1>
            <button class="btn btn-primary">
                + Add New Item
            </button>
        </div>
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search items..."
                class="input input-bordered w-full max-w-xs" />
        </div>

        <div v-if="loading" class="text-center">Loading...</div>

        <div v-else class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredItems" :key="item._id">
                        <router-link :to="`/item/${item._id}`">
                            <td>{{ item.name }}</td>
                        </router-link>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="text-sm text-gray-500 mb-2 mt-2">
            Total Items: {{ items.length }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const items = ref<Item[]>([]);
const loading = ref(true);

interface Item {
    _id: string;
    name: string;
}

onMounted(() => {
    if (!sessionStorage.getItem('token')) {
        router.push('/auth');
    } else {
        axios.post('/api/item/getItems', {
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token'),
        })
            .then(function (res) {
                items.value = res.data.items;
            })
            .finally(() => {
                loading.value = false;
            });
    }
});

const filteredItems = computed(() =>
    items.value.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);
</script>