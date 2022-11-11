import { React, useState, useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { update } from "../http/userAPI";
import { Context } from "..";

const ModalEditCourse = ({ show, onHide, course }) => {
  const [courseName, setCourseName] = useState("");
  const [favCourse, setFavCourse] = useState(false);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);

  const selectFileImg = (e) => {
    setImg(e.target.files[0]);
  };
  const addCourse = () => {
    const formData = new FormData();
    formData.append("id", course.id);
    formData.append("courseName", courseName);
    formData.append("description", description);
    formData.append("favCourse", setDescription);
    if (img){
      formData.append('img', img)
    }

    update(formData).then((data) => {
      try {
        onHide();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    });
  };
  useEffect(() => {
    setCourseName(course.name);
    setFavCourse(course.favourite);
    setDescription(course.description);
  }, [course]);

  console.log(course);

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {courseName} kursy üýtgetmek
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Kursun ady</span>
            <Form.Control
              className="my-3"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder={"Kursun ady"}
            />
            <hr />
            <span className="mt-3 c-bold">Kursun beýany</span>
            <Form.Text
              as="textarea"
              className="my-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Kursun beýany"}
            />
            <hr />
            <div className="my-3">
              <img
                height='250px'
                src={`${process.env.REACT_APP_API_URL}/api/static/${course.img}`}
                alt=""
              />
            </div>
            <span className="mt-3 c-bold">Surat</span>
            <Form.Control
              className="my-3"
              type="file"
              onChange={selectFileImg}
            />
            <hr />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Saýlanan kursmy?"
              onChange={() => setFavCourse(!favCourse)}
              checked={favCourse}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>
            Ýap
          </Button>
          <Button variant={"outline-success"} onClick={addCourse}>
            Üýtget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditCourse;
