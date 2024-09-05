import React from "react";
import "./FallBack.scss";
import trianglelogo from "../assets/Fallback/Triangle_logo.png";
const FallBack = () => {
  return (
    <div className="fallback_container">
      <div className="logo">
        <img src={trianglelogo} alt="LOGO" className="aris_logo" />
      </div>
      <div className="slogan">
        <small>My VirtualCard is working</small>
      </div>
      <div className="line_loader">
        <span className="loader_line"></span>
      </div>
    </div>
  );
};

export default FallBack;
