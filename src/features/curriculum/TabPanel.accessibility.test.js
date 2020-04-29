import React from 'react';
import { render } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import store from '../../app/store';
import TabPanel from './TabPanel';
import { curriculumActions } from './curriculumSlice';

let container;
beforeEach(() => {
    container = document.createElement('div');
});

it('should contain tablist, tab and tabpanel roles (1)',
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
            </Provider>
        , container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const tablist = container.querySelectorAll(
            '*[role="tablist"]'),
          tabs = container.querySelectorAll('*[role="tab"]'),
          panels = container.querySelectorAll(
              '*[role="tabpanel"]');
    expect(tablist.length).toBe(1);
    expect(tabs.length).toBe(1);
    expect(panels.length).toBe(1);
    expect(tabs[0].tabIndex).toBe(0);
    expect(panels[0].getAttribute('aria-hidden'))
                .toBe("true");
});

it('should contain tablist, tab and tabpanel roles (3)',
        async () => {
    const curriculum = {
        sections: [
            { title: 'introduction', headline: 'bar' },
            { title: 'b2', headline: 'a' },
            { title: 'c', headline: 'c' },
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>
        , container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const tablist = container.querySelectorAll(
                '*[role="tablist"]'),
          tabs = container.querySelectorAll('*[role="tab"]'),
          panels = container.querySelectorAll(
                '*[role="tabpanel"]');
    expect(tablist.length).toBe(1);
    expect(tabs.length).toBe(3);
    expect(panels.length).toBe(3);
    expect(tabs[0].tabIndex).toBe(0);
    expect(tabs[1].tabIndex).toBe(-1);
    expect(tabs[2].tabIndex).toBe(-1);
    expect(panels[0].getAttribute('aria-hidden'))
                .toBe("true");
    expect(panels[1].getAttribute('aria-hidden'))
                .toBe("true");
    expect(panels[2].getAttribute('aria-hidden'))
                .toBe("true");
});

it('should, after enter key, activate associated panel',
        async () => {
    const curriculum = {
        sections: [
            { title: 'introduction', headline: 'bar' },
            { title: 'b2', headline: 'a' },
            { title: 'c', headline: 'c' },
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>
        , container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const tabs = container.querySelectorAll(
                '*[role="tab"]'),
          panels = container.querySelectorAll(
                '*[role="tabpanel"]'),
          divs = container.querySelectorAll(
                '.wrapper > div');

    const dispatch_event = async (keyCode, index, hidden, focused) => {
        await act(async () => {
            tabs[index].focus();
            Simulate.keyPress(tabs[index], {
                key: "Enter", keyCode: keyCode,
                which: keyCode});
        });

        tabs.forEach((tab, id) => {
            if (focused === id)
                expect(tab.tabIndex).toBe(0);
            else
                expect(tab.tabIndex).toBe(-1);
        });

        panels.forEach((panel, id) => {
            if (hidden === id)
                expect(panel.getAttribute('aria-hidden'))
                            .toBe("false");
            else
                expect(panel.getAttribute('aria-hidden'))
                            .toBe("true");
        });
        divs.forEach((div, id) => {
            if (hidden === id)
                expect(div.className).toBe('diagonal open');
            else
                expect(div.className).toBe('diagonal');
        });
    };

    await dispatch_event(13, 0, 0, 0);
});
