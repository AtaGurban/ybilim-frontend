import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { getMyCourse } from "../../http/courseApi";
import styles from "./myCourses.module.css";
import { Context } from "../..";
import CourseCard from "../../components/CourseCard/CourseCard";
import Footer from "../../components/Footer/Footer";
import {MoonLoader} from 'react-spinners'

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async function () {
      await getMyCourse(user.user.id).then((data) => setCourses(data)).finally(() => setLoading(false));
    })();
  }, []);

  if(loading){
    return (
      <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <MoonLoader color="#000000" />
    </div>)
  }
  return (
    <div className="h-100">

      <div className="h-100">
        <div className="">
          <Navbar />
          <div className="container">
            <div className={`${styles["my-courses-title"]} c-bold mt-5`}>
              <h2>Meniň kurslarym</h2>
            </div>
            <hr />
            <div className="boxes-card">
              {courses.map((i) => (
                (i.courseId) ? 
                <CourseCard
                  key={i.id}
                  id={i.courseId}
                  img={i?.course?.img}
                  title={i?.course?.name}
                /> : null
              ))}
              {/* {courses.map((i) => (
                (i.courseId) ? 
                <CourseCard
                  key={i.id}
                  id={i.courseId}
                  img={i?.course?.img}
                  title={i?.course?.name}
                /> : null
              ))} */}
              {/* {courses.map((i) => (
                (i.courseId) ? 
                <CourseCard
                  key={i.id}
                  id={i.courseId}
                  img={i?.course?.img}
                  title={i?.course?.name}
                /> : null
              ))} */}

            </div>
          </div>
        </div>
      </div>
        {/* <Footer /> */}
    </div>
  );
};

export default MyCourses;
