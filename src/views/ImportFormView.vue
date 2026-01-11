<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StorageService } from '@/composables/storage.logic'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'

const route = useRoute()
const router = useRouter()
const error = ref<string | null>(null)

onMounted(() => {
  const encodedData = route.query.data as string

  if (!encodedData) {
    error.value = 'Nie znaleziono danych do zaimportowania.'
    return;
  }

  try {
    const decodedString = decodeURIComponent(atob(encodedData))
    const formData = JSON.parse(decodedString)

    if (!formData.id || !formData.title) {
      throw new Error('Nieprawidłowy format ankiety.')
    }

    StorageService.saveForm(formData)

    router.push({ name: 'FormDetails', params: { id: formData.id } })

  } catch (e) {
    console.error('Import Error:', e)
    error.value = 'Wystąpił błąd podczas importowania ankiety. Upewnij się, że link jest poprawny.'
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] gap-4">
    <div v-if="!error" class="text-center">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
      <p class="text-surface-500 mt-4">Importowanie ankiety...</p>
    </div>

    <div v-else class="max-w-md w-full">
      <Message severity="error" icon="pi pi-exclamation-triangle">
        {{ error }}
      </Message>
      <div class="flex justify-center mt-4">
        <Button label="Wróć do strony głównej" @click="router.push('/')" text />
      </div>
    </div>
  </div>
</template>
