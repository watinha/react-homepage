import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { map_sections } from './curriculumSlice';
import Panel from './Panel';

export default function TabPanel () {
    const sections = useSelector(map_sections),
          [diagonal, setDiagonal] = useState(false),
          [selected, setSelected] = useState(-1);

    const generate_style = (id, length) => {
        const bottom = 50 * id - 10;
        if (diagonal && id === selected)
            return { marginTop: 0, bottom: `${bottom}px`};
        if (diagonal) return { marginTop: 0 };

        const i = id + 1,
              left = Math.floor((5 + i*0.9*3) * 100) / 100,
              scale = Math.floor((6+4*(i/length))*10)/100;
        return {
            transform: `scale(${scale}) ` +
                       "matrix(1, 0, 0, 1, 0, 0)",
            left: `${left}%`,
            marginTop: "-4%"
        };
    };

    const generate_class = (id) =>
        `${diagonal && "diagonal"}` +
        `${id === selected ? " open" : ""}`;

    const activate = (id) => {
        setDiagonal(true);
        setSelected(id);
    };

    return (
        <div className="wrapper">
        {sections && sections.map((section, id) =>
        <div key={id}
             className={generate_class(id)}
             style={generate_style(id, sections.length)}
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
