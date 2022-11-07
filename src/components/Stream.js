import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOneCourseAndVideo } from '../http/courseApi';
import Navbar from './Navbar';
import { Spinner } from 'react-bootstrap';
import { getOneUsers } from '../http/userAPI';


const Stream = () => {
    const params = useParams();
    const [quality, setQuality] = useState(480)
    const [course, setCourse] = useState({})
    const [nextVideoId, setNextVideoId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [teacher, setTeacher] = useState({})

    useEffect(() => {
      (async function () {
        await getOneCourseAndVideo(params.id).then((data) => {setCourse(data.video); setNextVideoId(data.nextVideoId)}).finally(() => setLoading(false));
        // await getOneUsers(course.course.teacher).then((data) => setTeacher(data))
      })();
    }, [params]);
    
    console.log(course);
    if(loading){
      return (
        <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
        <Spinner animation={'grow'}/>
      </div>)
    }
    
    return (
      <div>
        <Navbar/>
        <div className="wrapper">
          <div className="navigation"><h3>{course.course.name} / {course.name}</h3></div>
          <div className="container container_video">
            <video
              width={1280}
              controls
              controlsList="nodownload"
              autoPlay={true}
              src={`http://localhost:5000/api/video?id=${params.id}&q=${quality}`}
            ></video>
            <div className='mt-4 ms-auto d-flex'>
              <button disabled={quality === 360} onClick={()=>setQuality(360)} className='btn btn-success'>360p</button>
              <button disabled={quality === 480} onClick={()=>setQuality(480)} className='btn btn-warning mx-2'>480p</button>
              <button disabled={quality === 720} onClick={()=>setQuality(720)} className='btn btn-primary'>720p</button>
            </div>
            <div className={nextVideoId ? `video_buttons` :  `d-none video_buttons`}>
                <Link to={`/stream/${nextVideoId}`}>Indiki</Link>
            </div>
            <div className="kesha mb-5">
                <h5><img src="http://localhost:5000/api/static/fd59cf90-5eda-41a7-8cce-142a972e718e.jpg" alt=""/>KESHA REJEPOW</h5>
                <p> Kesha Rejepow birnäçe biznes we marketing programmalarynyñ eýesi, " ýönekeý" hususy kärhanasynyñ direktory, şeyle hem Turkmenistanda adybelli yonekey_com, yonekey_devolopers, yonekey_lomaysowda, yonekeystore online platformalaryny esaslandyjy.</p>
            </div>
            {/* <p>{course.description}</p> */}
          </div>
        </div>
      </div>
    );
};

export default Stream;