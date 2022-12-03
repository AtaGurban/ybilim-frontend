import { React, useState } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { createCity } from "../http/educaionApi";

const ModalAddCity = ({ show, onHide }) => {
  const [cityName, setCityName] = useState("");
  const [dropPrice, setDropPrice] = useState("");
  const [img, setImg] = useState(null);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const selectFileOne = (e) => {
    setImg(e.target.files[0]);
  };

  const addCity = async () => {
    if (cityName === "" || dropPrice === "" || !img) {
      return alert("Maglumatlar doly dal");
    }
    const formData = new FormData();
    formData.append("name", cityName);
    formData.append("imgFile", img);
    formData.append("price", dropPrice);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setLoaderPercent(percent);
        setLoaderClass("progress");
      },
    };
    try {
      await createCity(formData, options).then((data) => {
        onHide();
        window.location.reload();
      });
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Täze şäher goşmak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Şäheriň ady</span>
            <Form.Control
              type="text"
              className="my-3"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder={"Şäheriň ady"}
            />
            <hr />
            <span className="mt-3 c-bold">Şäheriň suraty</span>
            <Form.Control
              className="my-3"
              type="file"
              onChange={selectFileOne}
            />
            <hr />
            {/* <Dropdown className="mb-3">
            <Dropdown.Toggle>
              {dropPrice || "Baha aralygyny saýlaň"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {prices.map((price, index) => (
                <Dropdown.Item
                onClick={() => setDropPrice(price)}
                key={index}
                >
                  {price}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */}
            <Form.Control
              type="number"
              className="my-3 w-25 d-inline me-3"
              value={dropPrice}
              onChange={(e) => setDropPrice(e.target.value)}
              placeholder={"Şäheriň bahasy"}
            />
            <span>$</span>
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
          <Button variant={"outline-success"} onClick={addCity}>
            Goş
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddCity;
