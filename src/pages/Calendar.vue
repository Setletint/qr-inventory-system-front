<template>
    <div class="p-6 min-h-screen bg-base-100 text-base-content">
        <div v-if="loading" class="text-center">Loading calendar...</div>

        <div v-else-if="!events.length" class="text-center text-gray-500">
            No events found for this item.
        </div>

        <FullCalendar v-else :options="calendarOptions" class="bg-base-600 border border-2 rounded-lg shadow-xl p-4" />
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
        alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
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
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token'),
        });

        // Ensure proper mapping for FullCalendar format
        events.value = res.data.events.map((event: any) => {
            const start = new Date(event.time); // Convert the 'time' field to start Date
            const end = new Date(start.getTime() + 60 * 60 * 1000); // Set end time to 1 hour after start (you can adjust this)

            return {
                id: event.id,
                title: event.title || 'Untitled Event',
                description: event.description || '',
                start: start.toISOString(), // Convert to ISO string
                end: end.toISOString(), // Convert to ISO string
            };
        });
    } catch (err) {
        console.error('Failed to fetch events:', err);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>

</style>