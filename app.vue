<template>
  <div>
    {{ db.data }}
    <button @click="fetchData"> Update Data </button>
    <button @click="reset"> Reset Database </button>
  </div>
</template>

<script setup lang="ts">
import Database from '~/model/database'
import { ref } from 'vue'

const db = ref(Database.getInstance())

async function fetchData() {
  await db.value.fetchMongo()
}

async function reset() {
  await db.value.resetDB()
}
</script>

<style scoped>
</style>