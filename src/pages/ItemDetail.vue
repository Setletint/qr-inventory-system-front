<template>
    <div class="pt-20 sm:pt-30 px-6 md:px-16 lg:px-32 bg-base-100 text-base-content min-h-screen mb-40">
        <div v-if="loading" class="text-center">Loading...</div>

        <div v-else-if="item" class="max-w-2xl mx-auto space-y-8">
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold">{{ isEditing ? 'Edit Item' : item.name }}</h1>
                <div class="flex flex-col ml-auto space-y-2"> <!-- This container will align the buttons vertically -->
                    <QrButton />
                    <button v-if="isOwner && !isEditing" class="btn btn-primary" @click="isEditing = true">
                        Edit
                    </button>
                </div>
            </div>

            <!-- View Mode -->
            <div v-if="!isEditing" class="space-y-4">
                <!-- Visibility (disabled for now)
                <div class="text-lg" v-if="isOwner">
                    <span class="font-semibold">Visibility:</span>
                    <span>{{ item.isPrivate ? 'Private' : 'Public' }}</span>
                </div>
                 -->
                <div class="space-y-4">
                    <div v-for="(block, index) in item.content" :key="index" class="space-y-4">
                        <h2 class="text-2xl font-semibold">{{ block.header }}</h2>
                        <div>{{ block.value }}</div>
                    </div>
                </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="editName" type="text" class="input input-bordered" />
                </div>

                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">Private</span>
                        <input type="checkbox" v-model="editPrivate" class="checkbox checkbox-primary" />
                    </label>
                </div>

                <div class="space-y-4">
                    <h2 class="text-xl font-bold">Content Blocks</h2>

                    <div v-for="(block, index) in editContent" :key="index"
                        class="border p-4 rounded bg-base-200 space-y-2">
                        <div class="form-control">
                            <label class="label-text">Header:</label>
                            <input v-model="block.header" type="text" class="input input-bordered w-full" />
                        </div>

                        <div v-if="block.type === 'text'" class="space-y-2">
                            <label class="label-text">Text Block:</label>
                            <textarea v-model="block.value" class="textarea textarea-bordered w-full"></textarea>
                        </div>

                        <div class="flex justify-end gap-2">
                            <button class="btn btn-sm btn-error" @click="removeBlock(index)">Delete</button>
                        </div>
                    </div>

                    <button class="btn btn-outline w-full" @click="addTextBlock">+ Add Text Block</button>
                </div>

                <div class="flex gap-4 mt-4">
                    <button class="btn btn-primary" @click="saveChanges">Save</button>
                    <button class="btn btn-outline" @click="cancelEdit">Cancel</button>
                </div>
            </div>
        </div>

        <div v-else class="text-center text-gray-500">
            Item not found.
        </div>
    </div>
</template>



<script lang="ts" setup>
import QrButton from '../components/DownloadQrButton.vue';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const item = ref<any>(null);
const loading = ref(true);
const isOwner = ref(false);
const isEditing = ref(false);
const showMessage = ref<string>('');
const messageType = ref<'success' | 'error'>('success');

const editName = ref('');
const editPrivate = ref(false);
const editContent = ref<any[]>([]);

onMounted(() => {
    if (!sessionStorage.getItem('token')) {
        router.push('/auth');
        return;
    }
    fetchItem();
});

const fetchItem = async () => {
    loading.value = true;
    try {
        const itemId = route.params.id;
        const res = await axios.post(`/api/item/get/${itemId}`, {
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token'),
        });

        item.value = res.data.item;

        const currentUserId = sessionStorage.getItem('userId');
        if (item.value.owner && item.value.owner === currentUserId) {
            isOwner.value = true;
        }

        editName.value = item.value.name;
        editPrivate.value = item.value.isPrivate;
        editContent.value = Array.isArray(item.value.content) ? [...item.value.content] : [];
    } catch (error) {
        console.error(error);
        item.value = null;
    } finally {
        loading.value = false;
    }
};

const saveChanges = async () => {
    if (!editName.value.trim()) {
        alert('Name is required.');
        return;
    }

    try {
        const response = await axios.post(`/api/item/update/${route.params.id}`, {
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token'),
            name: editName.value,
            isPrivate: editPrivate.value,
            content: editContent.value,
        });

        if (response.data.success) {
            item.value.name = editName.value;
            item.value.isPrivate = editPrivate.value;
            item.value.content = [...editContent.value];

            isEditing.value = false;
            showMessage.value = 'Item saved successfully!';
            messageType.value = 'success';

        } else {
            showMessage.value = 'Failed to save changes. Please try again.';
            messageType.value = 'error';
        }
    } catch (error) {
        console.error(error);
        showMessage.value = 'Failed to save changes. Please try again.';
        messageType.value = 'error';
    }
};

const cancelEdit = () => {
    isEditing.value = false;
    editName.value = item.value.name;
    editPrivate.value = item.value.isPrivate;
    editContent.value = Array.isArray(item.value.content) ? [...item.value.content] : [];
};

const addTextBlock = () => {
    editContent.value.push({ type: 'text', header: 'New Header', value: '' });
};

const removeBlock = (index: number) => {
    editContent.value.splice(index, 1);
};

</script>