import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PSchedule_URL = 'http://localhost:3001/api/schedule/create';
const Schedule_URL = 'http://localhost:3001/api/schedule/';

export const fetchSchedule = createAsyncThunk(
    'schedule/fetchSchedule',
    async () => {
        const response = await axios.get(Schedule_URL);
        return response.data;
    },
);

export const createSchedule = createAsyncThunk(
    'schedule/createSchedule',
    async (scheduleData) => {
        const response = await axios.post(PSchedule_URL, scheduleData);
        return response.data.schedule;
    }
);

const initialState = {
    schedule: [], 
    status: 'idle',
    error: null,
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedule.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.schedule = action.payload;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createSchedule.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.schedule.push(action.payload); 
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllSchedule = (state) => state.schedule.schedule;
export const getScheduleStatus = (state) => state.schedule.status;
export const getScheduleError = (state) => state.schedule.error;

export default scheduleSlice.reducer;
