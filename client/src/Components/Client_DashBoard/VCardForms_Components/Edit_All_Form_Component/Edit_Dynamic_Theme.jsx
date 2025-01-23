import React, { useContext, useEffect, useRef, useState } from "react";
import "./Edit_form_styles/Edit_Dynamic_Theme.scss";
import Vcard_Theme from "./Dynamic_Forms/Vcard_Theme";
import Logo_Banner_Design from "./Dynamic_Forms/Logo_Banner_Design";
import Dynamic_Contact_Icon from "./Dynamic_Forms/Dynamic_Contact_Icon";
import Title_Design from "./Dynamic_Forms/Title_Design";
import DynamicVcard from "./Dynamic_Preview_Vcard/DynamicVcard";
import Service_Design from "./Dynamic_Forms/Service_Design";
import Product_Design from "./Dynamic_Forms/Product_Design";
import Gallery_Design from "./Dynamic_Forms/Gallery_Design";
import Time_Design from "./Dynamic_Forms/Time_Design";
import Testiminal_Design from "./Dynamic_Forms/Testiminal_Design";
import Appoinment_Theme from "./Dynamic_Forms/Appoinment_Theme";
import Feedback_Theme from "./Dynamic_Forms/Feedback_Theme";
import Dynamic_VCard_PREVIEW from "../../All_VCards/Dynamic_VCards/Dynamic_VCard_PREVIEW";
import Inquiry_Theme from "./Dynamic_Forms/Inquiry_Theme";
import { AppContext } from "../../../Context/AppContext";
const Edit_Dynamic_Theme = () => {
  let { Token,  DynamicForm } = useContext(AppContext);

  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  return (
    <>
      <div className="Dynamic_theme_container">
        <div className="dynamic_box">
          <div className="dynanic_content">
            <div className="dynamic_title">
              <h4>Dynamic VCard Theme - {DynamicForm}</h4>
            </div>
            {DynamicForm == "Vcard_Theme" ? <Vcard_Theme /> : ""}
            {DynamicForm == "Logo_Banner_Design" ? <Logo_Banner_Design /> : ""}
            {DynamicForm == "Contact_Icons" ? <Dynamic_Contact_Icon /> : ""}
            {DynamicForm == "Title_Design" ? <Title_Design /> : ""}
            {DynamicForm == "Service_Design" ? <Service_Design /> : ""}
            {DynamicForm == "Product_Design" ? <Product_Design /> : ""}
            {DynamicForm == "Gallery_Design" ? <Gallery_Design /> : ""}
            {DynamicForm == "Timer_Design" ? <Time_Design /> : ""}
            {DynamicForm == "Testimonial_Design" ? <Testiminal_Design /> : ""}
            {DynamicForm == "Appoinment_Design" ? <Appoinment_Theme /> : ""}
            {DynamicForm == "Feedback_Design" ? <Feedback_Theme /> : ""}
            {DynamicForm == "Inquiry_Design" ? <Inquiry_Theme /> : ""}
          </div>
          <div className="vcard_preview">
            <DynamicVcard />
        
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_Dynamic_Theme;
