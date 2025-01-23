import React, { useState, useContext, useEffect } from "react";
import "./Title_Design.scss";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Title_Design = () => {
  let {
    TitleColor,
    setTitleColor,
    TitleSize,
    setTitleSize,
    TitleUnit,
    setTitleUnit,
    TitleFontWeight,
    setTitleFontWeight,
    TitleFont,
    setTitleFont,
    TitlePosition,setTitlePosition,
    // SubTitle
    SubTitleColor,
    setSubTitleColor,
    SubTitleSize,
    setSubTitleSize,
    SubTitleUnit,
    setSubTitleUnit,
    SubTitleFontWeight,
    setSubTitleFontWeight,
    SubTitleFont,
    setSubTitleFont,
    SubTitlePosition,setSubTitlePosition,
    setFormSubmitLoader,
    TitleThemeUpdateToggle,
    setTitleThemeUpdateToggle,
    URL_Alies,
    Token,
  } = useContext(AppContext);


  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  let [UpdateToggle, setUpdateToggle] = useState(false);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
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

  // Create Vcard Theme
  async function handleTitleThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      TitleColor:TitleColor,
      TitleSize:TitleSize,
      TitleUnit:TitleUnit,
      TitleFontWeight:TitleFontWeight,
      TitleFont:TitleFont,
      TitlePosition:TitlePosition,

      SubTitleColor:SubTitleColor,
      SubTitleSize:SubTitleSize,
      SubTitleUnit:SubTitleUnit,
      SubTitleFontWeight:SubTitleFontWeight,
      SubTitleFont:SubTitleFont,
      SubTitlePosition:SubTitlePosition,
    };
    try {
      await api
        .post(`/title_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
    setTitleThemeUpdateToggle(true)
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          setTitleThemeUpdateToggle(false)
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
    
      setTitleThemeUpdateToggle(false)
      setFormSubmitLoader(false);
    }
  };

  // Update Vcard Theme
  async function handleTitleThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      TitleColor:TitleColor,
      TitleSize:TitleSize,
      TitleUnit:TitleUnit,
      TitleFontWeight:TitleFontWeight,
      TitleFont:TitleFont,
      TitlePosition:TitlePosition,
      SubTitleColor:SubTitleColor,
      SubTitleSize:SubTitleSize,
      SubTitleUnit:SubTitleUnit,
      SubTitleFontWeight:SubTitleFontWeight,
      SubTitleFont:SubTitleFont,
      SubTitlePosition:SubTitlePosition,
    };
    try {
      await api
        .put(`/title_theme/${URL_Alies}`, data, {
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
    <div className="title_design_container">
      <form action="" onSubmit={TitleThemeUpdateToggle ? handleTitleThemeUpdate : handleTitleThemeSubmit}>
        <div className="form_group">
          <label className="form_label" for="TitleColor">
            Title Color
          </label>

          <ChromePicker
            className="colourPicker"
            color={TitleColor}
            onChange={(e) => setTitleColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{TitleColor}</strong>
          </h2>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Adjust Font-Size
          </label>
          <div className="current">
            <p>
              Current FontSize - &nbsp; {TitleSize}
              {TitleUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="TitleSize"
              id="TitleSize"
              value={TitleSize}
              onChange={(e) => setTitleSize(e.target.value)}
            />
            <select
              name="TitleUnit"
              id="TitleUnit"
              value={TitleUnit}
              onChange={(e) => setTitleUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>

          <label className="form_label" for="BannerHeight">
            Adjust Font-Wight
          </label>
          <div className="current">
            <p>Current FontWeight - &nbsp; {TitleFontWeight}</p>
          </div>
          <div className="input_container">
            <select
              name="TitleFontWeight"
              id="TitleFontWeight"
              value={TitleFontWeight}
              onChange={(e) => setTitleFontWeight(e.target.value)}
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
            Apply Font-Family
          </label>
          <div className="current">
            <p>Current FontFamily - &nbsp; {TitleFont}</p>
          </div>
          <div className="input_container">
            <select
              name="TitleFont"
              id="TitleFont"
              value={TitleFont}
              onChange={(e) => setTitleFont(e.target.value)}
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
              <input type="radio" name="start" id="start" value={TitlePosition} 
                 checked={TitlePosition === 'start'}
              onChange={(e)=>setTitlePosition('start')}/>
              <label htmlFor="start">Start</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="center" id="center" value={TitlePosition} onChange={(e)=>setTitlePosition('center')}
              
              checked={TitlePosition === 'center'}/>

            
              <label htmlFor="center">Middle</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="end" id="end" value={TitlePosition} onChange={(e)=>setTitlePosition('end')}
              
              checked={TitlePosition === 'end'}/>

            
              <label htmlFor="end">End</label>
            </div>
          </div>
        </div>
<p style={{gridColumn:'1/-1',borderTop:'2px solid #EBEBEB',margin:'10px 0px'}} />
<div className="form_group">
          <label className="form_label" for="TitleColor">
            Sub-Title Color
          </label>

          <ChromePicker
            className="colourPicker"
            color={SubTitleColor}
            onChange={(e) => setSubTitleColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{SubTitleColor}</strong>
          </h2>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Adjust Font-Size
          </label>
          <div className="current">
            <p>
              Current FontSize - &nbsp; {SubTitleSize}
              {TitleUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="SubTitleSize"
              id="SubTitleSize"
              value={SubTitleSize}
              onChange={(e) => setSubTitleSize(e.target.value)}
            />
            <select
              name="SubTitleUnit"
              id="SubTitleUnit"
              value={SubTitleUnit}
              onChange={(e) => setSubTitleUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>

          <label className="form_label" for="BannerHeight">
            Adjust Font-Wight
          </label>
          <div className="current">
            <p>Current FontWeight - &nbsp; {SubTitleFontWeight}</p>
          </div>
          <div className="input_container">
            <select
              name="SubTitleFontWeight"
              id="SubTitleFontWeight"
              value={SubTitleFontWeight}
              onChange={(e) => setSubTitleFontWeight(e.target.value)}
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
            Apply Font-Family
          </label>
          <div className="current">
            <p>Current FontFamily - &nbsp; {SubTitleFont}</p>
          </div>
          <div className="input_container">
            <select
              name="SubTitleFont"
              id="SubTitleFont"
              value={SubTitleFont}
              onChange={(e) => setSubTitleFont(e.target.value)}
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
          <label className="form_label" for="SubTitlePosition">
            Adjust Title Position
          </label>

          <div className="radio_inputs">
            <div className="radio_input">
              <input type="radio" name="start" id="start" value={SubTitlePosition} 
                 checked={SubTitlePosition === 'start'}
              onChange={(e)=>setSubTitlePosition('start')}/>
              <label htmlFor="start">Start</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="center" id="center" value={SubTitlePosition} onChange={(e)=>setSubTitlePosition('center')}
              
              checked={SubTitlePosition === 'center'}/>

            
              <label htmlFor="center">Middle</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="end" id="end" value={SubTitlePosition} onChange={(e)=>setSubTitlePosition('end')}
              
              checked={SubTitlePosition === 'end'}/>

            
              <label htmlFor="end">End</label>
            </div>
          </div>
        </div>
        <div className="form_actions">
          {TitleThemeUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Title_Design;
