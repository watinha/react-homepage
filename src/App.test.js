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
