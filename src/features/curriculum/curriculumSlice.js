import { createSlice } from '@reduxjs/toolkit';

export const curriculumSlice = createSlice({
    name: 'curriculum',
    initialState: { loading: false, curriculum: {} },
    reducers: {
        load_start: (state, action) => {
            state.loading = true;
            return state;
        },
        load_end: (state, action) => {
            state.loading = false;
            return state;
        },
        set: (state, action) => {
            state.curriculum = action.payload;
            return state;
        }
    },
});
export default curriculumSlice.reducer;
