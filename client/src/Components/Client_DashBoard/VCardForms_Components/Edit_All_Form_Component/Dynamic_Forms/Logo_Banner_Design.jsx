import React, { useContext, useEffect, useState } from "react";
import "./Logo_Banner_Design.scss";
import { Range } from "react-range";
import axios from 'axios';
import { toast } from "react-toastify";
import { AppContext } from "../../../../Context/AppContext";
const Logo_Banner_Design = () => {
  let {
    URL_Alies,
    Token,
    setFormSubmitLoader,
    BannerHeight,
    setBannerHeight,
    BannerBrightness,
    setBannerBrightness,
    LogoWidth,
    setLogoWidth,
    LogoWidthUnit,
    setLogoWidthUnit,
    LogoHeight,
    setLogoHeight,
    LogoHeightUnit,
    setLogoHeightUnit,
    LogoBorderRadius,
    setLogoBorderRadius,
    LogoBorderRadiusUnit,
    setLogoBorderRadiusUnit,
    LogoPosition,
    setLogoPosition,
    LogoTopPosition,
    setLogoTopPosition,
    LogoPositionUnit,
    setLogoPositionUnit,
    LogoLeftPosition,
    setLogoLeftPosition,
    LogoBottomPosition,
    setLogoBottomPosition,
    LogoRightPosition,
    setLogoRightPosition,
    LogoImageAnimation,setLogoImageAnimation,
    ImageThemeUpdateToggle,setImageThemeUpdateToggle,
  } = useContext(AppContext);

  useEffect(() => {
    if (LogoPosition == "relative") {
      setLogoLeftPosition("0"), setLogoRightPosition("0");
      setLogoBottomPosition("0");
      setLogoTopPosition("0");
    } else {
      setLogoLeftPosition(LogoLeftPosition), setLogoRightPosition("0");
      setLogoBottomPosition("0");
      setLogoTopPosition(LogoTopPosition);
    }
  }, [LogoPosition == "relative"]);
  let [UpdateToggle, setUpdateToggle] = useState(false);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  // Create Vcard Theme
  async function handleImageThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      BannerHeight:BannerHeight,
      BannerBrightness:BannerBrightness,
      LogoWidth:LogoWidth,
      LogoWidthUnit:LogoWidthUnit,
      LogoHeight:LogoHeight,
      LogoHeightUnit:LogoHeightUnit,
      LogoBorderRadius:LogoBorderRadius,
      LogoBorderRadiusUnit:LogoBorderRadiusUnit,
      LogoPosition:LogoPosition,
      LogoTopPosition:LogoTopPosition,
      LogoLeftPosition:LogoLeftPosition,
      LogoImageAnimation:LogoImageAnimation,
      LogoPositionUnit:LogoPositionUnit,

    };
    try {
      await api
        .post(`/image_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setImageThemeUpdateToggle(true)
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          setImageThemeUpdateToggle(false)
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      
      setImageThemeUpdateToggle(false)
      setFormSubmitLoader(false);
    }
  };

  // Update Vcard Theme
  async function handleImageThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      BannerHeight:BannerHeight,
      BannerBrightness:BannerBrightness,
      LogoWidth:LogoWidth,
      LogoWidthUnit:LogoWidthUnit,
      LogoHeight:LogoHeight,
      LogoHeightUnit:LogoHeightUnit,
      LogoBorderRadius:LogoBorderRadius,
      LogoBorderRadiusUnit:LogoBorderRadiusUnit,
      LogoPosition:LogoPosition,
      LogoTopPosition:LogoTopPosition,
      LogoLeftPosition:LogoLeftPosition,
      LogoImageAnimation:LogoImageAnimation,
      LogoPositionUnit:LogoPositionUnit,
    };
    try {
      await api
        .put(`/image_theme/${URL_Alies}`, data, {
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
    <div className="logo_banner_design_container">
      <form action="" onSubmit={ImageThemeUpdateToggle ? handleImageThemeUpdate : handleImageThemeSubmit}>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Banner Height
          </label>
          <div className="current">
            <p>Current Height - &nbsp; {BannerHeight} &nbsp;px</p>
          </div>

          <Range
            label="Select your value"
            step={0.1}
            min={200}
            max={600}
            values={BannerHeight}
            onChange={(BannerHeight) => setBannerHeight(BannerHeight)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "100%",
                  backgroundColor: "royalBlue",
                  borderRadius: "5px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "18px",
                  width: "18px",
                  backgroundColor: "tomato",
                  borderRadius: "50%",
                  outline: "none",
                }}
              />
            )}
          />
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Banner Brightness
          </label>
          <div className="current">
            <p>Current Brightness - &nbsp; {BannerBrightness} &nbsp;%</p>
          </div>

          <Range
            label="Select your value"
            step={0.1}
            min={25}
            max={200}
            values={BannerBrightness}
            onChange={(BannerBrightness) =>
              setBannerBrightness(BannerBrightness)
            }
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "100%",
                  backgroundColor: "royalBlue",
                  borderRadius: "5px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "18px",
                  width: "18px",
                  backgroundColor: "tomato",
                  borderRadius: "50%",
                  outline: "none",
                }}
              />
            )}
          />
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-1"
                  id="Animation-1"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-1"}
                  onChange={(e) => setLogoImageAnimation("Animation-1")}
                />
                <label htmlFor="Design1">Animation-1</label>
              </div>
              <div className="logo_design Animation-1 ">
               
               <img className="Animation-1" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-2"
                  id="Animation-2"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-2"}
                  onChange={(e) => setLogoImageAnimation("Animation-2")}
                />
                <label htmlFor="Design1">Animation-2</label>
              </div>
              <div className="logo_design Animation-2 ">
               
               <img className="Animation-2" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-3"
                  id="Animation-3"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-3"}
                  onChange={(e) => setLogoImageAnimation("Animation-3")}
                />
                <label htmlFor="Design1">Animation-3</label>
              </div>
              <div className="logo_design Animation-3 ">
               
               <img className="Animation-3" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-4"
                  id="Animation-4"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-4"}
                  onChange={(e) => setLogoImageAnimation("Animation-4")}
                />
                <label htmlFor="Design1">Animation-4</label>
              </div>
              <div className="logo_design Animation-4 ">
               
               <img className="Animation-4" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-5"
                  id="Animation-5"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-5"}
                  onChange={(e) => setLogoImageAnimation("Animation-5")}
                />
                <label htmlFor="Design1">Animation-5</label>
              </div>
              <div className="logo_design Animation-5 ">
               
               <img className="Animation-5" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Animation-6"
                  id="Animation-6"
                  value={LogoImageAnimation}
                  checked={LogoImageAnimation === "Animation-6"}
                  onChange={(e) => setLogoImageAnimation("Animation-6")}
                />
                <label htmlFor="Design1">Animation-6</label>
              </div>
              <div className="logo_design Animation-6 ">
               
               <img className="Animation-6" src="https://img.freepik.com/premium-photo/professional-palette-stylish-office-desk-showcase_941561-25808.jpg?uid=R79330344&ga=GA1.2.111147909.1717157513&semt=ais_hybrid-rr-similar" alt="logo" />
                
              </div>
            </div>
          </div>
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Logo Width
          </label>
          <div className="current">
            <p>
              Current Width - &nbsp; {LogoWidth}
              {LogoWidthUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="LogoWidth"
              id="LogoWidth"
              value={LogoWidth}
              onChange={(e) => setLogoWidth(e.target.value)}
            />
            <select
              name="LogoWidthUnit"
              id="LogoWidthUnit"
              value={LogoWidthUnit}
              onChange={(e) => setLogoWidthUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Logo Height
          </label>
          <div className="current">
            <p>
              Current Height - &nbsp; {LogoHeight}
              {LogoHeightUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="LogoHeight"
              id="LogoHeight"
              value={LogoHeight}
              onChange={(e) => setLogoHeight(e.target.value)}
            />
            <select
              name="LogoHeightUnit"
              id="LogoHeightUnit"
              value={LogoHeightUnit}
              onChange={(e) => setLogoHeightUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Logo Border Radius
          </label>
          <div className="current">
            <p>
              Current Border Radius - &nbsp; {LogoBorderRadius}
              {LogoBorderRadiusUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="LogoBorderRadius"
              id="LogoBorderRadius"
              value={LogoBorderRadius}
              onChange={(e) => setLogoBorderRadius(e.target.value)}
            />
            <select
              name="LogoBorderRadiusUnit"
              id="LogoBorderRadiusUnit"
              value={LogoBorderRadiusUnit}
              onChange={(e) => setLogoBorderRadiusUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
              <option value="%">%</option>
            </select>
          </div>
        </div>
        <div className="form_group">
          <label className="form_label" htmlFor="BannerHeight">
            Adjust Logo Position
          </label>
          <div className="current">
            <p>Current Position - &nbsp; {LogoPosition}</p>
          </div>
          <div className="input_container">
            <select
              name="LogoPosition"
              id="LogoPosition"
              value={LogoPosition}
              onChange={(e) => {
                setLogoPosition(e.target.value);
              }}
            >
              <option value="absolute">Absolute</option>
              <option value="relative">Relative</option>
              <option value="sticky">Sticky</option>
            </select>
          </div>
        </div>
        {LogoPosition == "absolute" || LogoPosition == "sticky" ? (
          <>
            {/* Top position */}
            <div className="form_group">
              <label className="form_label" htmlFor="BannerHeight">
                Adjust Logo Top Position
              </label>
              <div className="current">
                <p>Current Top Position - &nbsp; {LogoTopPosition}%</p>
              </div>
              <div className="input_container">
                <input
                  type="number"
                  name="LogoTopPosition"
                  id="LogoTopPosition"
                  value={LogoTopPosition}
                  onChange={(e) => setLogoTopPosition(e.target.value)}
                />
                <select
                  name="LogoPositionUnit"
                  id="LogoPositionUnit"
                  value={LogoPositionUnit}
                  onChange={(e) => setLogoPositionUnit(e.target.value)}
                >
                  <option value="%">%</option>
                </select>
              </div>
            </div>
            {/* left Poition */}
            <div className="form_group">
              <label className="form_label" htmlFor="BannerHeight">
                Adjust Logo Left Position
              </label>
              <div className="current">
                <p>Current Left Position - &nbsp; {LogoLeftPosition}%</p>
              </div>
              <div className="input_container">
                <input
                  type="number"
                  name="LogoLeftPosition"
                  id="LogoLeftPosition"
                  value={LogoLeftPosition}
                  onChange={(e) => setLogoLeftPosition(e.target.value)}
                />
                <select
                  name="LogoPositionUnit"
                  id="LogoPositionUnit"
                  value={LogoPositionUnit}
                  onChange={(e) => setLogoPositionUnit(e.target.value)}
                >
                  <option value="%">%</option>
                </select>
              </div>
            </div>
            {/* Bottom position */}
            {/* <div className="form_group">
              <label className="form_label" htmlFor="BannerHeight">
                Adjust Logo Bottom Position
              </label>
              <div className="current">
                <p>Current Bottom Position - &nbsp; {LogoBottomPosition}%</p>
              </div>
              <div className="input_container">
                <input
                  type="number"
                  name="LogoBottomPosition"
                  id="LogoBottomPosition"
                  value={LogoBottomPosition}
                  onChange={(e) => setLogoBottomPosition(e.target.value)}
                />
                <select
                  name="LogoPositionUnit"
                  id="LogoPositionUnit"
                  value={LogoPositionUnit}
                  onChange={(e) => setLogoPositionUnit(e.target.value)}
                >
                  <option value="%">%</option>
                </select>
              </div>
            </div> */}
            {/* Right Position */}
            {/* <div className="form_group">
              <label className="form_label" htmlFor="BannerHeight">
                Adjust Logo Right Position
              </label>
              <div className="current">
                <p>Current Right Position - &nbsp; {LogoRightPosition}%</p>
              </div>
              <div className="input_container">
                <input
                  type="number"
                  name="LogoRightPosition"
                  id="LogoRightPosition"
                  value={LogoRightPosition}
                  onChange={(e) => setLogoRightPosition(e.target.value)}
                />
                <select
                  name="LogoPositionUnit"
                  id="LogoPositionUnit"
                  value={LogoPositionUnit}
                  onChange={(e) => setLogoPositionUnit(e.target.value)}
                >
                  <option value="%">%</option>
                </select>
              </div>
            </div> */}
          </>
        ) : (
          ""
        )}
              <div className="form_actions">
            {ImageThemeUpdateToggle ? (
              <button type="submit">Update</button>
            ) : (
              <button type="submit">Save</button>
            )}
          </div>
      </form>
    </div>
  );
};

export default Logo_Banner_Design;
