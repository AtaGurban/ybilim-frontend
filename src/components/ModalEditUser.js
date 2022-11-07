import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { update } from "../http/userAPI";

const ModalEditUser = ({ show, onHide, userId, userName }) => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null)

  const selectFileImg = (e) => {
      setImg(e.target.files[0])
  }
  const addCourse = () => {
    const formData = new FormData();

    formData.append("isTeacher", isTeacher);
    formData.append("description", description);
    formData.append("password", password);
    formData.append('img', img)
    formData.append("userId", userId);


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

  console.log(userId);

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userName} ulanyjyny üýtgetmek
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Mugallym barada</span>
            <Form.Text
              as="textarea"
              className="my-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Mugallym barada"}
            />
            <hr />
            <span className="mt-3 c-bold">Açarsözi täzele</span>
            <Form.Control
              className="my-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Açarsözi täzele"}
            />
            <hr />
            <span className="mt-3 c-bold">Surat</span>
            <Form.Control  className="my-3" type="file" onChange={selectFileImg} />
            <hr />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Mugallymmy?"
              onChange={() => setIsTeacher(!isTeacher)}
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

export default ModalEditUser;
