<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="min-h-screen w-full bg-surface-100 dark:bg-surface-900">

    <div class="w-full h-24 bg-primary-600 flex items-center justify-center sticky top-0 z-50">
      <span class="text-5xl font-bold text-white">Szybka Decyzja</span>
    </div>

    <main class="max-w-4xl mx-auto pt-12 px-4 pb-32">
      <RouterView/>
    </main>
  </div>

  <Toast />
</template>
