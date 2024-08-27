import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const Room_URL = 'http://localhost:3001/rooms'



export const fetchRoom = createAsyncThunk(
  'room/fetchRoom',
  async () => {
    const response = await axios.get(Room_URL);
    return response.data.randomRoom;
  },
);

const initialState = {
  room: null,
  status: 'idle',
  error: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchRoom.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.room = action.payload;
    })
    .addCase(fetchRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    });
  },
});


export const selectRoom = (state) => state.room.room;
export const getRoomStatus = (state) => state.room.status;
export const getRoomError = (state) => state.room.error;

export default roomSlice.reducer;