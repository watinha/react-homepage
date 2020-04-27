import curriculumReducer, { curriculumSlice } from './curriculumSlice';

it('should update loading state to true', () => {
    const result = curriculumReducer({ loading: false }, { type: 'curriculum/load_start' });
    expect(result.loading).toBe(true);
});

it('should update loading state to false', () => {
    const result = curriculumReducer({ loading: true }, { type: 'curriculum/load_end' });
    expect(result.loading).toBe(false);
});

it('should update the curriculum state', () => {
    const result = curriculumReducer({ curriculum: {} }, { type: 'curriculum/set', payload: 'something' });
    expect(result.curriculum).toBe('something');
});

it('should update the curriculum state', () => {
    const result = curriculumReducer({ curriculum: {} }, { type: 'curriculum/set', payload: 'another' });
    expect(result.curriculum).toBe('another');
});
