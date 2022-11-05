import React from 'react';
import Navbar from '../../components/Navbar';
import styles from './myCourses.module.css'

const MyCourses = () => {
    return (
        <div className='container'>
            <Navbar/>
            <div className={`${styles['my-courses-title']} c-bold`}><h2>Meniň kurslarym</h2></div>
            <hr/>
        </div>
    );
};

export default MyCourses;