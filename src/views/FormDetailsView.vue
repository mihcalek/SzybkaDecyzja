<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StorageService } from '@/composables/storage.logic'
import type { FormDetails, FormAnswer } from '@/models/form.model'
import {Button, RadioButton, Checkbox, Card, InputText } from 'primevue'

const route = useRoute()
const router = useRouter()

const form = ref<FormDetails | null>(null)
const answers = ref<Record<string, any>>({})
const submitted = ref(false);

onMounted(() => {
  const formId = route.params.id as string;
  const data = StorageService.getFormById(formId)

  if (data) {
    form.value = data;
    data.questions.forEach(q => {
      if (q.type === 'multi_select') answers.value[q.id] = []
      else answers.value[q.id] = ''
    })
  } else {
    router.push({ name: 'AllForms' })
  }
})

const isFormValid = computed(() => {
  if (!form.value) return false
  return form.value.questions.every(q => {
    if (!q.required) return true
    const val = answers.value[q.id]
    return Array.isArray(val) ? val.length > 0 : !!val.trim()
  })
})

const submitVote = () => {
  if (!form.value || !isFormValid.value) return

  // 1. Prepare submission data
  const submission: FormAnswer[] = Object.entries(answers.value).map(([id, value]) => ({
    questionId: id,
    value: value
  }));

  // 2. Update Local Storage (Simulating a backend increment)
  const updatedForm = { ...form.value }
  updatedForm.number_of_votes += 1
  updatedForm.has_voted = true

  // Save updated form back to the list
  StorageService.updateForm(updatedForm)

  submitted.value = true
};
</script>

<template>
  <div class="max-w-3xl mx-auto pb-20 px-4">
    <div v-if="form && !submitted">
      <header class="mb-8">
        <Button
          icon="pi pi-arrow-left"
          text
          label="Powrót"
          @click="router.push({ name: 'AllForms' })"
          class="mb-4 p-0"
        />
        <h1 class="text-4xl font-bold mb-2">{{ form.title }}</h1>
        <p class="text-surface-600 dark:text-surface-400 text-lg">{{ form.description }}</p>
      </header>

      <div class="flex flex-col gap-6">
        <Card v-for="q in form.questions" :key="q.id" class="border border-surface-200 shadow-none">
          <template #title>
            <span class="text-xl">{{ q.label }}</span>
            <span v-if="q.required" class="text-red-500 ml-1">*</span>
          </template>

          <template #content>
            <div v-if="q.type === 'single_select'" class="flex flex-col gap-3">
              <div v-for="opt in q.options" :key="opt" class="flex items-center gap-3">
                <RadioButton v-model="answers[q.id]" :inputId="q.id + opt" :name="q.id" :value="opt" />
                <label :for="q.id + opt" class="cursor-pointer">{{ opt }}</label>
              </div>
            </div>

            <div v-else-if="q.type === 'multi_select'" class="flex flex-col gap-3">
              <div v-for="opt in q.options" :key="opt" class="flex items-center gap-3">
                <Checkbox v-model="answers[q.id]" :inputId="q.id + opt" :name="q.id" :value="opt" />
                <label :for="q.id + opt" class="cursor-pointer">{{ opt }}</label>
              </div>
            </div>

            <div v-else>
              <InputText v-model="answers[q.id]" placeholder="Twoja odpowiedź..." class="w-full" />
            </div>
          </template>
        </Card>

        <Button
          label="Wyślij głosy"
          icon="pi pi-check"
          size="large"
          class="w-full py-4 mt-4"
          :disabled="!isFormValid"
          @click="submitVote"
        />
      </div>
    </div>

    <div v-else-if="submitted" class="text-center py-20 flex flex-col items-center gap-6">
      <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <i class="pi pi-check text-4xl text-green-600"></i>
      </div>
      <h2 class="text-3xl font-bold">Dziękujemy za głos!</h2>
      <p class="text-surface-500 max-w-sm">Twój głos został zapisany lokalnie. Możesz teraz wrócić do listy ankiet.</p>
      <Button label="Wróć do strony głównej" @click="router.push({ name: 'AllForms' })" severity="secondary" />
    </div>
  </div>
</template>
