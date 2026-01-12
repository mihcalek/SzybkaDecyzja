<script setup lang="ts">
import { ProgressBar } from 'primevue'

defineProps<{
  label: string,
  count: number,
  total: number,
  isUserSelection: boolean
}>()

const getPercentage = (count: number, total: number) => {
  if (total === 0) return 0
  return Math.round((count / total) * 100)
}
</script>

<template>
  <div class="mb-4">
    <div class="flex justify-between mb-1 text-sm">
      <span :class="{ 'font-bold text-primary-600': isUserSelection }">
        {{ label }} <i v-if="isUserSelection" class="pi pi-check-circle ml-1"></i>
      </span>
      <span class="text-surface-500">{{ count }} głosy ({{ getPercentage(count, total) }}%)</span>
    </div>
    <ProgressBar :value="getPercentage(count, total)" :showValue="false" style="height: 8px" />
  </div>
</template>
