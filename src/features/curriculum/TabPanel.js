import React from 'react';
import { useSelector } from 'react-redux';

import { map_sections } from './curriculumSlice';

export default function TabPanel () {
    const sections = useSelector(map_sections);

    return (
        <div>
        {sections && sections.map((section, id) =>
            <section className={section.title} key={id}>
                {section.title === 'introduction' &&
                    <h2>{section.headline}</h2>}
                {section.title !== 'introduction' &&
                    <h3>{section.headline}</h3>}
            </section>
        )}
        </div>
    );
}
