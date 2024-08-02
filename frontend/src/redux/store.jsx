import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movie'
import roomReducer from './room'
import scheduleReducer from './schedule'
import selectionReducer from './table'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    room: roomReducer,
    schedule: scheduleReducer,
    selection: selectionReducer,
  },
})    