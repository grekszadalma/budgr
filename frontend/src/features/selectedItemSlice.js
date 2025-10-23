
import { createSlice } from '@reduxjs/toolkit';

const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState: {
        item: null,
    },
    reducers: {
        setSelectedItem: (state, action) => {
            state.item = action.payload;
        },
        clearSelectedItem: (state) => {
            state.item = null;
        },
    },
});

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;
