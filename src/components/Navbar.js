import React from "react";
import logo from '../logo.png'

const Navbar = () => {
  return (
    <div>
      <div className="menu">
        <div className="menu_logo">
          <img src={logo} alt="" />
        </div>
      </div>
      <nav>
        <div className="nav_container container">
          <a className="logo" href="#">
            <img src={logo} alt="" />
          </a>
          {/* <div className="menu_btn" onclick="menu()">
                <div className="menu_line"></div>
                <div className="menu_line"></div>
                <div className="menu_line"></div>
              </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
