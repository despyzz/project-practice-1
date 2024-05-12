export type QuestionFormType = 'selectOne' | 'chooseOne' | 'chooseSome' | 'shortAnswer' | 'detailedAnswer'

export interface Question {
  id: string;
  question: string;
}

export interface QuestionWithAnswers extends Question {
  type: Extract<QuestionFormType, 'selectOne' | 'chooseOne' | 'chooseSome'>
  answers: string[];
}

export interface QuestionWithoutAnswers extends Question {
  type: Extract<QuestionFormType, 'shortAnswer' | 'detailedAnswer'>
}

export interface Answer {
  questionId: string;
  body: unknown;
}