import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './Loader';
import { loadCurriculum, map_curriculum } from './features/curriculum/curriculumSlice';
import './css/files.css';
import './css/files_mobile.css';
import './css/reset.css';
import './css/reset_m.css';

function App() {
	const dispatch = useDispatch(),
		  curriculum = useSelector(map_curriculum),
          title = curriculum.title ? curriculum.title : '';

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <div className="App">
            <Loader />
			<h1>{curriculum.title}</h1>
        </div>
    );
}

export default App;
