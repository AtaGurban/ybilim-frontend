import React, { useState, useEffect } from "react";
import verified from "./25899.png";
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
            <div className={`${styles["big-image"]}`}>
      <div className={`${styles["market_logo"]}`}>
        <div className={`${styles["market_slog"]}`}>
          <Link to={MAIN_PAGE}>
            <img src={keshaLogo} />
          </Link>
        </div>
      </div>
      <div className={`${styles["create_hello"]}`}>
        <div className={`${styles["create_left_hello"]}`}>
          <div className={`${styles["create_header"]}`}>
            <h2>
              Ý<span>önekey hususy kärhana</span>
            </h2>
          </div>
          <div className={`${styles["create_header1"]}`}>
            <p>Biz bilen Hytaýa okuwa geliň</p>
          </div>
          <div className={`${styles["create_button"]}`}>
            <div className={`${styles["create_button_left"]}`}>
              <a href="#start">BAŞLA</a>
            </div>
            <div className={`${styles["create_button_left"]}`}>
              <div className={`${styles["imgblock"]}`}>
                <img src={verified} />
              </div>
              <span>VARIFIED</span>
            </div>
          </div>
        </div>
        {/* <div class={`${styles["create_right_img"]}`}>
            <a href="#">Kitap aljak</a>
            <a href="#">Lomaý söwda</a>
            <a href="#">Web-saýt açdyrjak</a>
            <a href="#">Haryt sargajak</a>
        </div> */}
      </div>
        </div>

      <div className={`${styles["city_h1"]}`}>
        <h1>Şäherler</h1>
      </div>
      <div className={`${styles["card_block"]}`}>
        {allCityes.map((i) => (
          <div className={`${styles["card"]}`}>
            <Link to={`${EDUCATION_COLLAGE_ROUTE}/${i.id}`}>
              <img src={`${process.env.REACT_APP_API_URL}api/static/${i.img}`} alt="china" />
              <div className={`${styles["container"]}`}>
                <h4>
                  <b>{i.name}</b>
                </h4>
                <p>{i.price} $</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
