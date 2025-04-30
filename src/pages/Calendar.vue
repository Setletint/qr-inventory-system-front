<template>
    <div class="p-6 min-h-screen bg-base-100 text-base-content">
        <div v-if="loading" class="text-center">Loading calendar...</div>

        <div v-else-if="!events.length" class="text-center text-gray-500">
            No events found for this item.
        </div>

        <FullCalendar v-else :options="calendarOptions" class="bg-base-600 border-2 rounded-lg shadow-xl p-4" />


        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 class="text-xl font-bold mb-2">{{ selectedEvent.title }}</h2>
                <p class="mb-2">{{ selectedEvent.description }}</p>
                <p class="text-sm text-gray-500">
                    Start: {{ selectedEvent.start }}<br />
                    End: {{ selectedEvent.end }}
                </p>
                <div class="mt-4 text-right">
                    <button @click="closeModal" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
                        Close
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
const selectedEvent = ref<any>({});

const openModal = (event: any) => {
    selectedEvent.value = {
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
            const end = new Date(start.getTime() + 60 * 60 * 1000);

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