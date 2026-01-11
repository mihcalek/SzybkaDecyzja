<script setup lang="ts">
import { Card } from 'primevue'
import type { FormSummary } from '@/models/form.model.ts'

defineProps<{form: FormSummary}>();

</script>
<template>
  <Card class="w-full">
    <template #title>
        <div class="flex flex-row justify-between">
          <span class="text-xl group-hover:text-primary-500 transition-colors">
            {{ form.title }}
          </span>
          <span>right</span>
        </div>

    </template>

    <template #content>
      <p class="text-surface-600 dark:text-surface-400 line-clamp-2">
        {{ form.description }}
      </p>
    </template>

    <template #footer>
      <div class="flex justify-between items-center border-t border-surface-100 dark:border-surface-800 pt-4 mt-2">
        <div class="flex items-center gap-2 text-surface-500">
          <i class="pi pi-users text-sm"></i>
          <span class="text-sm">{{ form.number_of_votes }} głosów</span>
        </div>

        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          {{ !form.ongoing || form.has_voted ? 'Zobacz wyniki' : 'Głosuj teraz' }}
          <i class="pi pi-arrow-right text-[10px] ml-1"></i>
        </span>
      </div>
    </template>
  </Card>
</template>
