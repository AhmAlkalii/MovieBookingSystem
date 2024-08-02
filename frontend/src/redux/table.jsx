import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedTime: null,
    selectedDay: null,
};

const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        setSelectedTime(state, action) {
            state.selectedTime = action.payload;
        },
        setSelectedDay(state, action) {
            state.selectedDay = action.payload;
        },
        resetSelection: (state) => {
            state.selectedTime = null;
            state.selectedDay = null;
        }
    },
});

export const { setSelectedTime, setSelectedDay, resetSelection } = selectionSlice.actions;

export const selectSelectedTime = (state) => state.selection.selectedTime;
export const selectSelectedDay = (state) => state.selection.selectedDay;

export default selectionSlice.reducer;
