import { createSlice } from '@reduxjs/toolkit'
import {QuestionWithAnswers, QuestionWithoutAnswers} from "types";

export interface QuestionsState {
  questions: Array<QuestionWithAnswers | QuestionWithoutAnswers>;
  currentQuestion: number;
}

const initialState: QuestionsState = {
  questions: [
    {
      id: '1',
      type: "selectOne",
      question: "Какого цвета банан?",
      answers: [
        'Синий',
        'Зеленый',
        'Желтый',
        'Красный',
      ]
    },
    {
      id: '2',
      type: "chooseOne",
      question: "Какая планета самая большая в солнечной системе?",
      answers: [
        'Марс',
        'Юпитер',
        'Венера',
        'Земля',
      ]
    },
    {
      id: '3',
      type: "chooseSome",
      question: "Какие ваши любимые фрукты?",
      answers: [
        'Яблоки',
        'Бананы',
        'Апельсины',
        'Киви',
        'Груши',
        'Ананасы',
      ]
    },
    {
      id: '4',
      type: "shortAnswer",
      question: "Зимой и летом одним цветом. Что это?",
    },
    {
      id: '5',
      type: "detailedAnswer",
      question: "Для чего, на ваш взгляд, нужно получать высшее образование?",
    }
  ],
  currentQuestion: 0,
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      state.currentQuestion += 1
    }
  },
})

export const { nextQuestion } = questionsSlice.actions

export default questionsSlice.reducer