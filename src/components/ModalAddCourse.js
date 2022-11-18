import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createCourse } from "../http/courseApi";

const ModalAddCourse = ({ show, onHide }) => {
  const [courseName, setCourseName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [img, setImg] = useState(null);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const [favourite, setFavourite] = useState(false);

  const selectFileOne = (e) => {
    setImg(e.target.files[0]);
  };


  const addCourse = async () => {
    const formData = new FormData();

    formData.append("name", courseName);
    formData.append("description", courseDescription);
    formData.append("imgFile", img);
    formData.append("favourite", favourite);
    formData.append("teacher", teacher.trim());
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setLoaderPercent(percent);
        setLoaderClass("progress");
      },
    };

    try {
      await createCourse(formData, options).then((data) => {
        onHide();
        window.location.reload();
      });
    } catch (error) {
      alert(error.response.data.message);
    }

  };

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Kurs goşmak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Kursuň ady</span>
            <Form.Control
              className="my-3"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder={"Kursuň ady"}
            />
            <hr />
            <span className="mt-3 c-bold">Kursuň beýany</span>
            <Form.Control
              className="my-3"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder={"Kursuň beýany"}
            />
            <hr />
            <span className="mt-3 c-bold">Kursuň mugallymy</span>
            <Form.Control
              className="my-3"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder={"Kursuň mugallymy"}
            />
            <hr />
            <span className="mt-3 c-bold">Kursuň suraty</span>
            <Form.Control
              className="my-3"
              type="file"
              onChange={selectFileOne}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Saýlanan kursmy?"
              onChange={()=>setFavourite(!favourite)}
            />
          </Form>
          <div className="my-2">
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
          <Button variant={"outline-danger"} onClick={onHide}>
            Ýap
          </Button>
          <Button variant={"outline-success"} onClick={addCourse}>
            Goş
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddCourse;
