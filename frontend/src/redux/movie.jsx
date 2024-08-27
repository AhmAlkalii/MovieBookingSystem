import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Movie_URL = 'http://localhost:3001/movies';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get(Movie_URL);
    return response.data;
  },
);

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchMovies.pending, (state) => {
    state.status = 'loading';
    })
    .addCase(fetchMovies.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.movies = action.payload;
    })
    .addCase(fetchMovies.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
    });
  },
});


export const selectAllMovies = (state) => state.movies.movies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;

export default movieSlice.reducer;