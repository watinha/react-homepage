import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
export const curriculumActions = curriculumSlice.actions;
export const map_loading = (state) => state.curriculum.loading;
export const map_curriculum = (state) => state.curriculum.curriculum;
export const loadCurriculum = () => {
    return async (dispatch) => {
        dispatch(curriculumActions.load_start());
        const response = await axios.get('./curriculum.json');
		dispatch(curriculumActions.set(response['data']));
        dispatch(curriculumActions.load_end());
    };
};