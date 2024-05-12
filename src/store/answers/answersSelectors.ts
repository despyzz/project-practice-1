import {RootState} from "../store.ts";

export const getAnswers = (state: RootState) => {
  return state.answers.answers;
}