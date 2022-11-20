import { React, useEffect, useState } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { updateCollage } from "../http/educaionApi";

const ModalEditCollage = ({ show, onHide, cityId, collage }) => {
  const [collageName, setCollageName] = useState("");
  const [dropPrice, setDropPrice] = useState("");
  const [img, setImg] = useState(null);
  const [loaderPercent, setLoaderPercent] = useState(0);
  const [loaderClass, setLoaderClass] = useState("progress d-none");
  const prices = ["300$ - 500$", "750$ - 1000$", "1000$ - 1500$"];
  const selectFileOne = (e) => {
    setImg(e.target.files[0]);
  };
  console.log(collage);
  const addCollage = async () => {
    if (collageName === "" || dropPrice === "" || !img) {
      return alert("Maglumatlar doly dal");
    }
    const formData = new FormData();
    formData.append("name", collageName);
    formData.append("imgFile", img);
    formData.append("price", dropPrice);
    formData.append("cityId", cityId);
    formData.append("id", collage.id);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setLoaderPercent(percent);
        setLoaderClass("progress");
      },
    };
    try {
      await updateCollage(formData, options).then((data) => {
        onHide();
        window.location.reload();
      });
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(()=>{
    setCollageName(collage.name)
    setDropPrice(collage.price)
  }, [collage])

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Täze okuw jaýyny goşmak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Okuw jaýynyň ady</span>
            <Form.Control
              type="text"
              className="my-3"
              value={collageName}
              onChange={(e) => setCollageName(e.target.value)}
              placeholder={"Okuw jaýynyň ady"}
            />
          </Form>
          <hr />
          <div className="my-3">
            <img
                    height='250px'
                    src={`${process.env.REACT_APP_API_URL}/api/static/${collage.img}`}
                    alt=""
                />
          </div>
          <span className="mt-3 c-bold">Okuw jaýynyň suraty</span>
          <Form.Control className="my-3" type="file" onChange={selectFileOne} />
          <hr />
          <Dropdown className="mb-3">
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
          </Dropdown>
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
          <Button variant={"outline-success"} onClick={addCollage}>
            Üýtget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditCollage;
