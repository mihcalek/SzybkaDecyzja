<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'primevue'

interface HeaderProps {
  title: string
  description?: string
  backTo?: string
  backLabel?: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
  backTo: 'AllForms',
  backLabel: 'Powrót',
  description: ''
})

const router = useRouter()

const handleBack = () => {
  router.push({ name: props.backTo })
}
</script>
<template>
  <header class="mb-8">
    <Button
      icon="pi pi-arrow-left"
      text
      :label="backLabel"
      @click="handleBack()"
      class="mb-4 p-0"
    />
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-2">{{ title }}</h1>
        <p v-if="description" class="text-surface-600 dark:text-surface-400 text-lg">
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>
