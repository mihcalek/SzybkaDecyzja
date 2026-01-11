<script setup lang="ts">
</script>
<template>
  <div class="h-screen w-screen overflow-hidden ">
    <div class="w-full h-32 bg-primary-600 flex items-center justify-center">
      <span class="text-5xl font-bold">Szybka Decyzja</span>
    </div>
    <main class="max-w-7xl h-full overflow-y-auto mx-auto">
      <RouterView/>
    </main>
  </div>
</template>
