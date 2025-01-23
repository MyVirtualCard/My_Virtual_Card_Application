import React, { useContext, useState } from "react";
import "./Inquiry_Theme.scss";
import { Range } from "react-range";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Inquiry_Theme = () => {
  let {
    setFormSubmitLoader ,
    URL_Alies,
    Token,
    InquiryInputDesign,
    setInquiryInputDesign,
    InquiryLabelColor,
    setInquiryLabelColor,
    InquiryInputBorderColor,
    setInquiryInputBorderColor,
    InquiryInputBorderOnFocus,
    setInquiryInputBorderOnFocus,
    InquiryPlaceholderColor,
    setInquiryPlaceholderColor,
    InquiryInputError,
    setInquiryInputError,
    InquiryInputColor,
    setInquiryInputColor,
    InquiryUpdateToggle,
    setInquiryUpdateToggle,
  } = useContext(AppContext);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  // Create Vcard Theme
  async function handleInquirySubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      InquiryInputDesign: InquiryInputDesign,
      InquiryLabelColor: InquiryLabelColor,
      InquiryInputBorderColor:InquiryInputBorderColor,
      InquiryInputBorderOnFocus: InquiryInputBorderOnFocus,
      InquiryPlaceholderColor: InquiryPlaceholderColor,
      InquiryInputError: InquiryInputError,
      InquiryInputColor: InquiryInputColor,
   
    };
    try {
      await api
        .post(`/inquiry_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setInquiryUpdateToggle(true);
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          setInquiryUpdateToggle(false);
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      setInquiryUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleInquiryThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      InquiryInputDesign: InquiryInputDesign,
      InquiryLabelColor: InquiryLabelColor,
      InquiryInputBorderColor:InquiryInputBorderColor,
      InquiryInputBorderOnFocus: InquiryInputBorderOnFocus,
      InquiryPlaceholderColor: InquiryPlaceholderColor,
      InquiryInputError: InquiryInputError,
      InquiryInputColor: InquiryInputColor,
    };
    try {
      await api
        .put(`/inquiry_theme/${URL_Alies}`, data, {
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
  }

  return (
    <div className="inquiry_theme_container">
      <div className="inquiry_title">
        <h4>Form Input Theme Design</h4>
      </div>
      <form
        action=""
        onSubmit={
          InquiryUpdateToggle
            ? handleInquiryThemeUpdate
            : handleInquirySubmit
        }
      >
        <div className="First_colour">
          <div className="theme_title">
            <h5>Label Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryLabelColor}
            onChange={(e) => setInquiryLabelColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InquiryLabelColor}</strong>
          </h2>
        </div>

        <div className="First_colour">
          <div className="theme_title">
            <h5>Border Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryInputBorderColor}
            onChange={(e) => setInquiryInputBorderColor(e.hex)}
          />
          <h2>
            You Picked - &nbsp;<strong>{InquiryInputBorderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>PlaceHolder Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryPlaceholderColor}
            onChange={(e) => setInquiryPlaceholderColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InquiryPlaceholderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryInputColor}
            onChange={(e) => setInquiryInputColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InquiryInputColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input OnFocus Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryInputBorderOnFocus}
            onChange={(e) => setInquiryInputBorderOnFocus(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InquiryInputBorderOnFocus}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Error Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InquiryInputError}
            onChange={(e) => setInquiryInputError(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InquiryInputError}</strong>
          </h2>
        </div>
        <div className="form_group radio_group">
          <div className="radio_input">
            <div className="radio">
              <input
                type="radio"
                name="Design1"
                id="Design1"
                value={InquiryInputDesign}
                checked={InquiryInputDesign === "Design1"}
                onChange={(e) => setInquiryInputDesign("Design1")}
              />
              <label htmlFor="Design1">Design-1</label>
            </div>
            <div className="design_input Design1">
              <input
                type="text"
                className="Design1"
                placeholder="Select Design-1"
              />
              <div className="icon">
                <i className="bx bxs-user"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="form_group radio_group ">
          <div className="radio_inputs">
            <div className="radio_input">
              <div className="radio">
                <input
                  type="radio"
                  name="Design2"
                  id="Design2"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design2"}
                  onChange={(e) => setInquiryInputDesign("Design2")}
                />
                <label htmlFor="Design2">Design-2</label>
              </div>
              <div className="design_input Design2">
                <input
                  type="text"
                  className="Design2"
                  placeholder="Select Design-2"
                />

                <div className="icon">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design3"
                  id="Design3"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design3"}
                  onChange={(e) => setInquiryInputDesign("Design3")}
                />
                <label htmlFor="Design3">Design-3</label>
              </div>
              <div className="design_input Design3">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design3"
                  placeholder="Select Design-3"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design4"
                  id="Design4"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design4"}
                  onChange={(e) => setInquiryInputDesign("Design4")}
                />
                <label htmlFor="Design3">Design-4</label>
              </div>
              <div className="design_input Design4">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design4"
                  placeholder="Select Design-4"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design5"
                  id="Design5"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design5"}
                  onChange={(e) => setInquiryInputDesign("Design5")}
                />
                <label htmlFor="Design5">Design-5</label>
              </div>
              <div className="design_input Design5">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design5"
                  placeholder="Select Design-5"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design6"
                  id="Design6"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design6"}
                  onChange={(e) => setInquiryInputDesign("Design6")}
                />
                <label htmlFor="Design6">Design-6</label>
              </div>
              <div className="design_input Design6">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design6"
                  placeholder="Select Design-6"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design7"
                  id="Design7"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design7"}
                  onChange={(e) => setInquiryInputDesign("Design7")}
                />
                <label htmlFor="Design7">Design-7</label>
              </div>
              <div className="design_input Design7">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design7"
                  placeholder="Select Design-7"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design8"
                  id="Design8"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design8"}
                  onChange={(e) => setInquiryInputDesign("Design8")}
                />
                <label htmlFor="Design6">Design-8</label>
              </div>
              <div className="design_input Design8">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design8"
                  placeholder="Select Design-8"
                />

                <div className="iconwithlabel">
                  <i className="bx bxs-user"></i>
                </div>
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
                  name="Design9"
                  id="Design9"
                  value={InquiryInputDesign}
                  checked={InquiryInputDesign === "Design9"}
                  onChange={(e) => setInquiryInputDesign("Design9")}
                />
                <label htmlFor="Design9">Design-9</label>
              </div>
              <div className="design_input Design9">
                <label htmlFor="Select">
                  With Label <sup>*</sup>
                </label>
                <input
                  type="text"
                  className="Design9"
                  placeholder="Select Design-9"
                />

                <div className="iconwithanimation">
                  <i className="bx bxs-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form_actions">
          {InquiryUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Inquiry_Theme;
