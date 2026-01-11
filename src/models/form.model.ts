export type QuestionType = 'single_select' | 'multi_select' | 'text';

interface BaseQuestion {
  id: string
  label: string
  required: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: 'text'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'single_select' | 'multi_select'
  options: string[]
  allowOther?: boolean
}

export type FormQuestion = TextQuestion | ChoiceQuestion;

export interface FormSummary {
  id: string
  title: string
  description: string
  has_voted: boolean
  number_of_votes: number
  ongoing: boolean
  createdAt: string | Date
  creatorToken?: string;
}

export interface FormDetails extends FormSummary {
  questions: FormQuestion[]
}

export interface FormAnswer {
  questionId: string
  value: string | string[]
}

export interface FormSubmission {
  formId: string
  answers: FormAnswer[]
  submittedAt: string | Date
}
