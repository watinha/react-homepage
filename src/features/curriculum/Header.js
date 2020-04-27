import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import Loader from './Loader';
import { loadCurriculum, map_contact, map_title, map_address } from './curriculumSlice';

export default function Header () {
	const dispatch = useDispatch(),
          title = useSelector(map_title),
          address = useSelector(map_address),
          contact = useSelector(map_contact);

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <header className="header">
            <Loader />
			<h1>{title}</h1>
            <p className="address">{ReactHtmlParser(address)}</p>
            <ul className="contact">
            {contact && contact.map((con, id) => {
                return (
                    <li key={id}>
                        <a href={con.link}>
                            <span className={"icon " + con.icon_label}></span>
                            <span className="label">{con.label}</span>
                        </a>
                    </li>
                );
            })}
            </ul>
        </header>
    );
}
