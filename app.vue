<template>
  <div>
    <div>
      <h5>dryProcessor:</h5>
      <p> {{ dryProcessor.data }} </p>
    </div>
    <div>
      <h5> wetProcessor:</h5>
      <p>{{ wetProcessor.data }}</p>
    </div>
    <div>
      <h5>db:</h5>
      <p> {{ db.data }}</p>
    </div>

    <button @click="fetchData"> Update Data </button>
    <button @click="reset"> Reset Database </button>

  </div>
</template>

<script setup lang="ts">
import Database from '~/model/Database'
import DataProcessorDry from '~/model/DataProcessorDry'
import DataProcessorWet from '~/model/DataProcessorWet'
import { ref } from 'vue'

const db = ref(Database.getInstance())
const dryProcessor = ref(DataProcessorDry.getInstance())
const wetProcessor = ref(DataProcessorWet.getInstance())

async function fetchData() {
  await db.value.fetchMongo()
  dryProcessor.value.processData()
  wetProcessor.value.processData()
}

async function reset() {
  await db.value.resetDB()
}
</script>

<style scoped>
</style>