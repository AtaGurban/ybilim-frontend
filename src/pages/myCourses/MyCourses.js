import React, {useEffect, useState, useContext} from 'react';
import Navbar from '../../components/Navbar';
import { getMyCourse } from '../../http/courseApi';
import styles from './myCourses.module.css'
import { Context } from '../..';
import CourseCard from '../../components/CourseCard/CourseCard';

const MyCourses = () => {
    const [courses, setCourses] = useState([])
    const { user } = useContext(Context) 
    useEffect(()=>{
        (async function(){
            await getMyCourse(user.user.id).then((data) => setCourses(data));
        })()
    }, [] )
    return (
        <div >
            <Navbar/>
            <div className={`${styles['my-courses-title']} c-bold`}><h2>Meniň kurslarym</h2></div>
            <hr/>
            <div className='container'>
                <div className='boxes-card'>
                    {
                        courses.map((i)=>
                            <CourseCard key={i.id} id={i.id} img={i?.course?.img} title={i?.course?.name}/>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default MyCourses;