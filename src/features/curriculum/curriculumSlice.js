import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CURRICULUM = {
    FILE_CLASS: 'files',
    JSON_URL: './curriculum.json'
};

export const curriculumSlice = createSlice({
    name: 'curriculum',
    initialState: { loading: false, curriculum: {}, view: CURRICULUM.FILE_CLASS },
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
        },
        toggle_view: (state) => {
            state.view = state.view === '' ? CURRICULUM.FILE_CLASS : '';
            return state;
        }
    },
});
export default curriculumSlice.reducer;
export const curriculumActions = curriculumSlice.actions;
export const map_loading = (state) => state.curriculum.loading;
export const map_curriculum = (state) => state.curriculum.curriculum;
export const map_title = (state) => state.curriculum.curriculum.title;
export const map_address = (state) => state.curriculum.curriculum.address;
export const map_contact = (state) => state.curriculum.curriculum.contacts;
export const map_sections = (state) => state.curriculum.curriculum.sections;
export const map_view = (state) => state.curriculum.view;
export const loadCurriculum = () => {
    return async (dispatch) => {
        dispatch(curriculumActions.load_start());
        const response = await axios.get(CURRICULUM.JSON_URL);
		dispatch(curriculumActions.set(response['data']));
        dispatch(curriculumActions.load_end());
    };
};
