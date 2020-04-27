import React from 'react';
import { useSelector } from 'react-redux';
import { map_loading } from './curriculumSlice';
import './loader.css';

export default function Loader () {
	const loading = useSelector(map_loading);
    return (<div className={loading ? "loader show" : "loader"}></div>);
}
