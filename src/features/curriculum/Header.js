import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './Loader';
import { loadCurriculum, map_title } from './curriculumSlice';

export default function Header () {
	const dispatch = useDispatch(),
          title = useSelector(map_title)

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <header>
            <Loader />
			<h1>{title}</h1>
        </header>
    );
}
