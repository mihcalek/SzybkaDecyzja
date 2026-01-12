<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import QuestionList from '@/components/QuestionList.vue';
import { StorageService } from '@/composables/storage.logic';
import { SecretService } from '@/composables/secret.logic.ts'
import PageHeader from '@/components/PageHeader.vue'

const router = useRouter()

const title = ref('')
const description = ref('')

const questionListRef = ref<InstanceType<typeof QuestionList> | null>(null)

const handlePublish = () => {
  const questions = questionListRef.value?.getQuestionsData()
  const formId = crypto.randomUUID()

  const newForm = {
    id: formId,
    title: title.value,
    creatorToken: SecretService.generateOwnershipToken(formId),
    description: description.value,
    questions: questions || [],
    ongoing: true,
    has_voted: false,
    number_of_votes: 0,
    createdAt: new Date().toISOString()
  }

  StorageService.saveForm(newForm)
  router.push({
    name: 'FormDetails',
    params: { id: formId }
  })
};
</script>

<template>
  <div class="max-w-4xl mx-auto pb-20">

    <PageHeader title="Nowa ankieta" description="Stwórz nową ankietę, dodając pytania i opcje." />

    <div class="flex flex-col gap-8">
      <section class="flex flex-col gap-4 p-6 bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl">
        <div class="flex flex-col gap-2">
          <label class="font-bold text-sm">Tytuł ankiety</label>
          <InputText v-model="title" placeholder="Np. Wybór terminu wigilii" class="w-full text-lg" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-bold text-sm">Opis (opcjonalnie)</label>
          <Textarea v-model="description" rows="2" placeholder="Krótki opis celu ankiety..." class="w-full" />
        </div>
      </section>

      <QuestionList ref="questionListRef" />

      <div class="flex justify-end gap-3 mt-4">
<!--        <Button label="Anuluj" severity="secondary" text @click="router.push({ name: 'AllForms' })" />-->
        <Button
          label="Opublikuj ankietę"
          icon="pi pi-send"
          @click="handlePublish"
          :disabled="!title.trim()"
        />
      </div>
    </div>
  </div>
</template>
