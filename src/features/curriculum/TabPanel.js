import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { curriculumActions, map_sections }
    from './curriculumSlice';
import Panel from './Panel';

const TABPANEL = {
    ESC_KEY: 27,
    END_KEY: 35,
    HOME_KEY: 36,
    LEFT_KEY: 37,
    UP_KEY: 38,
    RIGHT_KEY:39,
    DOWN_KEY: 40,
    ENTER_KEY: 13,
};

export default function TabPanel () {
    const sections = useSelector(map_sections),
          dispatch = useDispatch(),
          [view, setView] = useState(standard_view),
          [selected, setSelected] = useState(-1),
          [focused, setFocused] = useState(0),
          focusedTab = useRef();

    useEffect(() => {
        if (focusedTab.current)
            focusedTab.current.focus();
    }, [focused]);

    const render_tab = (id, section) => {
        if (id === focused) {
            return (
                <h2 role="tab"
                    tabIndex={id === focused ? 0 : -1}
                    aria-selected={id === selected ?
                        "true" : "false"}
                    aria-expanded={id === selected ?
                        "true" : "false"}
                    aria-controls={`panel_${section.title}`}
                    id={`tab_${section.title}`}
                    ref={focusedTab}
                    onKeyDown={(ev) => navigate(id,ev)}>
                    {section.headline}
                </h2>
            );
        }
        else {
            return (
                <h2 role="tab"
                    tabIndex={id === focused ? 0 : -1}
                    aria-selected={id === selected ?
                        "true" : "false"}
                    aria-expanded={id === selected ?
                        "true" : "false"}
                    aria-controls={`panel_${section.title}`}
                    id={`tab_${section.title}`}
                    onKeyDown={(ev) => navigate(id,ev)}>
                    {section.headline}
                </h2>
            );
        }
    };

    const activate = (id) => {
        setView(diagonal_view);
        setSelected(id);
    };

    const toggle_view = () => {
        if (view === print_view)
            setView(standard_view);
        else
            setView(print_view);
        dispatch(curriculumActions.toggle_view());
    };

    const navigate = (id, ev) => {
        if (ev.keyCode === TABPANEL.ESC_KEY) {
            setView(standard_view);
            setSelected(-1);
        }
        if (ev.keyCode === TABPANEL.ENTER_KEY)
            activate(id);
        if ((ev.keyCode === TABPANEL.RIGHT_KEY ||
             ev.keyCode === TABPANEL.DOWN_KEY) &&
             focused + 1 < sections.length)
            setFocused(focused + 1);
        if ((ev.keyCode === TABPANEL.UP_KEY ||
             ev.keyCode === TABPANEL.LEFT_KEY) &&
             focused - 1 >= 0)
            setFocused(focused - 1);
        if (ev.keyCode === 35) {
            setFocused(sections.length - 1);
            activate(sections.length - 1);
        }
        if (ev.keyCode === 34) {
            setFocused(0);
            activate(0);
        }
    };

    return (
        <div className="wrapper" role="tablist">

        <button className="layout_switcher"
                onClick={() => toggle_view()}
                aria-label="print version">
            <span className="icon reset_layout" />
        </button>

        {sections && sections.map((section, id) =>
        <div key={id}
             className={view.generate_class(id, selected)}
             style={view.generate_style(
                 id, sections.length, selected)}
             onClick={() => activate(id)}>
            <section className={section.title}>
                {render_tab(id, section, selected)}
                <Panel section={section}
                       hidden={selected === id ?
                           "false" : "true"} />
            </section>
            {id < 2 && <hr />}
        </div>
        )}
        </div>
    );
}

const standard_view = (() => {
    return {
        generate_class: (id) => "",
        generate_style: (id, length) => {
            const i = id + 1,
                  left = Math.floor(
                      (5 + i*0.9*3) * 100) / 100,
                  scale = Math.floor(
                      (6+4*(i/length))*10)/100;
            return {
                transform: `scale(${scale}) ` +
                           "matrix(1, 0, 0, 1, 0, 0)",
                left: `${left}%`,
                marginTop: "-4%"
            };
        }
    };
})();

const diagonal_view = (() => {
    return {
        generate_class: (id, selected) =>
            `diagonal${id === selected ? " open" : ""}`,
        generate_style: (id, length, selected) => {
            const bottom = 50 * id - 10;
            if (id === selected)
                return {marginTop: 0, bottom: `${bottom}px`};
            return { marginTop: 0 };
        }
    };
})();

const print_view = (() => {
    return {
        generate_class: () => "",
        generate_style: () => {
            return { marginTop: 0 };
        }
    };
})();
