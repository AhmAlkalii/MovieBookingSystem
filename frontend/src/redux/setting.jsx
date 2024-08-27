import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Settings_URL = 'https://moviebookingsystem.azurewebsites.net/api/schedule/create';


export const updateSettings = createAsyncThunk(
    'settings/updateSettings',
    async ({ settingsInfo, id }) => {
        const response = await axios.put(`https://moviebookingsystem.azurewebsites.net/api/user/${id}`, settingsInfo);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'settings/deleteUser',
    async ({ id }) => {
        const response = await axios.delete(`https://moviebookingsystem.azurewebsites.net/api/user/${id}`);
        return response.data;
    }
)

const initialState = {
    settings: [], 
    status: 'idle',
    error: null,
};

const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(updateSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings.push(action.payload); 
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings.push(action.payload); 
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});


export const setSettings = (state) => state.settings.settings;
export const getSettingsStatus = (state) => state.settings.status;
export const getSettingsError = (state) => state.settings.error;

export default settingSlice.reducer;
