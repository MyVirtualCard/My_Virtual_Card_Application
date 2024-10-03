import React, { useState, useContext } from "react";
import "./Edit_form_styles/Edit_Dynamic_Theme.scss";

import { useParams } from "react-router-dom";
import Context from "../../../Context/GlobalContext";
import Vcard_Theme from "./Dynamic_Forms/Vcard_Theme";
const Edit_Dynamic_Theme = () => {

  let {
    user,
    userName,
    FormSubmitLoader,
    setFormSubmitLoader,
    currentTemplate,
    setCurrentTemplate,
    currentPlan,
    setCurrentPlan,
    ShowForm,
    DynamicForm, 
    setDynamicForm,
    setShowForm,
    activePlan,
    setPlanActive,
    URL_Alies,
    setURL_Alies,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    status,
    setStatus,
    CurrentPlanActive,
    setCurrentPlanActive,
  } = useContext(Context);

  return (
    <>
      <div className="Dynamic_theme_container">
        <div className="dynamic_title">
          <h4>{ShowForm}</h4>
        </div>

        <div className="dynamic_box">
          <div className="dynanic_content">
             {ShowForm == 'Dynamic Theme' || DynamicForm == 'Vcard Theme' ? 
             <Vcard_Theme/>
             : ''}
          </div>
          <div className="vcard_preview">
            <iframe
              src={`${import.meta.env.VITE_CLIENT_DOMAIN_URL}/Doctor_Preview`}
              width="350px"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Dynamic_Theme;
