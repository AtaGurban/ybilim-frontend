import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getOneCourse } from '../../http/courseApi';
import styles from "./coursePage.module.css";
import Footer from '../../components/Footer/Footer';
import {MoonLoader} from 'react-spinners'


const CoursePage = () => {
    const params = useParams()
    const [course, setCourse] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        (async function(){
            await getOneCourse(params.id).then((data) => setCourse(data)).finally(() => setLoading(false));
        })()
    }, [])

      

    if(loading){
        return (
          <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
          <MoonLoader color="#000000" />
        </div>)
      }
    return (
        <div className='wrapper-all'>
        <div className={`${styles['wrapper']}`}>
            <Navbar/>
            <div>
                <div className={`${styles.header}`}>
                    <h1>{course.name}</h1>
                    <button className={`btn btn-primary ${styles['btn-start']} mt-4`}><Link to={`/stream/${course.video[0]?.id}`}>BAŞLA</Link></button>
                </div>
                <section className={`container`}>
                    <div className={`${styles['section-class']}`}>
                        <h2 className={``}>{course.name}</h2>
                        <hr></hr>
                        {
                            course.video.map((i)=>
                                <div key={i.id} className={`${styles['video']}`}>
                                    <img src={`${process.env.REACT_APP_API_URL}api/static/${i.img}`}/>
                                    <h4><Link to={`/stream/${i.id}`}>{i.name}</Link></h4>
                                </div>
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
            {/* <Footer/> */}
        </div>
    );
};

export default CoursePage;