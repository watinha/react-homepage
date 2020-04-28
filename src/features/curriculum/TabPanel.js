import React from 'react';
import { useSelector } from 'react-redux';

import { map_sections } from './curriculumSlice';
import Panel from './Panel';

export default function TabPanel () {
    const sections = useSelector(map_sections);

    return (
        <div>
        {sections && sections.map((section, id) =>
        <div key={id}>
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
