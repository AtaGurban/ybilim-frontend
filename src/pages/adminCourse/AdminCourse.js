import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ADMIN_COURSE_ROUTE, ADMIN_ROUTE_USERS } from "../../utils/pathConsts";
import styles from "./admincourse.module.css";
import { removeCourse } from "../../http/courseApi";
import ModalAddCourse from "../../components/ModalAddCourse";
import { observer } from "mobx-react-lite";
import { getAllCourse } from "../../http/courseApi";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";

const AdminCourse = observer(() => {
  const [courses, setCourses] = useState([])
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
          await getAllCourse().then((data) => setCourses(data));
      })()
  }, [] )
  

  const tableAttributes = [
    "id",
    "Ady",
    "beýany",
    "Döredilen wagty",
    "Düwmeler",
  ];
  console.log(courses);
  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="add-new my-3 text-end">
            <button onClick={() => setModalAddCourseVisible(true)} className="btn btn-warning">Täzesini goş</button>
        </div>
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
                  {courses.map((i) => (
                    <tr key={i.id}>
                      <td className="p-1">{i.id}</td>
                      <td className="p-1 w-25">{i.name}</td>
                      <td className="p-1 w-25">{i.description}</td>
                      <td className="p-1">{i.createdAt}</td>
                      <td className="p-1 text-center d-flex">
                        <button
                          onClick={() => navigate(`/admin/course/${i.id}`)}
                          className="btn btn-success mx-2"
                        >
                          Wideolar
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminCourse;
