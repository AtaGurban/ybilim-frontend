import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import { createVideo } from '../http/courseApi';

function ModalAddVideo({show, onHide}) {
const [name, setName] = useState('')
const [number, setNumber] = useState('')
// const [description, setDescription] = useState('')
const [loaderPercent, setLoaderPercent] = useState(0)
const [loaderClass, setLoaderClass] = useState('progress d-none')
const [img, setImg] = useState(null);
const [video, setVideo] = useState(null);
const params = useParams()

const selectFileImg = (e) => {
    setImg(e.target.files[0])
}

const selectFileVideo = (e) => {
    setVideo(e.target.files[0])
}

    useEffect(()=>{
        if (loaderPercent === 100){
            // window.location.reload()
        }
    }, [loaderPercent])



const addCourse = async()=>{
    const formData = new FormData()
    formData.append('name', name)
    formData.append('courseId', params.id)
    formData.append('number', number)
    // formData.append('description', description)
    formData.append('img', img)
    formData.append('video', video)
    const options = {
        onUploadProgress:(progressEvent)=>{
            const {loaded, total} = progressEvent;
            let percent = Math.floor((loaded * 100) / total)
            setLoaderPercent(percent)
            setLoaderClass('progress')
        }
    }
    try {
      await createVideo(formData, options).then((data) => {
        window.location.reload()
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
}
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Video goşmak üçin penjire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <img  src="img/video.gif" alt="" width="150px"/>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Video Name..." name="name"/>
                <input onChange={(e) => setNumber(e.target.value)} type="number" placeholder="Video number..." name="name"/>
                {/* <textarea onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Beyan..." name="name"/> */}
                <div className="inputs"> 
                <label htmlFor="poster"><img src="img/image.png" alt="" width="30px"/>Surat Saýla</label>
                <input type="file" onChange={selectFileImg} name="poster" placeholder="Select Image" id="poster"/>
                <label htmlFor="video"><img src="img/image.png" alt="" width="30px"/>Video Saýla</label>
                <input id="video" onChange={selectFileVideo} type="file" placeholder="Video..."  name="video"/>
                </div>
                <div className='my-2'>
                    <div className={loaderClass}>
                        <div className="progress-bar" role="progressbar" style={{width:`${loaderPercent}%`}} aria-valuenow={loaderPercent} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <button className='btn btn-danger' onClick={addCourse} >gosh</button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Ýap
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddVideo