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
  <div></div>
  <div>
    <EventCard v-for="event in events" :key="event.id" />
  </div>
</template>
