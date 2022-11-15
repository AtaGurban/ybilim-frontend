import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_COURSE_ROUTE, ADMIN_ROUTE_USERS } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import Pagination from 'react-bootstrap/Pagination';
import { getAllUsers, removeUser } from "../../http/userAPI";
import ModalBuyCourse from "../../components/ModalBuyCourse";
import ModalEditUser from "../../components/ModalEditUser";

const AdminUsers = observer(() => {
    const [users, setUsers] = useState([])
    const [active, setActive] = useState(1)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('')
    const [isTeacher, setIsTeacher] = useState(false)
    const [role, setRole] = useState('USER')
    const [paginationCount, setPaginationCount] = useState(1)
    const { user } = useContext(Context) 
    const [modalBuyCourseVisible, setModalBuyCourseVisible] = useState(false)
    const [modalEditUserVisible, setModalEditUserVisible] = useState(false)
    const [removeBtn, setRemoveBtn] = useState('btn btn-danger col-3 mx-2 my-2')

    const removeUserFunc = async(id)=>{
        if (user.user.role === 'SUPERADMIN'){
          await removeUser(id).then((data)=> window.location.reload())
        }
    }
    useEffect(()=>{
        (async function(){
            await getAllUsers(active).then((data) => {setUsers(data.rows); setPaginationCount(data.count)});
        })()
        if (user.user.role !== 'SUPERADMIN'){
          setRemoveBtn('d-none')
        }
    }, [active] )

    const setUser = (id, name, isTeacher, role)=>{
      setUserId(id)
      setUserName(name)
      setIsTeacher(isTeacher)
      setRole(role)
      setModalEditUserVisible(true)
    }

    const buyCourse = (id, name)=>{
      setUserId(id)
      setUserName(name)
      setModalBuyCourseVisible(true)
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(paginationCount / 10); number++) {
    items.push(
        <Pagination.Item onClick={()=>setActive(number)} key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }

  const tableAttributes = [
    "id",
    "Ady",
    "Tel. nomeri",
    "E-mail",
    "Mugallymmy?",
    "Beyany",
    "Döredilen wagty",
    "Düwmeler",
  ];
  return (
    <div>
      <Navbar />
      <div className="mx-5 mt-5">
        <ModalBuyCourse userId = {userId} userName={userName} show={modalBuyCourseVisible} onHide={() => setModalBuyCourseVisible(false)} />
        <ModalEditUser userId = {userId} userName={userName} show={modalEditUserVisible} role={role} isTeacherTwo={isTeacher} onHide={() => setModalEditUserVisible(false)}/>
        <div className="row">
          <div
            className={`${styles["admin-nav"]} flex-column d-flex col-2 p-2`}
          >
            <ul>
              <li
                className="d-block btn btn-primary mb-3"
                data-type="type"
              >
                <Link to={ADMIN_ROUTE_USERS}>Diňleýjiler</Link>
              </li>
              <Link to={ADMIN_COURSE_ROUTE}><li
                className="d-block btn btn-outline-primary mb-3"
                data-type="title-type"
              >
                Kurslar
              </li></Link>
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
                  {users.map((i) => (
                    <tr key={i.id}>
                      <td className="table-node p-1">{i.id}</td>
                      <td className="table-node p-1">{i.first_name}</td>
                      <td className="table-node p-1">{i.phone}</td>
                      <td className="table-node p-1">{i.email}</td>
                      <td className="table-node p-1">{`${i.thisTeacher}`}</td>
                      <td className="table-node p-1 ">{i.description}</td>
                      <td className="table-node p-1">{i.createdAt}</td>
                      <td className="table-node p-1 text-center">
                        <div className="d-flex justify-content-center">

                        <button
                          onClick={() => buyCourse(i.id, i.first_name, )}
                          className="btn btn-success mx-2 my-2 "
                          title="Kurs bermek"
                        >
                          <i className="fas fa-user-graduate"></i>
                        </button>
                        <button
                          onClick={() => setUser(i.id, i.first_name, i.thisTeacher, i.role)}
                          className="btn btn-primary mx-2 my-2 "
                          title="Üýtgetmek"
                        >
                          <i className="fas fa-cogs"></i>
                        </button>
                        <button
                          onClick={() => removeUserFunc(i.id)}
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
              <div className="container mt-5">
              <Pagination className="justify-content-center" size="lg">{items}</Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminUsers;
