<script setup lang="ts">
import { Button } from 'primevue';

</script>
<template>
  <div class="flex flex-row justify-between">
    <span class="text-4xl">Ankiety</span>
    <router-link :to="{name:'NewForm'}">
      <Button label="Nowa Ankieta" size="large" />
    </router-link>
  </div>
</template>
