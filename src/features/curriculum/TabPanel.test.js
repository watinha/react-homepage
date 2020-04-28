import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import store from '../../app/store';
import TabPanel from './TabPanel';
import { curriculumActions } from './curriculumSlice';

let container;
beforeEach(() => {
    container = document.createElement('div');
});

it('should render tab panel component with no sections',
        async () => {
    const curriculum = {
        sections: []
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const main = container.querySelectorAll('div'),
          sections = container.querySelectorAll('section');
    expect(main.length).toBe(1);
    expect(sections.length).toBe(0);
});

it('should render tab panel component with one section',
        async () => {
    const curriculum = {
        sections: [
            {
                title: 'introduction',
                headline: 'bar'
            }
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const sections = container.querySelectorAll('section'),
          h2 = container.querySelectorAll('h2'),
          section_body = container.querySelectorAll(
              'section > .section_body');
    expect(sections.length).toBe(1);
    expect(sections[0].className).toBe('introduction');
    expect(h2.length).toBe(1);
    expect(h2[0].innerHTML).toBe('bar');
    expect(section_body.length).toBe(1);
});

it('should render tab panel component with three section',
        async () => {
    const curriculum = {
        sections: [
            {
                title: 'introduction',
                headline: 'bar'
            },
            {
                title: 'other',
                headline: 'nothing'
            },
            {
                title: 'ism',
                headline: 'integer'
            }
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const sections = container.querySelectorAll('section'),
          h2 = container.querySelectorAll('h2'),
          h3 = container.querySelectorAll('h3'),
          section_body = container.querySelectorAll(
              'section > .section_body');
    expect(sections.length).toBe(3);
    expect(sections[0].className).toBe('introduction');
    expect(sections[1].className).toBe('other');
    expect(sections[2].className).toBe('ism');
    expect(h2.length).toBe(1);
    expect(h2[0].innerHTML).toBe('bar');
    expect(h3.length).toBe(2);
    expect(h3[0].innerHTML).toBe('nothing');
    expect(h3[1].innerHTML).toBe('integer');
    expect(section_body.length).toBe(3);
});
