import React, { useState, useEffect } from "react";
import { getAllCourse } from "./../../http/courseApi";
import fav from "../../fav.png";
import search from "../../search.png";
import "./listCourses.css";
import { Link } from "react-router-dom";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [search, setSearch] = useState("");
  console.log(visibleCourses);
  useEffect(() => {
    if (search === "") {
      setVisibleCourses(courses);
    }
  }, [search, courses]);

  useEffect(() => {
    (async function () {
      await getAllCourse().then((data) => setCourses(data));
    })();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="search">
          <input type="text" id="search" placeholder="Gözleg..." />
          <button className="btn-sham">
            <img src={search} alt="" />
          </button>
        </div>
        <div className="boxes">
          {visibleCourses.map((i) => (
            <Link key={i.id} to={`/stream/${i.id}`}>
              <div className="box">
                <div className="box_image skeleton">
                  <img src={`http://localhost:5000/api/static/${i.img}`} alt={`${i.img}`} />
                </div>
                <div className="box_content">
                  <div className="box_avatar skeleton">
                    <img
                      src={fav}
                      alt=""
                      width="35px"
                      height="35px"
                      className="skeleton"
                    />
                  </div>
                  <div className="box_text">
                    <h2 className="skeleton box_h2">
                      {i.name}
                    </h2>
                    <br />
                    <h3 className="skeleton">{i.description}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCourses;
