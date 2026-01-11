import type { FormSummary, FormDetails } from '@/models/form.model';

/**
 * Mock data for the List View (FormSummary)
 */
export const MOCK_FORMS_LIST: FormSummary[] = [
  {
    id: crypto.randomUUID(),
    title: 'Wybór pizzy na piątek',
    description: 'Głosowanie na najlepszą pizzę do biura w nadchodzący piątek.',
    has_voted: true,
    number_of_votes: 12,
    ongoing: true,
    createdAt: '2026-01-05'
  },
  {
    id: crypto.randomUUID(),
    title: 'Satysfakcja z pracy',
    description: 'Anonimowa ankieta dotycząca warunków pracy i atmosfery w zespole.',
    has_voted: false,
    number_of_votes: 45,
    ongoing: true,
    createdAt: '2026-01-08'
  },
  {
    id: crypto.randomUUID(),
    title: 'Wyjazd integracyjny 2026',
    description: 'Ankieta została zamknięta. Wybraliśmy góry!',
    has_voted: true,
    number_of_votes: 28,
    ongoing: false,
    createdAt: '2025-12-15'
  }
];

/**
 * Mock data for the Detailed View (FormDetails)
 */
export const MOCK_FORM_DETAILS: FormDetails = {
  id: crypto.randomUUID(),
  title: 'Satysfakcja z pracy',
  description: 'Prosimy o szczere odpowiedzi. Twoja opinia pomaga nam budować lepsze miejsce pracy.',
  has_voted: false,
  number_of_votes: 45,
  ongoing: true,
  createdAt: '2026-01-08',
  questions: [
    {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'Twoje imię (opcjonalnie)',
      required: false,
      placeholder: 'Wpisz swoje imię...'
    },
    {
      id: crypto.randomUUID(),
      type: 'single_select',
      label: 'Jak oceniasz atmosferę w zespole?',
      required: true,
      options: ['Bardzo dobra', 'Dobra', 'Przeciętna', 'Słaba']
    },
    {
      id: crypto.randomUUID(),
      type: 'multi_select',
      label: 'Z jakich benefitów korzystasz najczęściej?',
      required: true,
      options: ['Karta Multisport', 'Opieka medyczna', 'Kursy językowe', 'Dni owocowe'],
      allowOther: true
    },
    {
      id: crypto.randomUUID(),
      type: 'text',
      label: 'Co możemy poprawić?',
      required: true,
      placeholder: 'Napisz swoją sugestię...',
      minLength: 10
    }
  ]
};
