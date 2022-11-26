import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_COURSE_ROUTE, ADMIN_EDUCATION_ROUTE, ADMIN_ROUTE_USERS, ADMIN_TRANSACTION_ROUTE } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { getAllCityes, removeCity } from "../../http/educaionApi";
import ModalAddCity from "../../components/ModalAddCity";
import ModalEditCity from "../../components/ModalEditCity";

const AdminCity = observer(() => {
  const [cityes, setCityes] = useState([])
  const { user } = useContext(Context) 
  const [currentCity, setCurrentCity] = useState('')
  const [modalAddCityVisible, setModalAddCityVisible] = useState(false)
  const [modalEditCityVisible, setModalEditCityVisible] = useState(false)
  const navigate = useNavigate()
  const [removeBtn, setRemoveBtn] = useState('btn btn-danger')

  const removeCityfunc = async(id)=>{
      if (user.user.role === 'SUPERADMIN'){
        await removeCity(id).then((data)=> window.location.reload())
      }
  }
  useEffect(()=>{
      (async function(){
          await getAllCityes().then((data) => setCityes(data));
      })()
      if (user.user.role !== 'SUPERADMIN'){
        setRemoveBtn('d-none')
      }
  }, [] )


  const editCity = (city)=>{
    setCurrentCity(city)
    setModalEditCityVisible(true)
  }
  

  const tableAttributes = [
    "id",
    "Ady",
    "Döredilen wagty",
    "Düwmeler",
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-5 mt-3">
        <div className="add-new my-3 text-end">
            <button onClick={() => setModalAddCityVisible(true)} className="btn btn-warning">Täzesini goş</button>
        </div>
        <ModalEditCity city={currentCity} show={modalEditCityVisible} onHide={() => setModalEditCityVisible(false)}/>
        <ModalAddCity show={modalAddCityVisible} onHide={() => setModalAddCityVisible(false)} />
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
                  {cityes.map((i) => (
                    <tr key={i.id}>
                      <td className="table-node p-1">{i.id}</td>
                      <td className="table-node p-1 w-50">{i.name}</td> 
                      <td className="table-node p-1 w-25">{i.createdAt}</td>
                      <td className="table-node p-1 text-center justify-content-center">
                        <div className="d-flex justify-content-center">
                        <button
                          onClick={() => navigate(`/admin/okuw/okuw-jaylary/${i.id}`)}
                          className="btn btn-success mx-1"
                          title="Okuw jaýlary"
                        >
                          <i className="fas fa-university"></i>
                        </button>
                        <button
                          onClick={() => editCity(i)}
                          className="btn btn-primary mx-1"
                          title="Üýtgetmek"
                        >
                          <i className="fas fa-cogs"></i>
                        </button>
                        <button
                          onClick={() => removeCityfunc(i.id)}
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

export default AdminCity;
