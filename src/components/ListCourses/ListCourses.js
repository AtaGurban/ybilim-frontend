import React, { useState, useEffect } from "react";
import { getFavouriteCourse } from "../../http/courseApi";
import "./listCourses.css";



const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  // const [visibleCourses, setVisibleCourses] = useState([]);
  // const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (search === "") {
  //     setVisibleCourses(courses);
  //   }
  // }, [search, courses]);

  useEffect(() => {
    (async function () {
      await getFavouriteCourse().then((data) => setCourses(data));
    })();
  }, []);
  return (
    <div className="list-course">
      <div className="container">
        <div className="boxes">
          {courses.map((i) => (
            <div className="col-sm-6 col-md-4 col-12" key={i.id} >
              <div key={i.id} className="box ">
                <div className="box_image skeleton">
                  <img src={`${process.env.REACT_APP_API_URL}api/static/${i.img}`} alt={`${i.img}`} />
                </div>
                <div className="box_content">
                  <div className="box_text">
                    <h2 className="skeleton box_h2">
                      {i.name}
                    </h2>
                    <br />
                    <h3 className="skeleton">{i.description}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCourses;
