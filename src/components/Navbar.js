import React, {useContext} from "react";
import { Link } from "react-router-dom";
import logo from '../logo.png'
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.setItem("token", "");
  };
  return (
    <div>
      <div className="menu">
        <div className="menu_logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <nav>
        <div className="nav_container container">
          <Link className="logo" to="/">
            <img src={logo} alt="" />
          </Link>
          {
            (user.isAuth) ?           <div className="ms-auto">
            <button onClick={logOut} title="Hasapdan çykmak" className="btn btn-danger"><i className="fas fa-sign-out-alt"></i></button>
          </div> : null
          }
        </div>
      </nav>
    </div>
  );
});

export default Navbar;
