import { BrowserRouter } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import "./App.css";
import AppRouter from "./components/AppRouter";
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import {MoonLoader} from 'react-spinners'
import Footer from "./components/Footer/Footer";
import { getBanner } from "./http/bannerApi";

const App = observer(() => {
  const { user, banner } = useContext(Context) 
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   (async function () {
  //     await getAllCourse().then((data) => setCourses(data));
  //   })();
  // }, []);
  useEffect(()=>{ 
     (async function(){
       await getBanner().then((data) => {if (data){
         banner.setBanner(data)
       } })
      await check().then(async data => {
        console.log(data);
        await user.setUser(data)
        await user.setIsAuth(true) 
      }).finally(() => setLoading(false))
    })();
  }, []) 

  
  if(loading){
    return (
      <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <MoonLoader color="#000000" />
    </div>)
  }
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <AppRouter />
      <Footer/>
    </BrowserRouter>
  );
});
export default App;