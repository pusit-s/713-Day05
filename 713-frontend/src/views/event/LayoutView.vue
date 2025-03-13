<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
