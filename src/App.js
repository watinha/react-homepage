import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from './features/curriculum/Header';
import Loader from './features/curriculum/Loader';
import TabPanel from './features/curriculum/TabPanel';
import { loadCurriculum, map_view }
    from './features/curriculum/curriculumSlice';

import './css/files.css';
import './css/files_mobile.css';
import './css/reset.css';
import './css/reset_m.css';

function App() {
    const dispatch = useDispatch(),
          view = useSelector(map_view);

    useEffect(() => {
        dispatch(loadCurriculum());
    });

    return (
        <div className={`App ${view}`}>
            <Loader />
            <Header />
            <hr className="headerLongerLine" />
            <TabPanel />
        </div>
    );
}

export default App;
