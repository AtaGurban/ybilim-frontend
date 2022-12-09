import React, {useState, useEffect} from "react";
import verified from "./25899.png";
import styles from "./education.module.css";
import keshaLogo from './kesha_logo.png'
import {MoonLoader} from 'react-spinners'
import { getAllDirections } from "../../http/educaionApi";
import { Link, useParams } from "react-router-dom";
import { MAIN_PAGE } from "../../utils/pathConsts";


const EducationDirectionPage = () => {
  const params = useParams()
  const [allCityes, setAllCityes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async function () {
      await getAllDirections(params.id).then((data) => setAllCityes(data)).finally(() => setLoading(false));
    })();
  }, [])


  if(loading){
    return (
      <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <MoonLoader color="#000000" />
    </div>)
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
      <h1>Okuw ugurlary</h1>
    </div>
    <div className={`${styles["card_block"]}`}>
      {allCityes.map((i) => (
        <div className={`${styles["card"]}`}>
            <img src={`${process.env.REACT_APP_API_URL}api/static/${i.img}`} alt="china" />
            <div className={`${styles["container"]}`}>
              <h4>
                <b>{i.name}</b>
              </h4>
              <button className="btn w-100 btn-warning"><span className="fs-4 fw-bold">{i.price} $</span></button>
            </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default EducationDirectionPage;
