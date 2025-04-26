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
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredItems" :key="item.id">
                        <td>{{ item.name }}</td>
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
import { ref, computed } from 'vue';

const searchQuery = ref('');

interface Item {
    id: string;
    name: string;
}

const items: Item[] = [
    { id: '1', name: 'Маркер Красный' },
    { id: '2', name: 'Маркер Синий' },
    { id: '3', name: 'Маркер Зелёный' },
    { id: '4', name: 'Спрей Белый' },
];

const filteredItems = computed(() =>
    items.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

</script>

<style scoped>
/* Tailwind + DaisyUI стили уже достаточно хорошие */
</style>