import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import store from '../../app/store';
import Header from './Header';

import { curriculumActions } from './curriculumSlice';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
});

it('renders a header after ajax succeeds', async () => {
    const curriculum = {
        title: 'some title', address: 'somewhere',
        contacts: [
            {
                link: 'http://bar.cool',
                label: 'bar', icon_label: 'cool'
            },
            {
                link: 'http://another.cool',
                label: 'superbar',
                icon_label: 'nothing'
            }
        ]
    };

    await act(async () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    let h1 = container.querySelector('h1'),
        address = container.querySelector('.address'),
        contact = container.querySelector('.contact');
	expect(h1.innerHTML).toBe('some title');
	expect(address.innerHTML).toBe('somewhere');
    expect(contact.querySelectorAll('li').length).toBe(2);
});

it('renders a header with different value', async () => {
    const curriculum = {
        title: 'another', address: 'under the rainbow',
        contacts: [
            {
                link: 'http://foo.bar',
                label: 'foo', icon_label: 'another'}
        ]
    };

    await act(async () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    let h1 = container.querySelector('h1'),
        address = container.querySelector('.address'),
        contact = container.querySelector('.contact');
	expect(h1.innerHTML).toBe('another');
	expect(address.innerHTML).toBe('under the rainbow');
	expect(contact.querySelectorAll('li').length).toBe(1);
});
