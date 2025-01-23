import React, { useContext, useState } from "react";
import "./Testimonial_Design.scss";
import { Range } from "react-range";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";

const Testiminal_Design = () => {
  let {
    URL_Alies,Token,
    TestimonialBackColor,
    setTestimonialBackColor,
    TestimonialTextColor,
    setTestimonialTextColor,
    TestimonialTitleColor,
    setTestimonialTitleColor,
    TestimonialClientNameColor,
    setTestimonialClientNameColor,
    TestimonialBorderRadius,
    setTestimonialBorderRadius,
    TestimonialImageBorderRadius,
    setTestimonialImageBorderRadius,
    FlexDirection,
    setFlexDirection,
    UserDataFlexDirection,
    setUserDataFlexDirection,
    UserDataJustifyContent,
    setUserDataJustifyContent,
    UserDataAlignItems,
    setUserDataAlignItems,
    TestimonialUpdateToggle,
    setTestimonialUpdateToggle,
    setFormSubmitLoader,
  } = useContext(AppContext);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

    // Create Vcard Theme
    async function handleTestimonialSubmit(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        TestimonialBackColor:TestimonialBackColor,
        TestimonialTextColor:TestimonialTextColor,
        TestimonialTitleColor:TestimonialTitleColor,
        TestimonialClientNameColor:TestimonialClientNameColor,
        TestimonialBorderRadius:TestimonialBorderRadius,
        TestimonialImageBorderRadius:TestimonialImageBorderRadius,
        FlexDirection:FlexDirection,
        UserDataFlexDirection:UserDataFlexDirection,
        UserDataJustifyContent:UserDataJustifyContent,
        UserDataAlignItems:UserDataAlignItems,
      };
      try {
        await api
          .post(`/testimonial_theme/${URL_Alies}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
          setTestimonialUpdateToggle(true);
            toast.success(res.data.message);
            setFormSubmitLoader(false);
          })
          .catch((error) => {
            console.log(error)
            setTestimonialUpdateToggle(false);
            setFormSubmitLoader(false);
            toast.error(error.response.data.message);
          });
      } catch (error) {
        setTestimonialUpdateToggle(false);
        setFormSubmitLoader(false);
      }
    };
  
    // Update Vcard Theme
    async function handleTestiminalThemeUpdate(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        TestimonialBackColor:TestimonialBackColor,
        TestimonialTextColor:TestimonialTextColor,
        TestimonialTitleColor:TestimonialTitleColor,
        TestimonialClientNameColor:TestimonialClientNameColor,
        TestimonialBorderRadius:TestimonialBorderRadius,
        TestimonialImageBorderRadius:TestimonialImageBorderRadius,
        FlexDirection:FlexDirection,
        UserDataFlexDirection:UserDataFlexDirection,
        UserDataJustifyContent:UserDataJustifyContent,
        UserDataAlignItems:UserDataAlignItems,
      };
      try {
        await api
          .put(`/testimonial_theme/${URL_Alies}`, data, {
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
        
            setFormSubmitLoader(false);
            toast.error(error.response.data.message);
          });
      } catch (error) {
    
        setFormSubmitLoader(false);
      }
    };

  return (
    <>
      <div className="testimonial_design_container">
        <form action="" onSubmit={TestimonialUpdateToggle ? handleTestiminalThemeUpdate : handleTestimonialSubmit}>
          {/* Colors */}
          <div className="First_colour">
            <div className="theme_title">
              <h5>Background Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TestimonialBackColor}
              onChange={(e) => setTestimonialBackColor(e.hex)}
            />

            <h2>
              You Picked - &nbsp;<strong>{TestimonialBackColor}</strong>
            </h2>
          </div>

          <div className="First_colour">
            <div className="theme_title">
              <h5>Text Color</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TestimonialTextColor}
              onChange={(e) => setTestimonialTextColor(e.hex)}
            />
            <h2>
              You Picked - &nbsp;<strong>{TestimonialTextColor}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>Title Color</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TestimonialTitleColor}
              onChange={(e) => setTestimonialTitleColor(e.hex)}
            />
            <h2>
              You Picked - &nbsp;<strong>{TestimonialTitleColor}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>ClientName Color</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={TestimonialClientNameColor}
              onChange={(e) => setTestimonialClientNameColor(e.hex)}
            />
            <h2>
              You Picked - &nbsp;<strong>{TestimonialClientNameColor}</strong>
            </h2>
          </div>
          {/* <div className="form_group ">
            <label className="form_label" htmlFor="TimerBoxBorderRadius">
              Testimonial Border Radius
            </label>
            <div className="current">
              <p>Current Border Radius - &nbsp; {TestimonialBorderRadius}px</p>
            </div>

            <Range
              label="Select your value"
              step={0.1}
              min={0}
              max={50}
              values={TestimonialBorderRadius}
              onChange={(TestimonialBorderRadius) =>
                setTestimonialBorderRadius(TestimonialBorderRadius)
              }
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "10px",
                    width: "100%",
                    backgroundColor: "lightgreen",
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
                    backgroundColor: "gray",
                    borderRadius: "50%",
                    outline: "none",
                  }}
                />
              )}
            />
          </div> */}
          <div className="form_group">
            <label className="form_label" for="BannerHeight">
              Testimonial Border Radius
            </label>
            <div className="current">
              <p>
                Current Border Radius - &nbsp; {TestimonialBorderRadius}
                px
              </p>
            </div>
            <div className="input_container">
              <input
                type="text"
                name="TestimonialBorderRadius"
                id="TestimonialBorderRadius"
                value={TestimonialBorderRadius}
                onChange={(e) => setTestimonialBorderRadius(e.target.value)}
              />
              <select
                name="TestimonialBorderRadius"
                id="TestimonialBorderRadius"
                value="PX"
              >
                <option value="px">PX</option>
              </select>
            </div>

            {/* <label className="form_label" for="BannerHeight">
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
          </div> */}
          </div>
          <div className="form_group ">
            <label className="form_label" htmlFor="TimerBoxBorderRadius">
              Adjust Image Border Radius
            </label>
            <div className="current">
              <p>
                Current Border Radius - &nbsp; {TestimonialImageBorderRadius}px
              </p>
            </div>

            <div className="input_container">
              <input
                type="text"
                name="TestimonialImageBorderRadius"
                id="TestimonialImageBorderRadius"
                value={TestimonialImageBorderRadius}
                onChange={(e) =>
                  setTestimonialImageBorderRadius(e.target.value)
                }
              />
              <select
                name="TestimonialImageBorderRadius"
                id="TestimonialImageBorderRadius"
                value="PX"
              >
                <option value="px">PX</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label className="form_label" htmlFor="FlexDirection">
              Adjust Flex Property
            </label>
            <div className="current">
              <p>Current Direction - &nbsp; {FlexDirection}</p>
            </div>
            <div className="input_container">
              <select
                name="FlexDirection"
                id="FlexDirection"
                value={FlexDirection}
                onChange={(e) => {
                  setFlexDirection(e.target.value);
                }}
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="row-reverse">Row-Reverse</option>
                <option value="column-reverse">Column-Reverse</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label className="form_label" htmlFor="UserDataFlexDirection">
              UserData Flex Property
            </label>
            <div className="current">
              <p>Current Direction - &nbsp; {UserDataFlexDirection}</p>
            </div>
            <div className="input_container">
              <select
                name="UserDataFlexDirection"
                id="UserDataFlexDirection"
                value={UserDataFlexDirection}
                onChange={(e) => {
                  setUserDataFlexDirection(e.target.value);
                }}
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="row-reverse">Row-Reverse</option>
                <option value="column-reverse">Column-Reverse</option>
              </select>
            </div>
          </div>
          <div className="form_group radio_group">
            <label className="form_label" for="UserDataJustifyContent">
              Adjust Justify Content
            </label>

            <div className="radio_inputs">
              <div className="radio_input">
                <input
                  type="radio"
                  name="start"
                  id="start"
                  value={UserDataJustifyContent}
                  checked={UserDataJustifyContent === "start"}
                  onChange={(e) => setUserDataJustifyContent("start")}
                />
                <label htmlFor="start">Start</label>
              </div>
              <div className="radio_input">
                <input
                  type="radio"
                  name="center"
                  id="center"
                  value={UserDataJustifyContent}
                  onChange={(e) => setUserDataJustifyContent("center")}
                  checked={UserDataJustifyContent === "center"}
                />

                <label htmlFor="center">Center</label>
              </div>
              <div className="radio_input">
                <input
                  type="radio"
                  name="end"
                  id="end"
                  value={UserDataJustifyContent}
                  onChange={(e) => setUserDataJustifyContent("end")}
                  checked={UserDataJustifyContent === "end"}
                />

                <label htmlFor="end">End</label>
              </div>
            </div>
          </div>
          <div className="form_group radio_group">
            <label className="form_label" for="UserDataAlignItems">
              Adjust Align-Content
            </label>

            <div className="radio_inputs">
              <div className="radio_input">
                <input
                  type="radio"
                  name="flex-start"
                  id="flex-start"
                  value={UserDataAlignItems}
                  checked={UserDataAlignItems === "flex-start"}
                  onChange={(e) => setUserDataAlignItems("flex-start")}
                />
                <label htmlFor="flex-start">Start</label>
              </div>
              <div className="radio_input">
                <input
                  type="radio"
                  name="center1"
                  id="center1"
                  value={UserDataAlignItems}
                  onChange={(e) => setUserDataAlignItems("center")}
                  checked={UserDataAlignItems === "center"}
                />

                <label htmlFor="center1">Center</label>
              </div>
              <div className="radio_input">
                <input
                  type="radio"
                  name="end1"
                  id="end1"
                  value={UserDataAlignItems}
                  onChange={(e) => setUserDataAlignItems("flex-end")}
                  checked={UserDataAlignItems === "flex-end"}
                />

                <label htmlFor="end1">End</label>
              </div>
            </div>
          </div>
          <div className="form_actions">
          {TestimonialUpdateToggle ? (
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

export default Testiminal_Design;
