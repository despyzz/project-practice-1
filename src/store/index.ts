import { getAnswers } from "./answers/answersSelectors.ts";
import { addAnswer } from "./answers/answersSlice.ts";
import { getCurrentQuestion, getQuestions } from "./questions/questionsSelectors.ts";
import { nextQuestion } from "./questions/questionsSlice.ts";
import {
  AppDispatch,
  RootState,
  store
} from "./store.ts";

export type {
  AppDispatch,
  RootState,
}

export {
  store,
  addAnswer,
  nextQuestion,
  getAnswers,
  getQuestions,
  getCurrentQuestion
}