import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFilesByVideoId, getOneCourseAndVideo } from '../http/courseApi';
import Navbar from './Navbar';
import Footer from './Footer/Footer';
import { MoonLoader } from 'react-spinners'


const Stream = () => {
  const params = useParams();
  const [quality, setQuality] = useState(480)
  const [course, setCourse] = useState({})
  const [files, setFiles] = useState([])
  const [nextVideoId, setNextVideoId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState({})

  useEffect(() => {
    (async function () {
      await getOneCourseAndVideo(params.id).then((data) => { setCourse(data.video); setNextVideoId(data.nextVideoId); setTeacher(data.teacher) }).finally(() => setLoading(false));
      await getFilesByVideoId(params.id).then((data) => { setFiles(data) })
    })();
  }, [params]);

  if (loading) {
    return (
      <div style={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }} className='d-flex'>
        <MoonLoader color="#000000" />
      </div>)
  }
  console.log(files);
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="navigation"><h3>{course.course.name} / {course.name}</h3></div>
        <div className="container container_video">
          <video
            controls
            autoPlay
            loop
            muted
            playsInline
            className='video-player'
            controlsList="nodownload"
            src={`${process.env.REACT_APP_API_URL}api/video?id=${params.id}&q=${quality}`}
            type='video/mp4'
          >
          </video>
          <div className='d-flex mt-4 justify-content-center justify-content-md-between w-100 flex-wrap'>
            <div className='d-flex align-items-center justify-content-start mb-3'>
              <button disabled={quality === 360} onClick={() => setQuality(360)} className='btn btn-success'>360p</button>
              <button disabled={quality === 480} onClick={() => setQuality(480)} className='btn btn-warning mx-2'>480p</button>
              <button disabled={quality === 720} onClick={() => setQuality(720)} className='btn btn-primary'>720p</button>
            </div>
            {(files?.length > 0) && (<div className='col-sm-6 text-center'><h3>Goşmaça faýllar</h3>
              {
                files.map((i, index) =>
                  <div  className="file-block d-flex"><span className='me-2'>{index + 1}.</span><a href={`${process.env.REACT_APP_API_URL}api/user/download?id=${i.id}`} download>{i.name}</a></div>
                )
              }
            </div>)}
          </div>
          <div className={nextVideoId ? `video_buttons` : `d-none video_buttons`}>
            <Link to={`/stream/${nextVideoId}`}>Indiki</Link>
          </div>
          <div className="kesha mb-5">
            <h5><img src={`${process.env.REACT_APP_API_URL}/api/static/${teacher?.avatar}`} alt="" />{teacher?.first_name}</h5>
            <p>{teacher?.description}</p>
          </div>
          {/* <p>{course.description}</p> */}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Stream;