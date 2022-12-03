import React, {useState, useEffect, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_BANNER_ROUTE, ADMIN_COURSE_ROUTE, ADMIN_EDUCATION_DIRECTION_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_ROUTE_USERS, ADMIN_TRANSACTION_ROUTE } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import {  getAllDirections, removeDirection  } from "../../http/educaionApi";
import ModalAddDirection from "../../components/ModalAddDirection";
import ModalEditDirection from "../../components/ModalEditDirection";

const AdminDirection = observer(() => {
  const params = useParams()
  const [directions, setDirections] = useState([])
  const { user } = useContext(Context) 
  const [currentDirection, setCurrentDirection] = useState('')
  const [modalAddDirectionVisible, setModalAddDirectionVisible] = useState(false)
  const [modalEditDirectionVisible, setModalEditDirectionVisible] = useState(false)
  const navigate = useNavigate()
  const [removeBtn, setRemoveBtn] = useState('btn btn-danger')

  const removeDirectionfunc = async(id)=>{
      if (user.user.role === 'SUPERADMIN'){
        await removeDirection(id).then((data)=> window.location.reload())
      }
  }
  useEffect(()=>{
      (async function(){
          await getAllDirections(params.id).then((data) => setDirections(data));
      })()
      if (user.user.role !== 'SUPERADMIN'){
        setRemoveBtn('d-none')
      }
  }, [params.id] )


  const editDirection = (collage)=>{
    setCurrentDirection(collage)
    setModalEditDirectionVisible(true)
  }
  

  const tableAttributes = [
    "id",
    "Ady",
    "Baha",
    "Döredilen wagty",
    "Düwmeler",
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-5 mt-3">
        <div className="add-new my-3 text-end">
            <button  onClick={() => setModalAddDirectionVisible(true)} className="btn btn-warning">Täzesini goş</button>
        </div>
        <ModalEditDirection direction = {currentDirection} collageId = {params.id} show={modalEditDirectionVisible} onHide={() => setModalEditDirectionVisible(false)}/>
        <ModalAddDirection collageId = {params.id} show={modalAddDirectionVisible} onHide={() => setModalAddDirectionVisible(false)} />
        <div className="row">
          <div
            className={`${styles["admin-nav"]} flex-column d-flex col-2 p-2`}
          >
            <ul><Link to={ADMIN_ROUTE_USERS}>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="type"
              >
                Diňleýjiler
              </li></Link>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="title-type"
              >
                <Link to={ADMIN_COURSE_ROUTE}>Kurslar</Link>
              </li>
              <Link to={ADMIN_EDUCATION_ROUTE}><li className='d-block btn btn-primary mb-3' data-type='title-type' >Okuw</li></Link>
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
                  {directions.map((i) => (
                    <tr key={i.id}>
                      <td className="table-node p-1">{i.id}</td>
                      <td className="table-node p-1 w-50">{i.name}</td> 
                      <td className="table-node p-1 w-50">{i.price} $</td> 
                      <td className="table-node p-1 w-25">{i.createdAt}</td>
                      <td className="table-node p-1 text-center justify-content-center">
                        <div className="d-flex justify-content-center">
                        {/* <button
                          onClick={() => navigate(`${ADMIN_EDUCATION_DIRECTION_ROUTE}/${i.id}`)}
                          className="btn btn-success mx-1"
                          title="Okuw ugurlary"
                        >
                          <i className="fas fa-university"></i>
                        </button> */}
                        <button
                          onClick={() => editDirection(i)}
                          className="btn btn-primary mx-1"
                          title="Üýtgetmek"
                        >
                          <i className="fas fa-cogs"></i>
                        </button>
                        <button
                          onClick={() => removeDirectionfunc(i.id)}
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

export default AdminDirection;
