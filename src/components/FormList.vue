<script setup lang="ts">
import FormListItem from '@/components/FormListItem.vue'
import type { FormSummary } from '@/models/form.model.ts'
import { MOCK_FORMS_LIST } from '@/composables/forms.data.ts'

const data = MOCK_FORMS_LIST as FormSummary[]


</script>
<template>
  <div class="flex flex-col items-center gap-4">
    <router-link
      v-for="item in data"
      :key="item.id"
      :to="{ name: 'FormDetails', params: { id: item.id } }"
      class="no-underline block w-full hover:shadow-lg hover:-translate-y-1 border-transparent hover:border-primary-400"
    >
      <FormListItem :form="item" />
    </router-link>
  </div>

</template>

