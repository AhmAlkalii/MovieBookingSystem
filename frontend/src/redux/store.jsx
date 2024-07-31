import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movie'
import roomReducer from './room'


export const store = configureStore({
  reducer: {
    movies: movieReducer,
    room: roomReducer
  },
})