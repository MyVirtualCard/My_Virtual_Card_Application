import React, { useEffect, useContext, useState } from "react";
import "./Time_Design.scss";
import { Range } from "react-range";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Time_Design = () => {
  let {
    TimerBackColour,
    setTimerBackColour,
    TimerTextColour,
    setTimerTextColour,
    TimerTitleColor,
    setTimerTitleColor,
    TimerSubTitleColor,
    setTimerSubTitleColor,
    TimerBoxBorderRadius,
    setTimerBoxBorderRadius,
    TimerUpdateToggle,
    setTimerUpdateToggle,
    setFormSubmitLoader,
    URL_Alies,
    Token,
  } = useContext(AppContext);

  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  // Create Vcard Theme
  async function handleTimerThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      TimerBackColour: TimerBackColour,
      TimerTextColour: TimerTextColour,
      TimerTitleColor: TimerTextColour,
      TimerSubTitleColor: TimerSubTitleColor,
      TimerBoxBorderRadius: TimerBoxBorderRadius,
    };
    try {
      await api
        .post(`/timer_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setFormSubmitLoader(false);
          setTimerUpdateToggle(true);
        })
        .catch((error) => {
          setFormSubmitLoader(false);
          setTimerUpdateToggle(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setTimerUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleTimerThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      TimerBackColour: TimerBackColour,
      TimerTextColour: TimerTextColour,
      TimerTitleColor: TimerTextColour,
      TimerSubTitleColor: TimerSubTitleColor,
      TimerBoxBorderRadius: TimerBoxBorderRadius,
    };
    try {
      await api
        .put(`/timer_theme/${URL_Alies}`, data, {
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
    <>
      <div className="Dynamic_timer_theme_container">
        <form
          action=""
          onSubmit={
            TimerUpdateToggle ? handleTimerThemeUpdate : handleTimerThemeSubmit
          }
        >
          <div className="First_colour">
            <div className="theme_title">
              <h5>Timer Box Background Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TimerBackColour}
              onChange={(e) => setTimerBackColour(e.hex)}
            />
            {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

            <h2>
              You Picked - &nbsp;<strong>{TimerBackColour}</strong>
            </h2>
          </div>
        
        
          <div className="First_colour">
            <div className="theme_title">
              <h5>Timer Heading Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TimerTitleColor}
              onChange={(e) => setTimerTitleColor(e.hex)}
            />
            {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

            <h2>
              You Picked - &nbsp;<strong>{TimerTitleColor}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>Timer Sub-Title Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TimerSubTitleColor}
              onChange={(e) => setTimerSubTitleColor(e.hex)}
            />

            <h2>
              You Picked - &nbsp;<strong>{TimerSubTitleColor}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>Timer Text Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TimerTextColour}
              onChange={(e) => setTimerTextColour(e.hex)}
            />

            <h2>
              You Picked - &nbsp;<strong>{TimerTextColour}</strong>
            </h2>
          </div>
          <div className="form_group ">
            <label className="form_label" htmlFor="TimerBoxBorderRadius">
              Adjust Box Border Radius
            </label>
            <div className="current">
              <p>Current Border Radius - &nbsp; {TimerBoxBorderRadius}px</p>
            </div>

            <Range
              label="Select your value"
              step={0.1}
              min={0}
              max={50}
              values={TimerBoxBorderRadius}
              onChange={(TimerBoxBorderRadius) =>
                setTimerBoxBorderRadius(TimerBoxBorderRadius)
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

          <div className="form_actions">
            {TimerUpdateToggle ? (
              <button type="submit">Update</button>
            ) : (
              <button type="submit">Save</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Time_Design;
