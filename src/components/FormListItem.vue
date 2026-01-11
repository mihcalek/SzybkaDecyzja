<script setup lang="ts">
import { Card, Tag, Button } from 'primevue'
import type { FormSummary, FormDetails } from '@/models/form.model.ts'
import { useShare } from '@/composables/share.logic';
import { StorageService } from '@/composables/storage.logic.ts'

defineProps<{form: FormSummary | FormDetails}>()

const { copyShareLink } = useShare()

const handleShare = (form: FormSummary | FormDetails) => {
  if ('questions' in form) {
    copyShareLink(form);
  } else {
    const fullForm = StorageService.getFormById(form.id)
    if (fullForm) copyShareLink(fullForm)
  }
}

</script>
<template>
  <Card class="w-full border border-surface-200 dark:border-surface-700 shadow-sm">
    <template #title>
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <Tag
            :value="form.ongoing ? 'Aktywna' : 'Zakończona'"
            :severity="form.ongoing ? 'success' : 'secondary'"
            class="uppercase text-[10px]"
          />

          <div class="flex flex-col items-end gap-2">
            <Button
              class="pi pi-share-alt"
              severity="secondary"
              text
              rounded
              @click.stop.prevent="handleShare(form)"
            />
            <div v-if="form.has_voted" class="flex items-center gap-2 text-base text-primary-500">
              <i class="pi pi-check-circle "></i>
              <span class="text-sm">Zagłosowano</span>
            </div>

          </div>
        </div>

        <span class="text-xl group-hover:text-primary-500 font-bold">
          {{ form.title }}
        </span>
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
