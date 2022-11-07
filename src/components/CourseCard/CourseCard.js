import React from "react";
import { Link } from "react-router-dom";
import { COURSE_ROUTE } from "../../utils/pathConsts";
import styles from './courseCard.module.css'

const CourseCard = ({img, title, id}) => {
  return (

      <div className={`${styles['box-card']}`}>
        <img src={`${process.env.REACT_APP_API_URL}/api/static/${img}`} alt="" className="h-100" />
        <div className={`${styles['box_text']}`}>
          <h2>{title}</h2>
        </div>
        <Link to={`/course/${id}`}><button className={`${styles['box_button']} btn`}>Başla</button></Link> 
      </div>

  );
};

export default CourseCard;
