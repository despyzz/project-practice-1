import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Answer} from "types";

export interface AnswersState {
  answers: Answer[];
}

const initialState: AnswersState = {
  answers: []
}

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload)
    }
  },
})

export const {addAnswer} = answersSlice.actions

export default answersSlice.reducer