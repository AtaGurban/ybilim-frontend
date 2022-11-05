import { BrowserRouter } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import "./App.css";
import AppRouter from "./components/AppRouter";
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const App = observer(() => {
  const { user } = useContext(Context) 
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   (async function () {
  //     await getAllCourse().then((data) => setCourses(data));
  //   })();
  // }, []);
  useEffect(()=>{
     (async function(){
      await check().then(async data => {
        await user.setUser(data)
        await user.setIsAuth(true) 
      }).finally(() => setLoading(false))

    })();
  }, []) 

  
  if(loading){
    return (
      <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <Spinner animation={'grow'}/>
    </div>)
  }
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <AppRouter />
    </BrowserRouter>
  );
});
export default App;