import React, { useContext, useState, useEffect  } from "react";
import "./Service_Design.scss";
import { ChromePicker } from "react-color";

import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Service_Design = () => {
  let{
Token,
URL_Alies,
setFormSubmitLoader,
ServiceBackColor, setServiceBackColor,
ServiceTextColor, setServiceTextColor,
ServiceTitleColor, setServiceTitleColor,
ServiceTitleFont, setServiceTitleFont,
ServiceTitleSize, setServiceTitleSize,
ServiceTitleUnit, setServiceTitleUnit,
ServiceFontWeight,setServiceFontWeight,
ServiceTitleAlign, setServiceTitleAlign,
BtnBackColor,setBtnBackColor,
BtnTextColor,setBtnTextColor,
BtnHoverBackColor,setBtnHoverBackColor,
BtnHoverTextColor,setBtnHoverTextColor,
ServiceThemeUpdateToggle,
setServiceThemeUpdateToggle
  }=useContext(AppContext)


  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  
  let [UpdateToggle, setUpdateToggle] = useState(false);
  const fontFamilies = [
    "Arial",
    "Poppins",
    "Afacad Flux",
    "Montserrat",
    "Playwrite DE Grund",
    "Outfit",
    "Pacifico",
    "Georgia",
    "Courier New",
    "Tahoma",
    "Verdana",
    "Times New Roman",
    "Comic Sans MS",
    "Lucida Console",
  ];
  const fontWeight = [400, 450, 500, 550, 600, 650, 700, 750, 800];
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

    // Create Vcard Theme
    async function handleServiceThemeSubmit(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        ServiceBackColor:ServiceBackColor,
        ServiceTextColor:ServiceTextColor,
        ServiceTitleColor:ServiceTitleColor,
        ServiceTitleFont:ServiceTitleFont,
        ServiceTitleSize:ServiceTitleSize,
        ServiceTitleUnit:ServiceTitleUnit,
        ServiceFontWeight:ServiceFontWeight,
        ServiceTitleAlign:ServiceTitleAlign,
        BtnBackColor:BtnBackColor,
        BtnTextColor:BtnTextColor,
        BtnHoverBackColor:BtnHoverBackColor,
        BtnHoverTextColor:BtnHoverTextColor,
      };
      try {
        await api
          .post(`/service_theme/${URL_Alies}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
          setServiceThemeUpdateToggle(true);
            toast.success(res.data.message);
            setFormSubmitLoader(false);
          })
          .catch((error) => {
            setServiceThemeUpdateToggle(false);
            setFormSubmitLoader(false);
            toast.error(error.response.data.message);
          });
      } catch (error) {
        setServiceThemeUpdateToggle(false);
        setFormSubmitLoader(false);
      }
    };
  
    // Update Vcard Theme
    async function handleServiceThemeUpdate(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        ServiceBackColor:ServiceBackColor,
        ServiceTextColor:ServiceTextColor,
        ServiceTitleColor:ServiceTitleColor,
        ServiceTitleFont:ServiceTitleFont,
        ServiceTitleSize:ServiceTitleSize,
        ServiceTitleUnit:ServiceTitleUnit,
        ServiceFontWeight:ServiceFontWeight,
        ServiceTitleAlign:ServiceTitleAlign,
        BtnBackColor:BtnBackColor,
        BtnTextColor:BtnTextColor,
        BtnHoverBackColor:BtnHoverBackColor,
        BtnHoverTextColor:BtnHoverTextColor,
      };
      try {
        await api
          .put(`/service_theme/${URL_Alies}`, data, {
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
    };
  return (
    <div className="service_design_container">
      <form action="" onSubmit={ServiceThemeUpdateToggle ? handleServiceThemeUpdate : handleServiceThemeSubmit}>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Service Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ServiceBackColor}
            onChange={(e) => setServiceBackColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ServiceBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Service Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ServiceTextColor}
            onChange={(e) => setServiceTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ServiceTextColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Service Title Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ServiceTitleColor}
            onChange={(e) => setServiceTitleColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ServiceTitleColor}</strong>
          </h2>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Adjust Title Font-Size
          </label>
          <div className="current">
            <p>
              Current FontSize - &nbsp; {ServiceTitleSize}
              {ServiceTitleUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="ServiceTitleSize"
              id="ServiceTitleSize"
              value={ServiceTitleSize}
              onChange={(e) => setServiceTitleSize(e.target.value)}
            />
            <select
              name="ServiceTitleUnit"
              id="ServiceTitleUnit"
              value={ServiceTitleUnit}
              onChange={(e) => setServiceTitleUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>

          <label className="form_label" for="BannerHeight">
            Adjust Title Font-Wight
          </label>
          <div className="current">
            <p>Current FontWeight - &nbsp; {ServiceFontWeight}</p>
          </div>
          <div className="input_container">
            <select
              name="ServiceFontWeight"
              id="ServiceFontWeight"
              value={ServiceFontWeight}
              onChange={(e) => setServiceFontWeight(e.target.value)}
            >
              {fontWeight.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <label className="form_label" for="BannerHeight">
            Apply Service Font-Family
          </label>
          <div className="current">
            <p>Current FontFamily - &nbsp; {ServiceTitleFont}</p>
          </div>
          <div className="input_container">
            <select
              name="ServiceTitleFont"
              id="ServiceTitleFont"
              value={ServiceTitleFont}
              onChange={(e) => setServiceTitleFont(e.target.value)}
            >
              {fontFamilies.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>

        </div>
        <div className="form_group radio_group">
          <label className="form_label" for="TitlePosition">
            Adjust Title Position
          </label>

          <div className="radio_inputs">
            <div className="radio_input">
              <input type="radio" name="start" id="start" value={ServiceTitleAlign} 
                 checked={ServiceTitleAlign === 'start'}
              onChange={(e)=>setServiceTitleAlign('start')}/>
              <label htmlFor="start">Start</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="center" id="center" value={ServiceTitleAlign} onChange={(e)=>setServiceTitleAlign('center')}
              
              checked={ServiceTitleAlign === 'center'}/>

            
              <label htmlFor="center">Middle</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="end" id="end" value={ServiceTitleAlign} onChange={(e)=>setServiceTitleAlign('end')}
              
              checked={ServiceTitleAlign === 'end'}/>

            
              <label htmlFor="end">End</label>
            </div>
          </div>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnBackColor}
            onChange={(e) => setBtnBackColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{BtnBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnTextColor}
            onChange={(e) => setBtnTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{BtnTextColor}</strong>
          </h2>
        </div>
        {/* <div className="btn_preview">
          <div className="btn">
            <div className="title">Button Preview</div>
            <button
              style={{backgroundColor: isHovered ? BtnHoverColour : BtnBackColour,
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
        </div> */}
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button  Hover Back Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnHoverBackColor}
            onChange={(e) => setBtnHoverBackColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{BtnHoverBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button  Hover Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={BtnHoverTextColor}
            onChange={(e) => setBtnHoverTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{BtnHoverTextColor}</strong>
          </h2>
        </div>
        <div className="form_actions">
          {ServiceThemeUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Service_Design;
