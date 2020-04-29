import React, { useEffect }  from 'react';
import { useDispatch } from 'react-redux';

import Header from './features/curriculum/Header';
import Loader from './features/curriculum/Loader';
import TabPanel from './features/curriculum/TabPanel';
import { loadCurriculum }
    from './features/curriculum/curriculumSlice';

import './css/files.css';
import './css/files_mobile.css';
import './css/reset.css';
import './css/reset_m.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <div className="App files">
            <Loader />
            <Header />
            <TabPanel />
        </div>
    );
}

export default App;
