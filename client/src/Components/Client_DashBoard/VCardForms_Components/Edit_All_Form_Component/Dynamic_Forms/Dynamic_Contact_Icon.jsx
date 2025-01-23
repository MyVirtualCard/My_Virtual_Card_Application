import React, { useContext, useEffect, useState } from "react";
import "./Dynamic_Contact_Icon.scss";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Dynamic_Contact_Icon = () => {
  let {
    BtnBackColour,
    setBtnBackColour,
    BtnTextColour,
    setBtnTextColour,
    BtnHoverColour,
    setBtnHoverColour,
    BtnHoverTextColour,
    setBtnHoverTextColour,
    isHovered,
    setIsHovered,
    ContactBtnBorderRadius,
    setContactBtnBorderRadius,
    ContactBtnUnit,
    setContactBtnUnit,
    IconBorderRadius,
    setIconBorderRadius,
    ButtonThemeUpdateToggle,
    setButtonThemeUpdateToggle,
    IconUnit,
    setIconUnit,
    UserDataPosition, setUserDataPosition,
    setFormSubmitLoader,
    URL_Alies,
    Token
  } = useContext(AppContext);

  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  let [UpdateToggle, setUpdateToggle] = useState(false);

  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
 
  // Create Vcard Theme
  async function handleButtonThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      BtnBackColour: BtnBackColour,
      BtnTextColour: BtnTextColour,
      BtnHoverColour: BtnHoverColour,
      BtnHoverTextColour: BtnHoverTextColour,
      ContactBtnBorderRadius: ContactBtnBorderRadius,
      ContactBtnUnit: ContactBtnUnit,
      IconBorderRadius: IconBorderRadius,

      IconUnit: IconUnit,
      UserDataPosition:UserDataPosition,
    };
    try {
      await api
        .post(`/button_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setButtonThemeUpdateToggle(true);
        })
        .catch((error) => {
          setFormSubmitLoader(false);
          setButtonThemeUpdateToggle(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setButtonThemeUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleButtonThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      BtnBackColour: BtnBackColour,
      BtnTextColour: BtnTextColour,
      BtnHoverColour: BtnHoverColour,
      BtnHoverTextColour: BtnHoverTextColour,
      ContactBtnBorderRadius: ContactBtnBorderRadius,
      ContactBtnUnit: ContactBtnUnit,
      IconBorderRadius: IconBorderRadius,
      IconUnit: IconUnit,
      UserDataPosition:UserDataPosition,
    };
    try {
      await api
        .put(`/button_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setFormSubmitLoader(false);
    }
  }
  return (
    <div className="Dynamic_contact_icon_container">
      <form
        action=""
        onSubmit={
          ButtonThemeUpdateToggle
            ? handleButtonThemeUpdate
            : handleButtonThemeSubmit
        }
      >
        <div className="First_colour">
          <div className="theme_title">
            <h5>Icon/Button Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnBackColour}
            onChange={(e) => setBtnBackColour(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{BtnBackColour}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Icon/Button Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnTextColour}
            onChange={(e) => setBtnTextColour(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{BtnTextColour}</strong>
          </h2>
        </div>
        <div className="btn_preview">
          <div className="btn">
            <div className="title">Button Preview</div>
            <button
              style={{
                backgroundColor: isHovered ? BtnHoverColour : BtnBackColour,
                color: isHovered ? BtnHoverTextColour : BtnTextColour,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Demo Btn
            </button>
          </div>

          <div className="icon">
            <div className="title">Icon Preview</div>
            <i
              className="bx bxl-tiktok"
              style={{ backgroundColor: BtnBackColour, color: BtnTextColour }}
            ></i>
          </div>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Icon/Button Back Hover Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnHoverColour}
            onChange={(e) => setBtnHoverColour(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{BtnHoverColour}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Icon/Button Text Hover Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnHoverTextColour}
            onChange={(e) => setBtnHoverTextColour(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{BtnHoverTextColour}</strong>
          </h2>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Button Border Radius
          </label>
          <div className="current">
            <p>
              Current Border Radius - &nbsp; {ContactBtnBorderRadius}
              {ContactBtnUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="ContactBtnBorderRadius"
              id="ContactBtnBorderRadius"
              value={ContactBtnBorderRadius}
              onChange={(e) => setContactBtnBorderRadius(e.target.value)}
            />
            <select
              name="ContactBtnUnit"
              id="ContactBtnUnit"
              value={ContactBtnUnit}
              onChange={(e) => setContactBtnUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
              <option value="%">%</option>
            </select>
          </div>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Icon Border Radius
          </label>
          <div className="current">
            <p>
              Current Border Radius - &nbsp; {IconBorderRadius}
              {IconUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="IconBorderRadius"
              id="IconBorderRadius"
              value={IconBorderRadius}
              onChange={(e) => setIconBorderRadius(e.target.value)}
            />
            <select
              name="IconUnit"
              id="IconUnit"
              value={IconUnit}
              onChange={(e) => setIconUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
              <option value="%">%</option>
            </select>
          </div>
        </div>
        <div className="form_group radio_group">
          <label className="form_label" for="SubTitlePosition">
            Adjust User Details  Position
          </label>

          <div className="radio_inputs">
            <div className="radio_input">
              <input
                type="radio"
                name="start"
                id="start"
                value={UserDataPosition}
                checked={UserDataPosition === "start"}
                onChange={(e) => setUserDataPosition("start")}
              />
              <label htmlFor="start">Start</label>
            </div>
            <div className="radio_input">
              <input
                type="radio"
                name="center"
                id="center"
                value={UserDataPosition}
                onChange={(e) => setUserDataPosition("center")}
                checked={UserDataPosition === "center"}
              />

              <label htmlFor="center">Middle</label>
            </div>
            <div className="radio_input">
              <input
                type="radio"
                name="end"
                id="end"
                value={UserDataPosition}
                onChange={(e) => setUserDataPosition("end")}
                checked={UserDataPosition === "end"}
              />

              <label htmlFor="end">End</label>
            </div>
          </div>
        </div>
        <div className="form_actions">
          {ButtonThemeUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Dynamic_Contact_Icon;
