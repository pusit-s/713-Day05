<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'
import eventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const event = ref<Event>()
const props = defineProps< {id: string} > ()
const id = Number(props.id)
const router = useRouter()

eventService.getEvent(id).then((response) => {
  event.value = response.data
})
.catch((error: Error) => {
  if (error.response && error.response.status === 404) {
    router.push({ name: '404-resource-view', params: { resource: 'event' } })
  } else {
    router.push({ name: 'network-error-view' })
  }
})
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
