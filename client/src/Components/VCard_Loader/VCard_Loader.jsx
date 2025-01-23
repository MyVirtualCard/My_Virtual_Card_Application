import React from "react";
import "./VCard_Loader.scss";
const VCard_Loader = () => {
  return (
    <div className="VCard_Loader_container">
      {/* <div className="logo">
        <img src={trianglelogo} alt="LOGO" className="aris_logo" />
      </div>
      <div className="slogan">
        <small>Your VirtualCard on Progressing...</small>
        
  
      </div> */}
      {/* <div className="site_loader">
        <span className="site_box"></span>
      </div> */}
       <div className="vcard_preview_loader">
          <span class="preview_loader"></span>
        </div>
    </div>
  );
};

export default VCard_Loader;
