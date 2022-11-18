import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { buyCourse } from "../http/userAPI";

const ModalBuyCourse = ({ show, onHide, userId, userName }) => {
  const [courseNumber, setCourseNumber] = useState("");

  const addCourse = async () => {
    if (courseNumber === ''){
      return alert('Maglumatlar doly dal')
    }
    const formData = new FormData();
    formData.append("number", courseNumber);
    formData.append("userId", userId);
    
    try {
      await buyCourse(formData).then((data) => {
        onHide();
        window.location.reload();
      });
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
    }

  };

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userName} ulanyja kurs bermek
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Kursuň nomeri</span>
            <Form.Control
              type="number"
              className="my-3"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              placeholder={"Kursuň nomeri"}
            />
            <hr />
          </Form>
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

export default ModalBuyCourse;
