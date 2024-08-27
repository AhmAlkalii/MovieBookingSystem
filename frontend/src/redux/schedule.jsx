import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PSchedule_URL = 'https://moviebookingsystem.azurewebsites.net/api/schedule/create';
const Schedule_URL = 'https://moviebookingsystem.azurewebsites.net/api/schedule/';

export const fetchSchedule = createAsyncThunk(
    'schedule/fetchSchedule',
    async (token) => {
        const response = await axios.get(Schedule_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },
);

export const createSchedule = createAsyncThunk(
    'schedule/createSchedule',
    async ({ scheduleData, token }) => {
        const response = await axios.post(PSchedule_URL, scheduleData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
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
    reducers: {
        resetSchedule: (state) => {
            state.schedule = [];
        }
    },

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

export const {resetSchedule} = scheduleSlice.actions;

export const selectAllSchedule = (state) => state.schedule.schedule;
export const getScheduleStatus = (state) => state.schedule.status;
export const getScheduleError = (state) => state.schedule.error;

export default scheduleSlice.reducer;
