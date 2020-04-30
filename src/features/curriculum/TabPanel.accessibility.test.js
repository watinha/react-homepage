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
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
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

it('should navigate through eleemnts using keys',
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

    const dispatch_event = async (keyCode,
            key, index, hidden, focused) => {
        await act(async () => {
            tabs[index].focus();
            Simulate.keyDown(tabs[index], {
                key: key, keyCode: keyCode,
                charCode: keyCode,
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

    await dispatch_event(13, 'enter', 0, 0, 0); // enter
    await dispatch_event(40, 'down', 0, 0, 1); // press down
    expect(document.activeElement).toBe(tabs[1]);
    await dispatch_event(39, 'down', 1, 0, 2); // pressright
    expect(document.activeElement).toBe(tabs[2]);
    await dispatch_event(40, 'down', 2, 0, 2); // press down
    expect(document.activeElement).toBe(tabs[2]);
    await dispatch_event(13, 'enter', 2, 2, 2); // enter
    await dispatch_event(38, 'up', 2, 2, 1); // press up
    expect(document.activeElement).toBe(tabs[1]);
    await dispatch_event(37, 'up', 1, 2, 0); // press left
    expect(document.activeElement).toBe(tabs[0]);
    await dispatch_event(38, 'up', 0, 2, 0); // press up
    expect(document.activeElement).toBe(tabs[0]);
    await dispatch_event(13, 'up', 0, 0, 0); // enter

    await dispatch_event(35, 'end', 0, 2, 2); // end
    expect(document.activeElement).toBe(tabs[2]);
    await dispatch_event(34, 'home', 2, 0, 0); // home
    expect(document.activeElement).toBe(tabs[0]);
});
