import { configureStore } from '@reduxjs/toolkit';
import curriculumReducer from '../features/curriculum/curriculumSlice';

export default configureStore({
    reducer: {
        'curriculum': curriculumReducer
    },
});
