<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()

const add = () => {
  store.increment()
}
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    {{ store.count }}
    <button @click="add">++</button>

    <h1>{{ store.doubleCount }}</h1>
    <TheWelcome />
  </main>
</template>
