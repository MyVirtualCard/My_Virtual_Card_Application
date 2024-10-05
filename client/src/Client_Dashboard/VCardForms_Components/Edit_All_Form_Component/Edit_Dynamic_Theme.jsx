import React, { useContext, useEffect, useRef, useState } from "react";
import "./Edit_form_styles/Edit_Dynamic_Theme.scss";
import Context from "../../../Context/GlobalContext";
import Vcard_Theme from "./Dynamic_Forms/Vcard_Theme";
import Logo_Banner_Design from "./Dynamic_Forms/Logo_Banner_Design";
import Dynamic_Contact_Icon from "./Dynamic_Forms/Dynamic_Contact_Icon";
import Title_Design from "./Dynamic_Forms/Title_Design";
import DynamicVcard from "./Dynamic_Preview_Vcard/DynamicVcard";
import Service_Design from "./Dynamic_Forms/Service_Design";
const Edit_Dynamic_Theme = () => {
  let { user, userName, ShowForm, DynamicForm } = useContext(Context);

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
