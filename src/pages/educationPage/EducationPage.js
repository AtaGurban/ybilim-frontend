import React, { useState, useEffect } from "react";
import styles from "./education.module.css";
import keshaLogo from "./kesha_logo.png";
import { MoonLoader } from "react-spinners";
import { getAllCityes } from "../../http/educaionApi";
import { Link } from "react-router-dom";
import { EDUCATION_COLLAGE_ROUTE, MAIN_PAGE } from "../../utils/pathConsts";

const EducationPage = () => {
  const [allCityes, setAllCityes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      await getAllCityes()
        .then((data) => setAllCityes(data))
        .finally(() => setLoading(false));
    })();
  }, []);
  console.log(allCityes);
  if (loading) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className="d-flex"
      >
        <MoonLoader color="#000000" />
      </div>
    );
  }
  return (
    <div className={`${styles["body"]}`}>

      <div className={`${styles["market_logo"]}`}>
        <div className={`${styles["market_slog"]}`}>
          <Link to={MAIN_PAGE}>
            <img src={keshaLogo} />
          </Link>
        </div>
      </div>



      <div className={`${styles["city_h1"]}`}>
        <h1>Şäherler</h1>
      </div>
      <div className={`${styles["card_block"]}`}>
        {allCityes.map((i) => (
          <div className={`${styles["card"]}`}>
            <Link to={`${EDUCATION_COLLAGE_ROUTE}/${i.id}`}>
              <div className={`${styles["circle-img"]} mx-auto`}>
                <img src={`${process.env.REACT_APP_API_URL}api/static/${i.img}`} alt="china" />
              </div>
              <div className={`${styles["container"]}`}>
                <h4>
                  <b>{i.name}</b>
                </h4>
                <button className="btn w-100 btn-warning"><span className="fs-4 fw-bold">{i.price} $</span></button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
