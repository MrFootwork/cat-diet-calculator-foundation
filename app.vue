<template>
  <div>
    {{ db.data }}
    <button @click="updateData"> Update Data </button>
    <button @click="reset"> Reset </button>
  </div>
</template>


<script setup lang="ts">
import Database from '~/model/Database'
import { ref } from 'vue'

const mockData = [
  {
    name: 'data1',
    age: 11,
  },
  {
    name: 'data2',
    age: 22,
  },
]
const db = ref(Database.getInstance(mockData))

function reset() {
  db.value.data = mockData
}

async function updateData() {
  await db.value.fetchDatabase()
}
</script>

<style scoped>
</style>