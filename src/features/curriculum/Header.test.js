import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import store from '../../app/store';
import Header from './Header';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
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
                <Header />
            </Provider>, container);
    });

    let loading = container.querySelectorAll('.loader.show');
    expect(loading.length).toBe(1);

    axios.get.mockRestore();
});

it('renders a header and do not show loader ' +
    'after ajax succeeds', async () => {
    const response = Promise.resolve({
        data: {
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
        } });
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>, container);
    });

    let loading = container.querySelectorAll('.loader.show'),
		h1 = container.querySelector('h1'),
        address = container.querySelector('.address'),
        contact = container.querySelector('.contact');
    expect(loading.length).toBe(0);
	expect(h1.innerHTML).toBe('some title');
	expect(address.innerHTML).toBe('somewhere');
    expect(contact.querySelectorAll('li').length).toBe(2);

    axios.get.mockRestore();
});

it('renders a header with different value', async () => {
    const response = Promise.resolve({ data: {
        title: 'another', address: 'under the rainbow',
        contacts: [
            {
                link: 'http://foo.bar',
                label: 'foo', icon_label: 'another'
            }
        ]
    } });
    jest.spyOn(axios, 'get').mockImplementation((url) => {
        expect(url).toBe('./curriculum.json');
        return response;
    });

    await act(async () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>, container);
    });

    let loading = container.querySelectorAll('.loader.show'),
		h1 = container.querySelector('h1'),
        address = container.querySelector('.address'),
        contact = container.querySelector('.contact');
    expect(loading.length).toBe(0);
	expect(h1.innerHTML).toBe('another');
	expect(address.innerHTML).toBe('under the rainbow');
	expect(contact.querySelectorAll('li').length).toBe(1);

    axios.get.mockRestore();
});





