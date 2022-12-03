import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBanner } from "../http/bannerApi";

function ModalAddBanner({ show, onHide }) {

  // const [description, setDescription] = useState('')
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const [loaderClassPercent, setLoaderClassPercent] = useState("ms-2 d-none");
  const [img, setImg] = useState(null);

  const selectFileImg = (e) => {
    setImg(e.target.files[0]);
  };



  useEffect(() => {
    if (loaderPercent === 100) {
      // window.location.reload()
    }
  }, [loaderPercent]);

  const addCourse = async () => {
    const formData = new FormData();
    formData.append("img", img);
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
      await createBanner(formData, options).then((data) => {
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
          <Modal.Title>Banner goşmak üçin penjire</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputs p-2">
            <Form>

            <span className="c-bold">Surat Saýla</span>
              <Form.Control
                className="my-2"
                type="file"
                onChange={selectFileImg}
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

export default ModalAddBanner;
