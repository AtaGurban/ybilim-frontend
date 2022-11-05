import React from "react";

const CourseBox = ({course}) => {
  return (
    <div class="box">
      <img src={`${process.env.REACT_APP_API_URL}/api/static/${course.img}`} alt="" class="box_image" />
      <div class="box_text">
        <h2>{course.name}</h2>
      </div>
      <a href="courses/start_1.html" class="box_button">
        Başla
      </a>
    </div>
  );
};

export default CourseBox;
