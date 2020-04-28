import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Panel from './Panel';

let container;
beforeEach(() => {
    container = document.createElement('div');
});

it('should render paragraph component', async () => {
    const section = {
        title: 'introduction',
        paragraph: 'some paragraph'
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const p = container.querySelectorAll('p');
    expect(p.length).toBe(1);
    expect(p[0].className).toBe('introduction');
    expect(p[0].innerHTML).toBe('some paragraph');
});

it('should render another paragraph component', async () => {
    const section = {
        title: 'introduction2',
        paragraph: 'other paragraph'
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const p = container.querySelectorAll('p');
    expect(p.length).toBe(1);
    expect(p[0].className).toBe('introduction2');
    expect(p[0].innerHTML).toBe('other paragraph');
});

it('should render another paragraph component', async () => {
    const section = {
        title: 'introduction2',
        paragraph: 'other paragraph'
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const p = container.querySelectorAll('p');
    expect(p.length).toBe(1);
    expect(p[0].className).toBe('introduction2');
    expect(p[0].innerHTML).toBe('other paragraph');
});

it('should render a list with descriptions', async () => {
    const section = {
        title: 'profile',
        list: [
            { description: 'description 1' },
            { description: 'description 2' }
        ]
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const li = container.querySelectorAll('li'),
          p = container.querySelectorAll('p');
    expect(p.length).toBe(0);
    expect(li.length).toBe(2);
    expect(li[0].innerHTML).toBe('description 1');
    expect(li[1].innerHTML).toBe('description 2');
});

it('should render another list', async () => {
    const section = {
        title: 'profile',
        list: [
            { description: 'other thins 1' },
            { description: 'iii 2' },
            { description: 'up 2' }
        ]
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const li = container.querySelectorAll('li');
    expect(li.length).toBe(3);
    expect(li[0].innerHTML).toBe('other thins 1');
    expect(li[1].innerHTML).toBe('iii 2');
    expect(li[2].innerHTML).toBe('up 2');
});

it('should render list with HTML tags', async () => {
    const section = {
        title: 'profile',
        list: [
            { description:
                '<a href=\"#\">other thins 1</a>' },
            { description: '<span>iii 2</span>' },
            { description: 'up 2' }
        ]
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const li = container.querySelectorAll('li');
    expect(li.length).toBe(3);
    expect(li[0].innerHTML).toBe(
        '<a href=\"#\">other thins 1</a>');
    expect(li[1].innerHTML).toBe('<span>iii 2</span>');
    expect(li[2].innerHTML).toBe('up 2');
});

it('should render expertises', async () => {
    const section = {
        title: 'profile',
        technologies: {
            headline: 'some',
            list: [
                { description: 'yii' },
                { description: 'php 2' },
                { description: 'cobol 3' }
            ]
        },
        programming: {
            headline: 'tempo',
            list: [
                { description: 'pair' }
            ]
        }
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const columns = container.querySelectorAll('.columns'),
          h4 = container.querySelectorAll('h4'),
          li = container.querySelectorAll('li');
    expect(columns.length).toBe(2);
    expect(h4.length).toBe(2);
    expect(h4[0].innerHTML).toBe('some');
    expect(h4[1].innerHTML).toBe('tempo');
    expect(li.length).toBe(4);
});

it('should render other expertises', async () => {
    const section = {
        title: 'profile',
        technologies: {
            headline: 'baz',
            list: [
                { description: 'c++' },
                { description: 'ruby' }
            ]
        },
        programming: {
            headline: 'tmp',
            list: [
                { description: 'tdd' },
                { description: 'bdd' },
                { description: 'ci' }
            ]
        }
    };
    await act(async () => {
        render(<Panel section={section} />, container);
    });

    const columns = container.querySelectorAll('.columns'),
          h4 = container.querySelectorAll('h4'),
          li = container.querySelectorAll('li');
    expect(columns.length).toBe(2);
    expect(h4.length).toBe(2);
    expect(h4[0].innerHTML).toBe('baz');
    expect(h4[1].innerHTML).toBe('tmp');
    expect(li.length).toBe(5);
});
