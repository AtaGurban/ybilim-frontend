import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { getMyCourse } from "../../http/courseApi";
import styles from "./myCourses.module.css";
import { Context } from "../..";
import CourseCard from "../../components/CourseCard/CourseCard";
import Footer from "../../components/Footer/Footer";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(Context);
  useEffect(() => {
    (async function () {
      await getMyCourse(user.user.id).then((data) => setCourses(data));
    })();
  }, []);
  return (
    <div className="h-100">
      <div className="wrapper-all">
        <Navbar />
        <div className="container">
          <div className={`${styles["my-courses-title"]} c-bold mt-5`}>
            <h2>Meniň kurslarym</h2>
          </div>
          <hr />
          <div className="boxes-card">
            {courses.map((i) => (
              <CourseCard
                key={i.id}
                id={i.id}
                img={i?.course?.img}
                title={i?.course?.name}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCourses;
