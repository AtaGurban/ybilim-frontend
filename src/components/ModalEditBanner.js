import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { createVideo } from "../http/courseApi";

function ModalEditBanner({ show, onHide }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  // const [description, setDescription] = useState('')
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const [loaderClassPercent, setLoaderClassPercent] = useState("ms-2 d-none");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const params = useParams();

  const selectFileImg = (e) => {
    setImg(e.target.files[0]);
  };

  const selectFileVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  useEffect(() => {
    if (loaderPercent === 100) {
      // window.location.reload()
    }
  }, [loaderPercent]);

  const addCourse = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("courseId", params.id);
    formData.append("number", number);
    // formData.append('description', description)
    formData.append("img", img);
    formData.append("video", video);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setLoaderPercent(percent);
        setLoaderClass("progress");
        setLoaderClassPercent("ms-2");
      },
    };
    try {
      await createVideo(formData, options).then((data) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Video goşmak üçin penjire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src="img/video.gif" alt="" width="150px" />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Video Name..."
            name="name"
          />
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            placeholder="Video number..."
            name="name"
          />
          {/* <textarea onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Beyan..." name="name"/> */}
          <div className="inputs p-2">
            <Form>

            <span className="c-bold">Surat Saýla</span>
              <Form.Control
                className="my-2"
                type="file"
                onChange={selectFileImg}
              />
            <span className="c-bold">Video Saýla</span>
              <Form.Control
                className="my-2"
                type="file"
                onChange={selectFileVideo}
              />
            </Form>
          </div>
          <div className="my-2">
            <span className={loaderClassPercent}>{loaderPercent}%</span>
            <div className={loaderClass}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${loaderPercent}%` }}
                aria-valuenow={loaderPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <button className="btn btn-danger" onClick={addCourse}>
            gosh
          </button>
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

export default ModalEditBanner;
