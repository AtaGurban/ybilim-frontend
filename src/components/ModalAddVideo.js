import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { createVideo } from "../http/courseApi";

function ModalAddVideo({ show, onHide }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [files, setFiles] = useState([]);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const [loaderClassPercent, setLoaderClassPercent] = useState("ms-2 d-none");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const params = useParams();

  const addFile = () => {
    setFiles([...files, { file: "", number: files.length + 1 }]);
  };

  const removeFile = (number) => {
    setFiles(files.filter((i) => i.number !== number));
  };

  const selectFileOne = (file, number) => {
    setFiles(files.map((i) => (i.number === number ? { ...i, file: file } : i)));
  };

  const selectFileImg = (e) => {
    setImg(e.target.files[0]);
  };
console.log(files);
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
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file[" + i + "]", file.file);
    }
    formData.append("countFiles", files.length);
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
            <hr />
          <div>
            <span className="my-3 c-bold d-block">Goşmaça file goşmak</span>
            <span className="my-3 c-bold d-block">ÜNS BERIŇ! Faýlyň adynda soňundaky nokatdan başga nokat bolmaly däldir!</span>
            <Button variant={"outline-dark"} onClick={addFile}>
              File goş
            </Button>
            {files.map((item) => (
              <div key={item.number} className="row mt-3">
                <div className="col-8">
                  <Form.Control
                    className=""
                    type="file"
                    onChange={(e) =>
                      selectFileOne(e.target.files[0], item.number)
                    }
                  />
                </div>
                <div className="col-4">
                  <Button
                    onClick={() => removeFile(item.number)}
                    variant={"danger"}
                  >
                    Poz
                  </Button>
                </div>
              </div>
            ))}
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
        </Modal.Body>
        <Modal.Footer>
        <button className="d-block btn btn-success" onClick={addCourse}>
              Goş
            </button>
          <Button variant="secondary" onClick={onHide}>
            Ýap
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddVideo;
