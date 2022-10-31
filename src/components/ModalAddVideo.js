import React, { useState, useEffect } from 'react';
import { createCourse } from '../http/courseApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddVideo({show, onHide}) {
//   const [show, setShow] = useState(true);
const [name, setName] = useState('')
const [loaderPercent, setLoaderPercent] = useState(0)
const [loaderClass, setLoaderClass] = useState('progress d-none')
const [img, setImg] = useState(null);
const [video, setVideo] = useState(null);
const [description, setDescription] = useState('');
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

const selectFileImg = (e) => {
    setImg(e.target.files[0])
}

const selectFileVideo = (e) => {
    setVideo(e.target.files[0])
}

    useEffect(()=>{
        if (loaderPercent === 100){
            window.location.reload()
        }
    }, [loaderPercent])



const addCourse = async()=>{
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
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

    await createCourse(formData, options)
}
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Kurs goşmak üçin penjire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <img  src="img/video.gif" alt="" width="150px"/>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Video Name..." name="name"/>
                <textarea onChange={(e) => setDescription(e.target.value)} name="description" id="" cols="30"  rows="10" placeholder="Type Description..."></textarea>
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
                <button className='' onClick={addCourse} >Submit</button>
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