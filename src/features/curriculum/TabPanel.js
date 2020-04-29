import React from 'react';
import { useSelector } from 'react-redux';

import { map_sections } from './curriculumSlice';
import Panel from './Panel';

export default function TabPanel () {
    const sections = useSelector(map_sections);

    const generate_style = (id, length) => {
        const i = id + 1,
              left = Math.floor((5 + i*0.9*3) * 100) / 100,
              scale = Math.floor((6+4*(i/length))*10)/100;
        return {
            transform: `scale(${scale}) ` +
                       "matrix(1, 0, 0, 1, 0, 0)",
            left: `${left}%`,
            marginTop: "-4%"
        };
    }

    return (
        <div className="wrapper">
        {sections && sections.map((section, id) =>
        <div key={id}
             style={generate_style(id, sections.length)}>
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
