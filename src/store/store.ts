import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from "./questions/questionsSlice.ts";
import answersReducer from "./answers/answersSlice.ts";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    answers: answersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch