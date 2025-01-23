import React, { useContext, useState } from "react";
import "./Feedback_Theme.scss";
import { Range } from "react-range";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Feedback_Theme = () => {
  let {
    setFormSubmitLoader ,
    URL_Alies,
    Token,
    FeedbackInputDesign,
    setFeedbackInputDesign,
    FeedbackLabelColor,
    setFeedbackLabelColor,
    FeedbackInputBorderColor,
    setFeedbackInputBorderColor,
    FeedbackInputBorderOnFocus,
    setFeedbackInputBorderOnFocus,
    FeedbackPlaceholderColor,
    setFeedbackPlaceholderColor,
    FeedbackInputError,
    setFeedbackInputError,
    FeedbackInputColor,
    setFeedbackInputColor,
    FeedbackUpdateToggle,
    setFeedbackUpdateToggle,
  } = useContext(AppContext);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  // Create Vcard Theme
  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      FeedbackInputDesign: FeedbackInputDesign,
      FeedbackLabelColor: FeedbackLabelColor,
      FeedbackInputBorderColor:FeedbackInputBorderColor,
      FeedbackInputBorderOnFocus: FeedbackInputBorderOnFocus,
      FeedbackPlaceholderColor: FeedbackPlaceholderColor,
      FeedbackInputError: FeedbackInputError,
      FeedbackInputColor: FeedbackInputColor,
   
    };
    try {
      await api
        .post(`/feedback_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setFeedbackUpdateToggle(true);
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          setFeedbackUpdateToggle(false);
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      setFeedbackUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleFeedbackThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      FeedbackInputDesign: FeedbackInputDesign,
      FeedbackLabelColor: FeedbackLabelColor,
      FeedbackInputBorderColor:FeedbackInputBorderColor,
      FeedbackInputBorderOnFocus: FeedbackInputBorderOnFocus,
      FeedbackPlaceholderColor: FeedbackPlaceholderColor,
      FeedbackInputError: FeedbackInputError,
      FeedbackInputColor: FeedbackInputColor,
    };
    try {
      await api
        .put(`/feedback_theme/${URL_Alies}`, data, {
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
    <div className="feedback_theme_container">
      <div className="feedback_title">
        <h4>Form Input Theme Design</h4>
      </div>
      <form
        action=""
        onSubmit={
          FeedbackUpdateToggle
            ? handleFeedbackThemeUpdate
            : handleFeedbackSubmit
        }
      >
        <div className="First_colour">
          <div className="theme_title">
            <h5>Label Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackLabelColor}
            onChange={(e) => setFeedbackLabelColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{FeedbackLabelColor}</strong>
          </h2>
        </div>

        <div className="First_colour">
          <div className="theme_title">
            <h5>Border Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackInputBorderColor}
            onChange={(e) => setFeedbackInputBorderColor(e.hex)}
          />
          <h2>
            You Picked - &nbsp;<strong>{FeedbackInputBorderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>PlaceHolder Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackPlaceholderColor}
            onChange={(e) => setFeedbackPlaceholderColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{FeedbackPlaceholderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackInputColor}
            onChange={(e) => setFeedbackInputColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{FeedbackInputColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input OnFocus Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackInputBorderOnFocus}
            onChange={(e) => setFeedbackInputBorderOnFocus(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{FeedbackInputBorderOnFocus}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Error Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={FeedbackInputError}
            onChange={(e) => setFeedbackInputError(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{FeedbackInputError}</strong>
          </h2>
        </div>
        <div className="form_group radio_group">
          <div className="radio_input">
            <div className="radio">
              <input
                type="radio"
                name="Design1"
                id="Design1"
                value={FeedbackInputDesign}
                checked={FeedbackInputDesign === "Design1"}
                onChange={(e) => setFeedbackInputDesign("Design1")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design2"}
                  onChange={(e) => setFeedbackInputDesign("Design2")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design3"}
                  onChange={(e) => setFeedbackInputDesign("Design3")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design4"}
                  onChange={(e) => setFeedbackInputDesign("Design4")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design5"}
                  onChange={(e) => setFeedbackInputDesign("Design5")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design6"}
                  onChange={(e) => setFeedbackInputDesign("Design6")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design7"}
                  onChange={(e) => setFeedbackInputDesign("Design7")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design8"}
                  onChange={(e) => setFeedbackInputDesign("Design8")}
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
                  value={FeedbackInputDesign}
                  checked={FeedbackInputDesign === "Design9"}
                  onChange={(e) => setFeedbackInputDesign("Design9")}
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
          {FeedbackUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Feedback_Theme;
