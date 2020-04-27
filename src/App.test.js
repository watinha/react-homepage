import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import store from './app/store';
import App from './App';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
});

it('renders the main element of the component', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>, container);
    expect(container.querySelectorAll('.App').length).toBe(1);
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

it('renders a header and do not show loader after ajax succeeds', async () => {
    const response = Promise.resolve({ data: { title: 'some title' } });
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

    let loading = container.querySelectorAll('.loader.show'),
		h1 = container.querySelector('h1');
    expect(loading.length).toBe(0);
	expect(h1.innerHTML).toBe('some title');

    axios.get.mockRestore();
});

it('renders a header with different value', async () => {
    const response = Promise.resolve({ data: { title: 'another' } });
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

    let loading = container.querySelectorAll('.loader.show'),
		h1 = container.querySelector('h1');
    expect(loading.length).toBe(0);
	expect(h1.innerHTML).toBe('another');

    axios.get.mockRestore();
});





