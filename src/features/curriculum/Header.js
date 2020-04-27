import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './Loader';
import { loadCurriculum, map_title, map_address } from './curriculumSlice';

export default function Header () {
	const dispatch = useDispatch(),
          title = useSelector(map_title),
          address = useSelector(map_address);

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <header className="header">
            <Loader />
			<h1>{title}</h1>
            <p className="address">{address}</p>
        </header>
    );
}
