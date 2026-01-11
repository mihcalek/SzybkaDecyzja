<script setup lang="ts">
import FormListItem from '@/components/FormListItem.vue'
import type { FormSummary } from '@/models/form.model.ts'

const mockData = {
  id: 'fjksdhgfsdhjk',
  title: 'title',
  description: 'description',
  number_of_votes: 20,
  ongoing: true,
  createdAt: '2018-02-02',
  has_voted: false,
} as FormSummary
</script>
<template>
  <FormListItem :form="mockData" />
</template>

