import React from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { map_contact, map_title, map_address }
    from './curriculumSlice';

export default function Header () {
	const title = useSelector(map_title),
          address = useSelector(map_address),
          contact = useSelector(map_contact);

    return (
        <header className="header">
			<h1>{title}</h1>
            <p className="address">
                {ReactHtmlParser(address)}
            </p>
            <ul className="contact">
            {contact && contact.map((con, id) =>
                <li key={id}>
                    <a href={con.link}>
                        <span className={"icon " +
                            con.icon_label}></span>
                        <span className="label">
                            {con.label}</span>
                    </a>
                </li>
            )}
            </ul>
        </header>
    );
}
