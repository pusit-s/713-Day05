<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'
import eventService from '@/services/EventService'

const event = ref<Event>()
const props = defineProps< {id: string} > ()
const id = Number(props.id)

eventService.getEvent(id).then((response) => {
  event.value = response.data
})
.catch((error: Error) => {
  console.error("There was an error!",error)
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'events-list-view', params: { id } }">Details</RouterLink>
      <RouterLink :to="{ name: 'event-register-view', params: { id } }">Register</RouterLink>
      <RouterLink :to="{ name: 'event-edit-view', params: { id } }">Edit</RouterLink>
    </nav>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
