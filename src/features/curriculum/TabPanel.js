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

    const reset = () => {
        setView(print_view);
        dispatch(curriculumActions.print_view());
    };

    return (
        <div className="wrapper">

        <button className="layout_switcher"
                onClick={() => reset()}
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
                    <h2>{section.headline}</h2>}
                {section.title !== 'introduction' &&
                    <h3>{section.headline}</h3>}
                <Panel section={section}/>
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
