import React, { useContext, useState } from "react";
import styles from "./MainPage.module.css";
import logo from "./logo (2).png";
import one from "./1.png";
import global from "./global2.png";
import docs from "./docs1.png";
import tick from "./tick.png";
import yone from "./yone.png";
import landing from "./1.jpg";
import mainOne from "./main1.jpg";
import mainTwo from "./main.jpg";
import mainThree from "./main4.jpg";
import mainFour from "./main3.jpg";
import ListCourses from "../../components/ListCourses/ListCourses";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { registration } from "../../http/userAPI";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, AUTH_PAGE, MY_COURSES } from "../../utils/pathConsts";

const MainPage = observer(() => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(Context);


  const signUp = async () => {
    try {
      if (email && phone && name && password) {
        if (password.split('').length < 8){
          return alert('Acarsözi 8 simwoldan az bolmaly däl')
        }
        const data = await registration(email, name, password, phone);
        user.setUser(data);
        user.setIsAuth(true);
        window.location.reload()
      } else{
        alert('Maglumatlar doly däl')
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-100">
      <div className={`${styles.menu}`}>
        <div className={`${styles["menu_mini"]}`}>
          <div className={`${styles["center_menu"]}`}>
            <img src={logo} style={{ height: "40px" }} />
          </div>
          {user.isAuth ? (
            <div className={`${styles["btn-main-page"]} container text-end d-flex`}>
              {/* <button className="btn-my-courses me-2 text-start "><Link to={MY_COURSES}>KURSLARYM</Link></button>   */}
              {(user.user.role !== 'USER') ?<button className="btn-my-courses me-2 text-start"><Link to={ADMIN_ROUTE}>Admin panel</Link></button>  : null}
            </div>
          ) : (
            <div className={`${styles["right_menu"]} text-center`}>
              <Link to={AUTH_PAGE}>Başla</Link>{" "}
            </div>
          )}
        </div>
      </div>
      <header
        className={`${styles["w3-display-container"]} ${styles["bgimg-1"]} ${styles["w3-grayscale-min"]}`}
        // "bgimg-1 w3-display-container w3-grayscale-min"
        id="home"
      >
        <div
          className={`${styles["w3-display-left"]} ${styles["w3-text-white"]}`}
          style={{ padding: "0%", width: "100%", textAlign: "center" }}
        >
          <span className={`${styles["w3-large"]}`}>Ýönekey Bilim</span>
          <br />
          <span className={`${styles["grant"]}`}>
            Biznesiňiziň birinji ädimini biz bilen başlaň !
          </span>
          <div className={`${styles["button_block"]}`}>
            <div className={`${styles["mini_button_block"]}`}>
              <a href="#china">Hytaýa Gitjek</a>
            </div>
            {
              user.isAuth ? (<div className={`${styles["mini_button_block"]}`}>
              <Link to={MY_COURSES}>Kurslarym</Link>
            </div>) : (<div className={`${styles["mini_button_block"]}`}>
              <a href="#auth-block">Kursa ýazyljak</a>
            </div>)
            }
            {/* <div className={`${styles["mini_button_block"]}`}>
              <a href="#auth-block">Kursa ýazyljak</a>
            </div> */}
          </div>
        </div>
      </header>
      <section className={`${styles["section_1"]}`} id="section">
        <div className={`${styles["container"]}`}>
          <h2>
            Türkmenistanda öňde baryjy okuwa we işe ýerleşdirýän Ý-Bilim
            Kärhanasy
          </h2>
          <p>
            Ý Bilim onlaýn platformasy bilen sen hytaýa okuwa gelmäne
            mümkinçiligiň bar we islegiňize göra şäherlerde, okuwlarda okamana
            başlamak üçin uly mümkinçilikler döredilen.
          </p>
          <div className={`${styles["boxes"]}`}>
            <div className={`${styles["box"]}`} style={{ margin: 0 }}>
              <img src={global} alt="" />
              <h3>Ähli ýurtdan hytaýa okamana gelmek</h3>
              <p>
                Siz bu Ýönekeý Bilim bilen dünýäniň ähli ýerinden hytaýa okamana
                gelip bilersiňiz
              </p>
            </div>
            <div className={`${styles["box"]}`}>
              <img src={docs} style={{ margin: "25px" }} alt="" />
              <h3>Hemme dokumentlary size düzedip bermek</h3>
              <p>
                Size hytaý içinde gerek bolan dokumentlary ädimme ädim düzedip
                bermek, hytaýa gelmegiňiz üçin
              </p>
            </div>
            <div className={`${styles["box"]}`} style={{ margin: 0 }}>
              <img src={one} alt="" />
              <h3>Elleriňize çakylyk hatyny we wizasyny alyp bermek 100%</h3>
              <p>
                Hytaý döwletine gelmek üçin size çakylyk hatlaryny iberip we
                wizaňyzy aldyryp bermek ähli ýurtdan
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles["section_2"]}`}>
        <div className={`${styles["container"]}`}>
          <h2>ESASY BIZIŇ AÝRATYNLYKLARYMYZ</h2>
          <ul>
            <li>
              <img src={tick} />
              Ýokary hilli köpdürli okuwlar
            </li>
            <li>
              <img src={tick} />
              Wagtynda hemme zatlaryňyz çözulmesi
            </li>
            <li>
              <img src={tick} />
              Arzan bahadan hytaýa gelmek
            </li>
            <li>
              <img src={tick} />
              Hyzmatdaşlyk Şertleri
            </li>
            <li>
              <img src={tick} />
              Dokumentalny Firma üsti bilen
            </li>
            <li>
              <img src={tick} />
              Ýokary hilli müşderi hyzmaty
            </li>
          </ul>
          <h3>Siz taýynmy hytaýa okuwa gelmek üçin?</h3>
          <a href="#china">HAWA MEN TAÝYN</a>
        </div>
      </section>
      <div className={`${styles["img123"]}`}>
        <img src={yone} />
      </div>
      <div className={`${styles["signin"]}`} id="china">
        <iframe
          width="100%"
          height="600"
          src="https://yonekey.com/forms/wtl/10167f135fa397c7c2a0497d8b698800"
          frameBorder="0"
          sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"
          allowFullScreen
        ></iframe>
      </div>
      <ListCourses />
      <div className={`${styles["big_block"]}`}>
        <div className={`${styles["left_block"]}`}>
          <h1>Biziň kursumyzda siz nämani öwrenersiňiz</h1>
          <div className={`${styles["left_mini22"]}`}>
            <p>
              Biznese degişli ähli bilmeli wajyp pudaklar biziň webinarymyzda
              tapyp, öwrenip we ýerine ýetirip bilersiňiz
            </p>
          </div>
          <div className={`${styles["lefts"]}`}>
            <ul>
              <li>Onlaýn pul gazanamak</li>
              <li>Web-saýt açmak we web-sahypany döretmek</li>
              <li>instagram target reklama</li>
              <li>Email reklamalar ýasamak</li>
              <li>Imo reklamalar nätanyş adamlaň öňünden çykmasy</li>
              <li>Müňlerçe YouTube Reklamalar</li>
              <li>Bilim Plan Ädimme Ädim </li>
            </ul>
          </div>
        </div>

        <div className={`${styles["right_block"]}`}>
          <img src={landing} />
        </div>
      </div>
      <div
        className={`${styles["w3-container"]} ${styles["w3-row"]} ${styles["w3-center"]} ${styles["w3-dark-grey"]} ${styles["w3-padding-64"]}`}
      >
        <div className={`${styles["w3-quarter"]}`}>
          <div className={`${styles["img_1"]}`}>
            <img src={mainOne} />
          </div>
          <span className={`${styles["w3-xxlarge"]}`}>
            Gysga wagtda Ýokary netije
          </span>
        </div>
        <div className={`${styles["w3-quarter"]}`}>
          <div className={`${styles["img_1"]}`}>
            <img src={mainTwo} />
          </div>
          <span className={`${styles["w3-xxlarge"]}`}>
            Ýokary hilli we peýdaly kurslar
          </span>
        </div>
        <div className={`${styles["w3-quarter"]}`}>
          <div className={`${styles["img_1"]}`}>
            <img src={mainThree} />
          </div>
          <span className={`${styles["w3-xxlarge"]}`}>
            Biznese başlamagyň ilkinji ädimi
          </span>
        </div>
        <div className={`${styles["w3-quarter"]}`}>
          <div className={`${styles["img_1"]}`}>
            <img src={mainFour} />
          </div>
          <span className={`${styles["w3-xxlarge"]}`}>
            Onlaýn biznese <br />
            başlamak
          </span>
        </div>
      </div>

      <div className={`${styles["img123"]}`}>
        <img src={yone} />
      </div>
      {/* 
      <div className={`${styles["signin"]}`} id="ids">
        <iframe
          width="100%"
          height="400"
          src="https://yonekey.com/forms/wtl/08e2368fcf3045701a34bb23905e34ff"
          frameBorder="0"
          sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"
          allowFullScreen
        ></iframe>
      </div> */}
      {!user.isAuth ? (
        <div
          id="auth-block"
          className="container auth-block d-block text-center pb-5"
        >
          <div className="form-name my-2">
            <label className="text-bold" htmlFor="name">
              Adyňyzy ýazyň
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Adyňyzy ýazyň"
              name="name"
              id="name"
            />
          </div>
          <div className="form-email my-2">
            <label className="text-bold" htmlFor="email">
              E-poçta ýazyň
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email ýazyň"
              name="email"
              id="email"
            />
          </div>
          <div className="form-phone my-2">
            <label className="text-bold" htmlFor="phone">
              Telefonyňyzy ýazyň
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Telefonyňyzy ýazyň"
              name="phone"
              id="phone"
            />
          </div>
          <div className="form-password my-2">
            <label className="text-bold" htmlFor="password">
              Açarsöz ýazyň
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Açarsöz ýazyň"
              name="password"
              id="password"
            />
          </div>
          <button onClick={() => signUp()} className="btn btn-danger mt-3">
            Başlamak isleýän
          </button>
        </div>
      ) : null}
    </div>
  );
});

export default MainPage;
