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

    const main = container.querySelectorAll('div.wrapper'),
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
              'section > .panel');
    expect(sections.length).toBe(1);
    expect(sections[0].className).toBe('introduction');
    expect(h2.length).toBe(1);
    expect(h2[0].innerHTML).toBe('bar');
    expect(section_body.length).toBe(1);

    expect(store.getState().curriculum.view)
            .toBe('files');
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
          hr = container.querySelectorAll('hr'),
          section_body = container.querySelectorAll(
              'section > .panel');
    expect(sections.length).toBe(3);
    expect(sections[0].className).toBe('introduction');
    expect(sections[1].className).toBe('other');
    expect(sections[2].className).toBe('ism');
    expect(h2.length).toBe(3);
    expect(h2[0].innerHTML).toBe('bar');
    expect(h2[1].innerHTML).toBe('nothing');
    expect(h2[2].innerHTML).toBe('integer');
    expect(section_body.length).toBe(3);
    expect(hr.length).toBe(2);

    expect(store.getState().curriculum.view)
            .toBe('files');
});

it('should render set initial style to sections',
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

    const sections = container.querySelectorAll(
            '.wrapper > div');
    expect(sections.length).toBe(3);
    expect(sections[0].style.cssText).toBe(
        "transform: scale(0.73) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 7.7%; margin-top: -4%;");
    expect(sections[1].style.cssText).toBe(
        "transform: scale(0.86) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 10.4%; margin-top: -4%;");
    expect(sections[2].style.cssText).toBe(
        "transform: scale(1) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 13.1%; margin-top: -4%;");
});

it('should change layout presentation after click',
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

    const sections = container.querySelectorAll(
            '.wrapper > div');
    expect(sections.length).toBe(3);

    await act(async () => {
        Simulate.click(sections[0]);
    });

    expect(sections[0].style.cssText).toBe(
        "margin-top: 0px; bottom: -10px;");
    expect(sections[1].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[2].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[0].className).toBe(
        "diagonal open");
    expect(sections[1].className).toBe("diagonal");
    expect(sections[2].className).toBe("diagonal");
});

it('should change layout after click in other element',
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

    const sections = container.querySelectorAll(
            '.wrapper > div');
    expect(sections.length).toBe(3);

    await act(async () => {
        Simulate.click(sections[1]);
    });

    expect(sections[0].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[1].style.cssText).toBe(
        "margin-top: 0px; bottom: 40px;");
    expect(sections[2].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[0].className).toBe("diagonal");
    expect(sections[1].className).toBe(
        "diagonal open");
    expect(sections[2].className).toBe("diagonal");
});

it('should restore standard view after pressing ESC',
        async () => {
    const curriculum = {
        sections: [
            { title: 'introduction', headline: 'bar' },
            { title: 'other', headline: 'nothing' },
            { title: 'ism', headline: 'integer' }
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const sections = container.querySelectorAll(
            '.wrapper > div');
    expect(sections.length).toBe(3);

    await act(async () => {
        Simulate.click(sections[0]);
    });
    await act(async () => {
        Simulate.keyDown(
            sections[0].querySelector('[role="tab"]'),
            {
                keyCode: 27, key: 'esc',
                which: 27, charCode: 27
            });
    });

    expect(sections[0].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(0.73) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 7.7%;");
    expect(sections[1].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(0.86) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 10.4%;");
    expect(sections[2].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(1) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 13.1%;");
    expect(sections[0].className).toBe(
        "");
    expect(sections[1].className).toBe("");
    expect(sections[2].className).toBe("");
});

it('should show print layout after clicking button',
        async () => {
    const curriculum = {
        sections: [
            { title: 'a', headline: 'b' },
            { title: 'other', headline: 'nothing' },
            { title: 'ism', headline: 'integer' }
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
    });

    const sections = container.querySelectorAll(
            '.wrapper > div'),
          print_button = container.querySelectorAll(
            '.wrapper button');

    expect(print_button.length).toBe(1);
    await act(async () => {
        Simulate.click(print_button[0]);
    });

    expect(sections[0].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[1].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[2].style.cssText).toBe(
        "margin-top: 0px;");
    expect(sections[0].className).toBe("");
    expect(sections[1].className).toBe("");
    expect(sections[2].className).toBe("");

    expect(store.getState().curriculum.view)
            .toBe('');
});

it('should show restore standard view after clicking again',
        async () => {
    const curriculum = {
        sections: [
            { title: 'a', headline: 'b' },
            { title: 'other', headline: 'nothing' },
            { title: 'ism', headline: 'integer' }
        ]
    };
    await act(async () => {
        render(
            <Provider store={store}>
                <TabPanel />
            </Provider>, container);
        store.dispatch(curriculumActions.set(curriculum));
        store.dispatch(curriculumActions.toggle_view());
    });

    const sections = container.querySelectorAll(
            '.wrapper > div'),
          print_button = container.querySelectorAll(
            '.wrapper button');

    expect(print_button.length).toBe(1);
    await act(async () => {
        Simulate.click(print_button[0]);
    });
    await act(async () => {
        Simulate.click(print_button[0]);
    });

    expect(sections[0].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(0.73) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 7.7%;");
    expect(sections[1].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(0.86) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 10.4%;");
    expect(sections[2].style.cssText).toBe(
        "margin-top: -4%;" +
        " transform: scale(1) matrix(1, 0, 0, 1, 0, 0);" +
        " left: 13.1%;");
    expect(sections[0].className).toBe("");
    expect(sections[1].className).toBe("");
    expect(sections[2].className).toBe("");

    expect(store.getState().curriculum.view)
            .toBe('files');
});
