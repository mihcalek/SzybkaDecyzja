<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import QuestionListItem from './QuestionListItem.vue'
import type { FormQuestion } from '@/models/form.model.ts'

const questions = ref<FormQuestion[]>([
  {
    id: crypto.randomUUID(),
    type: 'single_select',
    label: '',
    required: true,
    options: ['']
  }
])

const addNewQuestion = () => {
  questions.value.push({
    id: crypto.randomUUID(),
    type: 'single_select',
    label: '',
    required: true,
    options: ['']
  })
}

const removeQuestion = (index: number) => {
  questions.value.splice(index, 1)
}

const getQuestionsData = () => {
  return questions.value
}

defineExpose({ getQuestionsData })
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold">Pytania</h2>
      <span class="text-surface-500 text-sm">{{ questions.length }} pytań</span>
    </div>

    <div v-for="(question, index) in questions" :key="question.id">
      <QuestionListItem
        v-model="questions[index]"
        @remove="removeQuestion(index)"
      />
    </div>

    <Button
      label="Dodaj nowe pytanie"
      icon="pi pi-plus"
      outlined
      class="w-full py-4 border-dashed"
      @click="addNewQuestion"
    />
  </div>
</template>
