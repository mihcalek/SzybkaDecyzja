import type { FormDetails, FormSummary } from '@/models/form.model';

const FORMS_KEY = 'szybka_decyzja_forms';

export const StorageService = {
  saveForm(newForm: FormDetails): void {
    const existingForms = this.getForms()
    existingForms.push(newForm);
    localStorage.setItem(FORMS_KEY, JSON.stringify(existingForms))
  },

  getForms(): FormDetails[] {
    const data = localStorage.getItem(FORMS_KEY)
    return data ? JSON.parse(data) : []
  },

  getFormSummaries(): FormSummary[] {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return this.getForms().map(({ questions, ...summary }) => summary)
  },

  getFormById(id: string): FormDetails | undefined {
    return this.getForms().find(f => f.id === id)
  }
};
