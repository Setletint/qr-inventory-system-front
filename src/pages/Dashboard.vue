<template>
    <div class="pt-20 sm:pt-30  px-6 md:px-16 lg:px-32 bg-base-100 text-base-content min-h-screen">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold">My Items</h1>
            <button class="btn btn-primary" @click="showModal = true">
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
                        <router-link class="min-w-full" :to="`/item/${item._id}`" style="display: block; width: 100%;">
                            <td>{{ item.name }}</td>
                        </router-link>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="text-sm text-gray-500 mb-2 mt-2">
            Total Items: {{ items.length }}
        </div>

        <dialog id="addItemModal" class="modal" :open="showModal">
            <div class="modal-box rounded-xl">
                <h3 class="font-bold text-lg mb-6">Create New Item</h3>
                <div class="form-control mb-4">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="newItemName" type="text" placeholder="Item name"
                        class="input input-bordered ml-2" />
                </div>
                <div class="form-control mb-4">
                    <label class="label cursor-pointer">
                        <span class="label-text">Private</span>
                        <input type="checkbox" v-model="isPrivate" class="checkbox checkbox-primary" />
                    </label>
                </div>
                <div class="modal-action">
                    <button class="btn btn-primary" @click="createItem">Save</button>
                    <button class="btn" @click="showModal = false">Cancel</button>
                </div>
            </div>
        </dialog>
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

const showModal = ref(false);
const newItemName = ref('');
const isPrivate = ref(false);

interface Item {
    _id: string;
    name: string;
}

onMounted(() => {
    if (!sessionStorage.getItem('token')) {
        router.push('/auth');
    } else {
        fetchItems();
    }
});

const fetchItems = () => {
    loading.value = true;
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
};

const filteredItems = computed(() =>
    items.value.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

const createItem = () => {
    if (!newItemName.value.trim()) {
        alert('Name is required.');
        return;
    }

    axios.post('/api/item/create', {
        userId: sessionStorage.getItem('userId'),
        token: sessionStorage.getItem('token'),
        name: newItemName.value,
        isPrivate: isPrivate.value
    })
        .then(() => {
            showModal.value = false;
            newItemName.value = '';
            isPrivate.value = false;
            fetchItems();
        })
        .catch(err => {
            console.error(err);
            alert('Failed to create item.');
        });
};
</script>
