import React, {useState, useEffect} from "react";
import book from './book.jpg'
import logo from '../mainPage/yone.png'
import keshaLogo from './kesha_logo.png'
import {MoonLoader} from 'react-spinners'
import { getAllDirections } from "../../http/educaionApi";
import { Link, useParams } from "react-router-dom";


const EducationDirectionPage = () => {
  const params = useParams()
  const [allCityes, setAllCityes] = useState([])
  const [cheapCityes, setCheapCityes] = useState([])
  const [mediumCityes, setMediumCityes] = useState([])
  const [loading, setLoading] = useState(true)
  const [expensiveCityes, setExpensiveCityes] = useState([])
  useEffect(()=>{
    (async function () {
      await getAllDirections(params.id).then((data) => setAllCityes(data)).finally(() => setLoading(false));
    })();
  }, [])

  useEffect(()=>{
    setCheapCityes(allCityes.filter((i)=>{
      return i.price === '300$ - 500$'
    })) 
    setMediumCityes(allCityes.filter((i)=>{
      return i.price === '750$ - 1000$'
    })) 
    setExpensiveCityes(allCityes.filter((i)=>{
      return i.price === '1000$ - 1500$'
    })) 
  }, [allCityes])
  if(loading){
    return (
      <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <MoonLoader color="#000000" />
    </div>)
  }
  return (
    <div>
      <div className="china">
        <div className="china_logo_img">
          <img src={book}/>
        </div>

        <div className="china_logo_text">
          <div className="img_block_logo">
            <img src={logo}/>
          </div>
        </div>

        <div className="china_vacation_txt">
          <div className="china_h1">
            <h1>
              Türkmenistanda öňde baryjy okuwa we işe ýerleşdirýän Ý-Bilim
              Kärhanasy
            </h1>
          </div>
          <div className="china_p">
            <p>
              Ý Bilim onlaýn platformasy bilen sen hytaýa okuwa gelmäne
              mümkinçiligiň bar we islegiňize göra şäherlerde, okuwlarda okamana
              başlamak üçin uly mümkinçilikler döredilen.
            </p>
          </div>
          <div className="china_button">
            <button>Hytaya gitjek</button>
          </div>
        </div>
      </div>

      <div className="city_name">
        <div className="city_h1">
          <h1>Ugurlar</h1>
        </div>

        <div className="flip_book">
          <div className="accordion" id="fly">
            <div className="accordion_mini">
              <h1>500$ - 1000$</h1>
            </div>
            {
              cheapCityes.map((i)=>
                <div key={i.id} className="accordion_mini2">
                  <div className="flip_book_element">
                    <div className="flip_book_img">
                      <img src={`${process.env.REACT_APP_API_URL}/api/static/${i.img}`}/>
                    </div>
                    <div className="flip_book_design">
                      <Link to={`#`}>{i.name}</Link>
                      {/* <a href="shanghai.html">Shanghai</a> */}
                    </div>
                  </div>
              </div>
              )
            }

          </div>
        </div>
        <div className="flip_book">
          <div className="accordion" id="fly">
            <div className="accordion_mini">
              <h1>350$ - 700$</h1>
            </div>

            {
              mediumCityes.map((i)=>
                <div key={i.id} className="accordion_mini2">
                  <div className="flip_book_element">
                    <div className="flip_book_img">
                      <img src={`${process.env.REACT_APP_API_URL}/api/static/${i.img}`}/>
                    </div>
                    <div className="flip_book_design">
                      <Link to={`#`}>{i.name}</Link>
                      {/* <a href="shanghai.html">Shanghai</a> */}
                    </div>
                  </div>
              </div>
              )
            }
          </div>
        </div>

        <div className="flip_book">
          <div className="accordion" id="fly">
            <div className="accordion_mini">
              <h1>200$ - 500$</h1>
            </div>

            {
              expensiveCityes.map((i)=>
                <div key={i.id} className="accordion_mini2">
                  <div className="flip_book_element">
                    <div className="flip_book_img">
                      <img src={`${process.env.REACT_APP_API_URL}/api/static/${i.img}`}/>
                    </div>
                    <div className="flip_book_design">
                      <Link to={`#`}>{i.name}</Link>
                      {/* <a href="shanghai.html">Shanghai</a> */}
                    </div>
                  </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
      <footer>
        <div className="footer_container">
          <img src={keshaLogo} alt="" />
          <p>
            Üstünlik zähmetiň, bilimiň we çydamlylygyñ netijesidigine ynanýarys.
            Berlen mysallar adaty bolmak üçin niýetlenen däldir we netijeler hiç
            haçan kepillendirilmeýär. Berilýän maglumatlar diňe bilim maksatly
            bolup, kanuny ýa-da maliýe maslahatyny düzmeýär. Bu web sahypasyny
            ýa-da oňa bagly islendik materialy ulanmak bilen, öz netijeleriňiz
            üçin doly jogapkärçiligi öz üstüňize alýarsyňyz.
          </p>
          <p>
            Biziň komandamyz sizi goldamak maksady bilen bu ýerde, ýöne siz
            inwestisiýa we risk etmezden öñ seresaplylygy berjaý etmelisiñiz.
            Üstünlik - bu siziñ borjuñyz we jogapkärçiligiñizdir. Ähli hukuklar
            goragly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EducationDirectionPage;
