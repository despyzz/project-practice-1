import {RootState} from "../store.ts";
import {QuestionWithAnswers, QuestionWithoutAnswers} from "types";

export const getQuestions = (state: RootState): Array<QuestionWithAnswers | QuestionWithoutAnswers> => {
  return state.questions.questions;
}

export const getCurrentQuestion = (state: RootState) => {
  return state.questions.currentQuestion;
}