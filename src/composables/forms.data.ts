import type { FormSummary, FormDetails } from '@/models/form.model';

/**
 * Deprecated
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
export const MOCK_FORM_DETAILS: FormDetails[] = [
  {
    id: 'b65e6c08-b901-4025-b458-c011dd4f5e5a',
    title: 'Satysfakcja z pracy',
    description: 'Prosimy o szczere odpowiedzi. Twoja opinia pomaga nam budować lepsze miejsce pracy.',
    has_voted: false,
    number_of_votes: 45,
    ongoing: true,
    createdAt: '2026-01-08',
    questions: [
      {
        id: '5f923b01-1bb2-4e5a-93f4-1234567890ab',
        type: 'text',
        label: 'Twoje imię (opcjonalnie)',
        required: false,
        placeholder: 'Wpisz swoje imię...'
      },
      {
        id: '2a8c3d4e-5f6a-7b8c-9d0e-1a2b3c4d5e6f',
        type: 'single_select',
        label: 'Jak oceniasz atmosferę w zespole?',
        required: true,
        options: ['Bardzo dobra', 'Dobra', 'Przeciętna', 'Słaba']
      },
      {
        id: '7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
        type: 'multi_select',
        label: 'Z jakich benefitów korzystasz najczęściej?',
        required: true,
        options: ['Karta Multisport', 'Opieka medyczna', 'Kursy językowe', 'Dni owocowe']
      },
      {
        id: '9b8a7f6e-5d4c-3b2a-1a0b-9c8d7e6f5a4b',
        type: 'text',
        label: 'Co możemy poprawić?',
        required: true,
        placeholder: 'Napisz swoją sugestię...'
      }
    ]
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Wybór pizzy na piątek',
    description: 'Głosowanie na najlepszą pizzę do biura w nadchodzący piątek. Zamawiamy o 12:00!',
    has_voted: false,
    number_of_votes: 12,
    ongoing: true,
    createdAt: '2026-01-05',
    questions: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        type: 'single_select',
        label: 'Z której restauracji zamawiamy?',
        required: true,
        options: ['Pizzeria Mario', 'Bella Napoli', 'Gusto Italiano', 'Dominos']
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        type: 'multi_select',
        label: 'Jakie dodatki wybierasz?',
        required: true,
        options: ['Salami', 'Pieczarki', 'Dodatkowy ser', 'Rukola', 'Oliwki']
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Wyjazd integracyjny 2026',
    description: 'Ankieta została zamknięta. Wybraliśmy góry!',
    has_voted: true,
    number_of_votes: 28,
    ongoing: false,
    createdAt: '2025-12-15',
    questions: [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        type: 'single_select',
        label: 'Preferowany kierunek',
        required: true,
        options: ['Góry', 'Morze', 'Mazury', 'City Break']
      }
    ]
  }
];
