import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteFileById, updateVideoApi } from "../http/courseApi";



const ModalEditVideo = ({ show, onHide, video }) => {
  const [videoName, setVideoName] = useState("");
  const [number, setNumber] = useState("");
  const [img, setImg] = useState(null);
  const [files, setFiles] = useState([]);

  const selectFileImg = (e) => {
    setImg(e.target.files[0]);
  };
  const deleteFile = async (id) => {
    await deleteFileById(id).then((data) => window.location.reload())
  }
  const updateVideo = async() => {
    const formData = new FormData();
    formData.append("id", video.id);
    formData.append("videoName", videoName);
    formData.append("number", number);
    if (img) {
      formData.append('img', img)
    }
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file[" + i + "]", file.file);
    }
    formData.append("countFiles", files.length);

    await updateVideoApi(formData).then((data) => {
      try {
        onHide();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    });
  };

  const addFile = () => {
    setFiles([...files, { file: "", number: files.length + 1 }]);
  };

  const removeFile = (number) => {
    setFiles(files.filter((i) => i.number !== number));
  };

  const selectFileOne = (file, number) => {
    console.log(file);
    setFiles(files.map((i) => (i.number === number ? { ...i, file: file } : i)));
  };


  useEffect(() => {
    setVideoName(video.name);
    setNumber(video.number)
  }, [video]);


  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {video.name} wideony üýtgetmek
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span className="mt-3 c-bold">Wideonyň ady</span>
            <Form.Control
              className="my-3"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder={"Wideonyň ady"}
            />
            <hr />
            <span className="mt-3 c-bold">Wideonyň nomeri</span>
            <Form.Control
              type='number'
              className="my-3"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={"Wideonyň nomeri"}
            />
            <hr />
            <div className="my-3">
              <img
                height='250px'
                src={`${process.env.REACT_APP_API_URL}api/static/${video.img}`}
                alt=""
              />
            </div>
            <span className="mt-3 c-bold">Surat</span>
            <Form.Control
              className="my-3"
              type="file"
              onChange={selectFileImg}
            />
          </Form>
          <div>
            {(video?.file?.length > 0) && (<div><h2 className="my-3 c-bold text-center d-block">FAÝLLAR</h2>
              {
                video.file.map((i) =>
                  <div key={i.id} className="d-flex ms-3 my-2 justify-content-between align-items-center border-bottom border-dark">
                    <div className="col-6"><span >{i.name}</span></div>
                    <div className="col-6 text-end"><Button className="me-2" onClick={(e) => { deleteFile(i.id) }} variant="danger"> <i className="fas fa-trash-alt"></i></Button></div>

                  </div>
                )
              }
              <hr /></div>)}

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>
            Ýap
          </Button>
          <Button variant={"outline-success"} onClick={updateVideo}>
            Üýtget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditVideo;
