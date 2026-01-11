import type { FormDetails, FormSummary } from '@/models/form.model'
import { MOCK_FORM_DETAILS} from '@/composables/forms.data.ts'

const FORMS_KEY = 'szybka_decyzja_forms'

export const StorageService = {
  saveForm(newForm: FormDetails): void {
    const existingForms = this.getForms()

    const exists = existingForms.some(f => f.id === newForm.id)

    if (!exists) {
      existingForms.push(newForm)
      localStorage.setItem(FORMS_KEY, JSON.stringify(existingForms))
    }
  },

  getForms(): FormDetails[] {
    const data = localStorage.getItem(FORMS_KEY);
    const localForms: FormDetails[] = data ? JSON.parse(data) : []

    const localIds = localForms.map(f => f.id);

    const filteredMocks = MOCK_FORM_DETAILS.filter(mock => !localIds.includes(mock.id))

    return [...localForms, ...filteredMocks]
  },

  getFormSummaries(): FormSummary[] {
    return this.getForms().map((form) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { questions, ...summary } = form
      return summary as FormSummary
    })
  },

  getFormById(id: string): FormDetails | undefined {
    return this.getForms().find(f => f.id === id)
  },

  updateForm(updatedForm: FormDetails): void {
    const data = localStorage.getItem(FORMS_KEY);
    const localForms: FormDetails[] = data ? JSON.parse(data) : [];

    const index = localForms.findIndex(f => f.id === updatedForm.id);

    if (index !== -1) {
      localForms[index] = updatedForm;
    } else {
      localForms.push(updatedForm);
    }
    localStorage.setItem(FORMS_KEY, JSON.stringify(localForms));
  }
}
