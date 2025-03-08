<script setup lang="ts">
import { ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
const events = ref([
  { id: 1, title: 'Event 1'},
  { id: 2, title: 'Event 2'},
  { id: 3, title: 'Event 3'},
]);
</script>


<template>
  <div>
    <div v-if="events.length === 0">No events</div>
    <div v-else-if="events.length === 1">Only one event</div>
    <div v-else>
      <EventCard v-for="event in events" :key="event.id" />
    </div>
  </div>
</template>
