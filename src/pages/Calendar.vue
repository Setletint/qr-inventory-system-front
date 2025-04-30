<template>
    <div class="p-6 min-h-screen bg-base-100 text-base-content">
        <button @click="goBack" class="px-4 py-2 mb-6 btn btn-primary">
            ← Back
        </button>

        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Calendar</h1>
            <button @click="showCreateModal = true"
                class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                + Create Event
            </button>
        </div>

        <div v-if="loading" class="text-center">Loading calendar...</div>

        <div v-else-if="!events.length" class="text-center text-gray-500">
            No events found for this item.
        </div>

        <FullCalendar v-else :options="calendarOptions" class="bg-base-600 border-2 rounded-lg shadow-xl p-4 pb-8" />

        <!-- View Event Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 class="text-xl font-bold mb-2">{{ selectedEvent.title }}</h2>
                <p class="mb-2">{{ selectedEvent.description }}</p>
                <p class="text-sm text-gray-500">
                    Start: {{ selectedEvent.start }}<br />
                    End: {{ selectedEvent.end }}
                </p>
                <div class="mt-4 flex justify-end space-x-2">
                    <button @click="deleteEvent" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                    <button @click="closeModal" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Create Event Modal -->
        <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 class="text-xl font-bold mb-4">Create New Event</h2>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Title</label>
                    <input v-model="newEvent.title" class="w-full p-2 border rounded mt-1" type="text" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Description</label>
                    <textarea v-model="newEvent.description" class="w-full p-2 border rounded mt-1" rows="3"></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Date & Time</label>
                    <input v-model="newEvent.time" class="w-full p-2 border rounded mt-1" type="datetime-local" />
                </div>
                <div class="flex justify-end space-x-2">
                    <button @click="showCreateModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button @click="submitNewEvent"
                        class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventInput } from '@fullcalendar/core';

const route = useRoute();
const router = useRouter();
const events = ref<EventInput[]>([]);
const loading = ref(true);

const showModal = ref(false);
const showCreateModal = ref(false);
const selectedEvent = ref<any>({});
const newEvent = ref({
    title: '',
    description: '',
    time: '',
});

const goBack = () => {
    const itemId = route.params.id;
    router.push(`/item/${itemId}`);
};

const openModal = (event: any) => {
    selectedEvent.value = {
        id: event.id,
        title: event.title,
        description: event.extendedProps.description || 'No description',
        start: event.startStr,
        end: event.endStr || 'N/A',
    };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const deleteEvent = async () => {
    const itemId = route.params.id;
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    try {
        await axios.delete(`/api/item/calendar/${itemId}/${selectedEvent.value.id}`, {
            data: { userId, token }
        });

        events.value = events.value.filter(event => event.id !== selectedEvent.value.id);
        showModal.value = false;
    } catch (err) {
        console.error('Failed to delete event:', err);
        alert('Failed to delete event.');
    }
};

const submitNewEvent = async () => {
    if (!newEvent.value.title || !newEvent.value.time) return;

    const start = new Date(newEvent.value.time);
    const end = new Date(start.getTime() + 60 * 1000);

    const itemId = route.params.id;
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    await axios.post(`/api/item/calendar/${itemId}`, {
        userId,
        token,
        event: {
            title: newEvent.value.title,
            description: newEvent.value.description,
            time: newEvent.value.time,
        }
    });

    events.value.push({
        id: Date.now().toString(),
        title: newEvent.value.title,
        description: newEvent.value.description,
        start: start.toISOString(),
        end: end.toISOString(),
    });

    newEvent.value = { title: '', description: '', time: '' };
    showCreateModal.value = false;
};

const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: events,
    eventClick(info: any) {
        openModal(info.event);
    },
    height: 'auto',
});

onMounted(async () => {
    const itemId = route.params.id;
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');

    if (!userId || !token) {
        router.push('/auth');
        return;
    }

    try {
        const res = await axios.post(`/api/item/getCalendar/${itemId}`, {
            userId,
            token,
        });

        events.value = res.data.events.map((event: any) => {
            const start = new Date(event.time);
            const end = new Date(start.getTime() + 60 * 1000);

            return {
                id: event.id,
                title: event.title || 'Untitled Event',
                description: event.description || '',
                start: start.toISOString(),
                end: end.toISOString(),
            };
        });
    } catch (err) {
        console.error('Failed to fetch events:', err);
    } finally {
        loading.value = false;
    }
});
</script>