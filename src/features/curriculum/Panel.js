import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default function Panel (props) {
    const section = props.section,
          hidden = props.hidden;

    const renderList = (list) =>
        <ul>
        {section.list.map((item, id) =>
            <li key={id}>
                {ReactHtmlParser(item.description)}
            </li>)}
        </ul>;

    const renderExpertises = (section) =>
        <div>
            <div className="columns">
                <h4>{section.technologies.headline}</h4>
                <ul>
                {section.technologies.list.map((tech, id) =>
                    <li key={id}>{tech.description}</li>)}
                </ul>
            </div>
            <div className="columns">
                <h4>{section.programming.headline}</h4>
                <ul>
                {section.programming.list.map((prog, id) =>
                    <li key={id}>{prog.description}</li>)}
                </ul>
            </div>
        </div>;

    return (
        <div className="panel" role="tabpanel"
             aria-hidden={hidden}
             aria-labelledby={`tab_${section.title}`}
             id={`panel_${section.title}`}>
            {section.paragraph &&
                <p className={section.title}>
                {section.paragraph}</p>}
            {section.list && renderList(section.list)}
            {section.technologies &&
                renderExpertises(section)}
        </div>
    );
}
