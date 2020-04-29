import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { act, Simulate } from 'react-dom/test-utils';
import axios from 'axios';
import store from './app/store';
import App from './App';
import { curriculumActions }
    from './features/curriculum/curriculumSlice';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
});

it('renders the main element of the component', async () => {
    const response = new Promise(() => {});
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });
    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>, container);
    });
    expect(container.querySelectorAll('.App.files').length)
        .toBe(1);
    expect(container.querySelectorAll(
            '.files[role="main"]').length).toBe(1);
    expect(container.querySelectorAll('header').length)
        .toBe(1);
});

it('renders a loader as ajax is started', async () => {
    const response = new Promise(() => {});
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    act(() => {
        render(
            <Provider store={store}>
                <App />
            </Provider>, container);
    });

    let loading = container.querySelectorAll('.loader.show');
    expect(loading.length).toBe(1);

    axios.get.mockRestore();
});

it('renders do not show loader ' +
    'after ajax succeeds', async () => {
    const response = Promise.resolve({
        data: {
        } });
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>, container);
    });

    let loading = container.querySelectorAll('.loader.show');
    expect(loading.length).toBe(0);

    axios.get.mockRestore();
});

it('renders show title and sections', async () => {
    const response = Promise.resolve({
        data: {
            title: 'abobrinha - super',
            sections: [
                { headline: 'legal', title: 'outra' } ]
        } });
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>, container);
    });

    let main = container.innerHTML;
    expect(main.search('abobrinha - super'))
        .toBeGreaterThan(0)
    expect(main.search('legal'))
        .toBeGreaterThan(0)
    expect(main.search('outra'))
        .toBeGreaterThan(0)
    axios.get.mockRestore();
});

it('changes view depending on view state', async () => {
    const response = Promise.resolve({
        data: {
        } });
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>, container);
        store.dispatch(curriculumActions.toggle_view());
    });

    let div = container.querySelector('div');
    expect(div.className).toBe('App ');

    axios.get.mockRestore();
});
