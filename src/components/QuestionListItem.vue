<script setup lang="ts">
import { Card, Select, InputText, Button, RadioButton, Checkbox } from 'primevue'
import type { FormQuestion, QuestionType } from '@/models/form.model.ts'

const model = defineModel<FormQuestion>({ required: true })

defineEmits(['remove'])

const typeOptions = [
  { label: 'Jednokrotny wybór', value: 'single_select', icon: 'pi pi-list' },
  { label: 'Wielokrotny wybór', value: 'multi_select', icon: 'pi pi-check-square' },
  { label: 'Tekst', value: 'text', icon: 'pi pi-align-left' }
]

const addOption = () => {
  if ('options' in model.value) {
    model.value.options.push('')
  }
}

const removeOption = (index: number) => {
  if ('options' in model.value && model.value.options.length > 1) {
    model.value.options.splice(index, 1)
  }
}

const handleTypeChange = (newType: QuestionType) => {
  if (newType === 'text') {
    model.value = { id: model.value.id, label: model.value.label, required: model.value.required, type: 'text' }
  } else {
    model.value = { id: model.value.id, label: model.value.label, required: model.value.required, type: newType, options: [''] }
  }
}
</script>
<template>
  <Card class="border border-surface-200 dark:border-surface-700 shadow-sm relative group/card">
    <template #content>
      <Button
        icon="pi pi-trash"
        severity="danger"
        text
        rounded
        class="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity"
        @click="$emit('remove')"
      />

      <div class="flex flex-col gap-6">
        <div class="flex flex-row gap-4 justify-between items-start">
          <div class="flex-1">
            <label class="block text-sm font-bold mb-2">Treść pytania</label>
            <InputText v-model="model.label" placeholder="Np. Jaki jest Twój ulubiony kolor?" class="w-full" />
          </div>

          <div class="w-64">
            <label class="block text-sm font-bold mb-2">Typ odpowiedzi</label>
            <Select
              :model-value="model.type"
              @update:model-value="handleTypeChange"
              :options="typeOptions"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </div>
        </div>

        <div v-if="model.type !== 'text'" class="flex flex-col gap-3 pl-2">
          <label class="text-sm font-bold">Opcje odpowiedzi</label>
          <div v-for="(_, index) in model.options" :key="index" class="flex items-center gap-3 group">
            <RadioButton v-if="model.type === 'single_select'" disabled />
            <Checkbox v-else disabled />
            <InputText v-model="model.options[index]" :placeholder="'Opcja ' + (index + 1)" class="flex-1 p-inputtext-sm" />
            <Button icon="pi pi-times" severity="danger" text rounded @click="removeOption(index)" v-if="model.options.length > 1" />
          </div>
          <Button label="Dodaj opcję" icon="pi pi-plus" text size="small" class="self-start mt-2" @click="addOption" />
        </div>

        <div v-else class="p-4 bg-surface-50 dark:bg-surface-900 rounded border border-dashed border-surface-300">
          <p class="text-sm text-surface-500 italic text-center">Użytkownik zobaczy pole do wpisania tekstu.</p>
        </div>
      </div>
    </template>
  </Card>
</template>
