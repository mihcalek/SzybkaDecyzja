<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { StorageService } from '@/composables/storage.logic'
import type { FormDetails } from '@/models/form.model'
import {Button, RadioButton, Checkbox, Card, InputText, ProgressBar } from 'primevue'
import PageHeader from '@/components/PageHeader.vue'
import { SecretService } from '@/composables/secret.logic.ts'
import { useShare } from '@/composables/share.logic'

const route = useRoute()
const router = useRouter()
const { copyShareLink } = useShare()

const form = ref<FormDetails | null>(null)
const answers = ref<Record<string, any>>({})
const submitted = ref(false);

onMounted(() => {
  const formId = route.params.id as string;
  const data = StorageService.getFormById(formId)

  if (data) {
    form.value = data;

    if (data.has_voted && data.user_selections) {
      answers.value = data.user_selections
    } else {
      data.questions.forEach(q => {
        if (q.type === 'multi_select') answers.value[q.id] = []
        else answers.value[q.id] = ''
      })
    }
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

function submitVote() {
  if (!form.value || !isFormValid.value) return

  const updatedForm = { ...form.value }

  updatedForm.number_of_votes += 1
  updatedForm.has_voted = true
  updatedForm.user_selections = JSON.parse(JSON.stringify(answers.value))

  updatedForm.questions.forEach((q) => {
    if (q.type === 'single_select' || q.type === 'multi_select') {
      if (!q.results) q.results = {}

      const selection = answers.value[q.id]

      if (q.type === 'single_select' && selection) {
        q.results[selection] = (q.results[selection] || 0) + 1
      }
      else if (q.type === 'multi_select' && Array.isArray(selection)) {
        selection.forEach(opt => {
          q.results![opt] = (q.results![opt] || 0) + 1
        })
      }
    }
  })

  StorageService.updateForm(updatedForm)

  if (isOwner.value) form.value = updatedForm
  else submitted.value = true
}

const isReadOnly = computed(() => {
  return form.value?.has_voted || !form.value?.ongoing
})

const isOwner = computed(() => {
  if (!form.value) return false
  return SecretService.verifyOwnership(form.value.id, form.value.creatorToken)
})

const handleClosePoll = () => {
  if (!form.value) return
  form.value.ongoing = false
  StorageService.updateForm(form.value)
}

const handleShare = () => {
  if (form.value) {
    copyShareLink(form.value)
  }
}

const checkIfSelected = (questionId: string, option: string): boolean => {
  const val = answers.value[questionId]
  if (!val) return false

  if (Array.isArray(val)) {
    return val.includes(option)
  }

  return val === option
};
</script>

<template>
  <div v-if="form" class="max-w-3xl mx-auto pb-20 px-4">
    <PageHeader :title="form.title" :description="form.description">
      <template #actions>
        <Button
          icon="pi pi-share-alt"
          severity="secondary"
          outlined
          v-tooltip.top="'Kopiuj link do ankiety'"
          @click="handleShare"
        />
        <Button
          v-if="isOwner && form.ongoing"
          label="Zakończ ankietę"
          icon="pi pi-lock"
          severity="warning"
          outlined
          @click="handleClosePoll"
        />
      </template>
    </PageHeader>

    <div v-if="isReadOnly && !submitted" class="mb-6 p-4 bg-surface-100 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 flex items-center gap-3">
      <i class="pi pi-info-circle text-surface-500"></i>
      <span class="text-surface-600 dark:text-surface-400">
        {{ !form.ongoing ? 'Ta ankieta jest już zakończona.' : 'Już oddałeś głos w tej ankiecie.' }}
      </span>
    </div>

    <div v-if="!submitted" class="flex flex-col gap-6" :class="{ 'opacity-70 pointer-events-none select-none': isReadOnly }">
      <Card v-for="q in form.questions" :key="q.id" class="border border-surface-200 shadow-none">
        <template #title>
          <span class="text-xl">{{ q.label }}</span>
          <span v-if="q.required && !isReadOnly" class="text-red-500 ml-1">*</span>
        </template>
        <template #content>
          <div v-if="isReadOnly && (q.type === 'single_select' || q.type === 'multi_select')">
            <div v-for="opt in q.options" :key="opt" class="mb-4">
              <div class="flex justify-between mb-1 text-sm">

                <span :class="{ 'font-bold text-primary-600': checkIfSelected(q.id, opt) }">
                  {{ opt }}
                  <i v-if="checkIfSelected(q.id, opt)" class="pi pi-check-circle ml-1"></i>
                </span>
                <span class="text-surface-500">
                  {{ q.results?.[opt] || 0 }} głosów
                </span>
              </div>

              <ProgressBar
                :value="((q.results?.[opt] || 0) / form.number_of_votes) * 100"
                :showValue="false"
                style="height: 8px"
              />
            </div>


          </div>

          <div v-if="q.type === 'single_select'" class="flex flex-col gap-3">
            <div v-for="opt in (q as any).options" :key="opt" class="flex items-center gap-3">
              <RadioButton
                v-model="answers[q.id]"
                :inputId="q.id + opt"
                :name="q.id"
                :value="opt"
                :disabled="isReadOnly"
              />
              <label
                :for="q.id + opt"
                class="cursor-pointer"
                :class="{ 'font-bold text-primary-600': isReadOnly && answers[q.id] === opt }"
              >
                {{ opt }}
              </label>
            </div>
          </div>

          <div v-else-if="q.type === 'multi_select'" class="flex flex-col gap-3">
            <div v-for="opt in (q as any).options" :key="opt" class="flex items-center gap-3">
              <Checkbox
                v-model="answers[q.id]"
                :inputId="q.id + opt"
                :name="q.id"
                :value="opt"
                :disabled="isReadOnly"
              />
              <label
                :for="q.id + opt"
                class="cursor-pointer"
                :class="{ 'font-bold text-primary-600': isReadOnly && answers[q.id]?.includes(opt) }"
              >
                {{ opt }}
              </label>
            </div>
          </div>

          <div v-else>
            <InputText
              v-model="answers[q.id]"
              :placeholder="isReadOnly ? (answers[q.id] || 'Brak odpowiedzi') : 'Twoja odpowiedź...'"
              class="w-full"
              :disabled="isReadOnly"
              :class="{ 'font-bold text-primary-600': isReadOnly && answers[q.id] }"
            />
          </div>
        </template>
      </Card>

      <Button
        v-if="!isReadOnly"
        label="Wyślij głosy"
        icon="pi pi-check"
        size="large"
        class="w-full py-4 mt-4"
        :disabled="!isFormValid"
        @click="submitVote"
      />

<!--      <Button-->
<!--        v-else-->
<!--        label="Wróć do listy"-->
<!--        icon="pi pi-arrow-left"-->
<!--        severity="secondary"-->
<!--        variant="text"-->
<!--        @click="router.push({ name: 'AllForms' })"-->
<!--      />-->
    </div>

    <div v-else class="text-center py-20 flex flex-col items-center gap-6">
      <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <i class="pi pi-check text-4xl text-green-600"></i>
      </div>
      <h2 class="text-3xl font-bold">Dziękujemy za głos!</h2>
      <p class="text-surface-500 max-w-sm">Twój głos został zapisany lokalnie.</p>
      <Button label="Wróć do strony głównej" @click="router.push({ name: 'AllForms' })" severity="secondary" />
    </div>
  </div>
</template>
