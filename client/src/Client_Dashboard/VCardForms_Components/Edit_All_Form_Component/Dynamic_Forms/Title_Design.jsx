import React, { useState, useContext, useEffect } from "react";
import "./Title_Design.scss";
import { ChromePicker } from "react-color";
import Context from "../../../../Context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
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
    setFormSubmitLoader,
    URL_Alies,
    user,
  } = useContext(Context);


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
  // Fetch Vcard Theme
  async function handleTitleThemeFetch() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/title_theme/${URL_Alies}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            setFormSubmitLoader(false);
            setUpdateToggle(false);
          } else {
            setTitleColor(res.data.data[0].TitleColor);
            setTitleSize(res.data.data[0].TitleSize);
            setTitleUnit(res.data.data[0].TitleUnit);
            setTitleFontWeight(res.data.data[0].TitleFontWeight);
            setTitleFont(res.data.data[0].TitleFont);
            setTitlePosition(res.data.data[0].TitlePosition);
            
            setUpdateToggle(true);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          // toast.error(error.response.data.message);
          setFormSubmitLoader(false);
          setUpdateToggle(false);
        });
    } catch (error) {
      toast.error(error.message);
      setFormSubmitLoader(false);
      setUpdateToggle(false);
    }
  }

  useEffect(() => {
    handleTitleThemeFetch();
  }, []);
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
    };
    try {
      await api
        .post(`/title_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res.data)
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
    };
    try {
      await api
        .put(`/title_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
      <form action="" onSubmit={UpdateToggle ? handleTitleThemeUpdate : handleTitleThemeSubmit}>
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

        <div className="form_actions">
          {UpdateToggle ? (
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
