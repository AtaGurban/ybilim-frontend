import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_PAGE } from "../../utils/pathConsts";
import Navbar from "../../components/Navbar";
import { login } from "../../http/userAPI";
import { Context } from "../..";

const Auth = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {user} = useContext(Context)

  const signIn = async () => {
    try {
      if (phone && password){
        const data = await login(phone, password)
        user.setUser(data);
        user.setIsAuth(true);
        navigate(MAIN_PAGE);
      }  else {
        alert('Maglumatlar yalnys')
      } 
    } catch (error) {
      alert('Munun yaly ulanyjy yok');
    }
  };

  return (
    <div>
      <Navbar />
      <div
        id="auth-block"
        className="container auth-block d-block text-center mt-5"
      >
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
        <button onClick={() => signIn()} className="btn btn-danger mt-3">
          Giriş
        </button>
      </div>
    </div>
  );
};
export default Auth;
