import { useToast } from 'primevue/usetoast'
import type { FormDetails } from '@/models/form.model'

export function useShare() {
  const toast = useToast()

  const generateShareLink = (form: FormDetails): string => {
    const baseUrl = window.location.origin

    const sharedData = { ...form };

    delete sharedData.creatorToken;
    delete sharedData.user_selections

    sharedData.has_voted = false

    const encodedData = btoa(encodeURIComponent(JSON.stringify(sharedData)))
    return `${baseUrl}/import?data=${encodedData}`
  };

  const copyShareLink = async (form: FormDetails) => {
    const link = generateShareLink(form)

    try {
      await navigator.clipboard.writeText(link);
      toast.add({
        severity: 'success',
        summary: 'Skopiowano',
        detail: 'Link do udostępnienia jest w schowku',
        life: 3000
      });
    } catch {
      toast.add({
        severity: 'error',
        summary: 'Błąd',
        detail: 'Nie udało się skopiować linku',
        life: 3000
      });
    }
  };

  return {
    generateShareLink,
    copyShareLink
  };
}
