import React, {useState, useEffect, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_BANNER_ROUTE, ADMIN_COURSE_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_TRANSACTION_ROUTE } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { getAllVideosByCourseId, removeVideo } from "../../http/courseApi"; 
import { observer } from "mobx-react-lite";
import ModalAddVideo from "../../components/ModalAddVideo";
import { Context } from "../..";
import ModalEditVideo from "../../components/ModalEditVideo";

const AdminCourseWideo = observer(() => {
    const [wideos, setWideos] = useState([])
    const [modalAddCourseVisible, setModalAddCourseVisible] = useState(false)
    const { user } = useContext(Context) 
    const params = useParams()
    const [removeBtn, setRemoveBtn] = useState('btn btn-danger')
    const [modalEditCourseVisible, setModalEditCourseVisible] = useState(false)
    const [currentVideo, setCurrentVideo] = useState({})

    const removeVideoFunc = async(id)=>{
      if (user.user.role === 'SUPERADMIN'){
        await removeVideo(id).then((data)=> window.location.reload())
      }
    }
    useEffect(()=>{
        (async function(){
            await getAllVideosByCourseId(params.id).then((data) => setWideos(data));
        })()
        if (user.user.role !== 'SUPERADMIN'){
          setRemoveBtn('d-none')
        }
    }, [] )

    const editWideo = (video)=>{
      setCurrentVideo(video)
      setModalEditCourseVisible(true)
    }

  const tableAttributes = [
    "id",
    "Ady",
    "tertibi",
    "Döredilen wagty",
    "Düwmeler",
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-5 mt-3">
        <div className="add-new my-3 text-end">
            <button onClick={() => setModalAddCourseVisible(true)} className="btn btn-warning">Täzesini goş</button>
        </div>
        <ModalAddVideo show={modalAddCourseVisible} onHide={() => setModalAddCourseVisible(false)} />
        <ModalEditVideo video={currentVideo} show={modalEditCourseVisible} onHide={() => setModalEditCourseVisible(false)}/>
        <div className="row">
          <div
            className={`${styles["admin-nav"]} flex-column d-flex col-2 p-2`}
          >
            <ul>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="type"
              >
                <Link to={"/admin/users"}>Diňleýjiler</Link>
              </li>
              <li
                className="d-block btn btn-primary mb-3 btn-active"
                data-type="title-type"
              >
                <Link to={ADMIN_COURSE_ROUTE}>Kurslar</Link>
              </li>
              <Link to={ADMIN_EDUCATION_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Okuw</li></Link>
              <Link to={ADMIN_TRANSACTION_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Satyn alnan kurslar</li></Link>
              <Link to={ADMIN_BANNER_ROUTE}><li className='d-block btn btn-outline-primary mb-3' data-type='title-type' >Banner</li></Link>
            </ul>
          </div>
          <div className="admin-inform flex-column d-flex col-10 px-4">
            <div className="w-100">
              <table width="100%" border="2" className="mt-3">
                <thead>
                  <tr>
                    {tableAttributes.map((item, index) => (
                      <th key={index} className="p-1 text-center">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wideos.map((i) => (
                    <tr key={i.id}>
                      <td className="table-node p-1">{i.id}</td>
                      <td className="table-node p-1 w-25">{i.name}</td>
                      {/* <td className="p-1 w-25">{i.description}</td> */}
                      <td className="table-node p-1">{i.number}</td>
                      <td className="table-node p-1">{i.createdAt}</td>
                      <td className="table-node p-1 text-center justify-content-center">
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={() => editWideo(i)}
                            className="btn btn-primary mx-2"
                            title="Üýtgetmek"
                          >
                            <i className="fas fa-cogs"></i>
                          </button>
                          <button
                            onClick={() => removeVideoFunc(i.id)}
                            disabled={(user.user.role !== 'SUPERADMIN')}
                            className={removeBtn}
                            title="Pozmak"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminCourseWideo;
