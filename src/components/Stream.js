import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneCourse } from '../http/courseApi';


const Stream = () => {
    const params = useParams();
    const [quality, setQuality] = useState(360)
    const [course, setCourse] = useState({})
    useEffect(() => {
      (async function () {
        await getOneCourse(params.id).then((data) => setCourse(data));
      })();
    }, [params]);
    return (
      <div>
        <div className="wrapper">
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
            <h1>{course?.name}</h1>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    );
};

export default Stream;