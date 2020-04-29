import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { curriculumActions, map_sections }
    from './curriculumSlice';
import Panel from './Panel';

export default function TabPanel () {
    const sections = useSelector(map_sections),
          dispatch = useDispatch(),
          [view, setView] = useState(standard_view),
          [selected, setSelected] = useState(-1);

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
                {section.title === 'introduction' &&
                    <h2 role="tab"
                        tabIndex={id === 0 ? 0 : -1}
                        onKeyPress={() => activate(id)}>
                        {section.headline}
                    </h2>}
                {section.title !== 'introduction' &&
                    <h3 role="tab"
                        tabIndex={id === 0 ? 0 : -1}
                        onKeyPress={() => activate(id)}>
                        {section.headline}
                    </h3>}
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
