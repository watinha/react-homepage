import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
});

it('renders a header with main information', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>, container);
    expect(container.querySelector('h1')).toBe(null);
});
