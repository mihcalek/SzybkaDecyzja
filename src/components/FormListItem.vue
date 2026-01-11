<script setup lang="ts">
import { Card } from 'primevue'
import type { FormSummary } from '@/models/form.model.ts'

defineProps<{form: FormSummary}>();

</script>
<template>
  <Card>
    <template #title> {{form.title}}</template>
    <template #content>
      {{form.description}}
    </template>
  </Card>
</template>
