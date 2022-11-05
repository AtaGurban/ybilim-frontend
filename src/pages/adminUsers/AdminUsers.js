import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_COURSE_ROUTE, ADMIN_ROUTE_USERS } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { removeCourse } from "../../http/courseApi";
import ModalAddCourse from "../../components/ModalAddCourse";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import Pagination from 'react-bootstrap/Pagination';
import { getAllUsers } from "../../http/userAPI";

const AdminUsers = observer(() => {
    const [users, setUsers] = useState([])
    const [active, setActive] = useState(1)
    const [paginationCount, setPaginationCount] = useState(1)
    const { user } = useContext(Context) 
    const [modalAddCourseVisible, setModalAddCourseVisible] = useState(false)
    const navigate = useNavigate()

    const removeCourseFunc = async(id)=>{
        if (user.user.role === 'SUPERADMIN'){
          await removeCourse(id).then((data)=> window.location.reload())
        }
    }
    useEffect(()=>{
        (async function(){
            await getAllUsers(paginationCount).then((data) => {setUsers(data.rows); setPaginationCount(data.count)});
        })()
    }, [paginationCount] )



    let items = [];
    for (let number = 1; number <= Math.ceil(paginationCount / 2); number++) {
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
      <div className="container mt-3">
        <ModalAddCourse show={modalAddCourseVisible} onHide={() => setModalAddCourseVisible(false)} />
        <div className="row">
          <div
            className={`${styles["admin-nav"]} flex-column d-flex col-2 p-2`}
          >
            <ul>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="type"
              >
                <Link to={ADMIN_ROUTE_USERS}>Diňleýjiler</Link>
              </li>
              <li
                className="d-block btn btn-outline-primary mb-3"
                data-type="title-type"
              >
                <Link to={ADMIN_COURSE_ROUTE}>Kurslar</Link>
              </li>
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
                      <td className="p-1">{i.id}</td>
                      <td className="p-1">{i.first_name}</td>
                      <td className="p-1">{i.phone}</td>
                      <td className="p-1">{i.email}</td>
                      <td className="p-1">{`${i.thisTeacher}`}</td>
                      <td className="p-1">{i.description}</td>
                      <td className="p-1">{i.createdAt}</td>
                      <td className="p-1 text-center d-flex">
                        <button
                          onClick={() => navigate(`/admin/course/${i.id}`)}
                          className="btn btn-success mx-2"
                        >
                          Kurs bermek
                        </button>
                        <button
                        //   onClick={() => removeCourseFunc(i.id)}
                          className="btn btn-primary mx-2"
                        >
                          Üýtgetmek
                        </button>
                        <button
                          onClick={() => removeCourseFunc(i.id)}
                          disabled={(user.user.role !== 'SUPERADMIN')}
                          className="btn btn-danger"
                        >
                          Pozmak
                        </button>
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
