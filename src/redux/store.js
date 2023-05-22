import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './filter/slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})