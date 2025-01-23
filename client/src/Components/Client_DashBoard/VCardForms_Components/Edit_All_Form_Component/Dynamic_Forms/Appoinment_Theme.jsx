import React, { useContext, useState } from "react";
import "./Appoinment_Theme.scss";
import { Range } from "react-range";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Appoinment_Theme = () => {
  let {
    setFormSubmitLoader ,
    URL_Alies,
    Token,
    AppoinmentInputDesign,
    setAppoinmentInputDesign,
    LabelColor,
    setLabelColor,
    InputBorderColor,
    setInputBorderColor,
    InputBorderOnFocus,
    setInputBorderOnFocus,
    PlaceholderColor,
    setPlaceholderColor,
    InputError,
    setInputError,
    InputColor,
    setInputColor,
    AppoinmentUpdateToggle,
    setAppoinmentUpdateToggle,
  } = useContext(AppContext);
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });

  // Create Vcard Theme
  async function handleAppoinmentSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      AppoinmentInputDesign: AppoinmentInputDesign,
      LabelColor: LabelColor,
      InputBorderColor:InputBorderColor,
      InputBorderOnFocus: InputBorderOnFocus,
      PlaceholderColor: PlaceholderColor,
      InputError: InputError,
      InputColor: InputColor,
    };
    try {
      await api
        .post(`/appoinment_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          setAppoinmentUpdateToggle(true);
          toast.success(res.data.message);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          setAppoinmentUpdateToggle(false);
          setFormSubmitLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      setAppoinmentUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleAppoinmentThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      AppoinmentInputDesign: AppoinmentInputDesign,
      LabelColor: LabelColor,
      InputBorderColor:InputBorderColor,
      InputBorderOnFocus: InputBorderOnFocus,
      PlaceholderColor: PlaceholderColor,
      InputError: InputError,
      InputColor: InputColor,
    };
    try {
      await api
        .put(`/appoinment_theme/${URL_Alies}`, data, {
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
    <div className="appoinment_theme_container">
      <div className="appoinment_title">
        <h4>Form Input Theme Design</h4>
      </div>
      <form
        action=""
        onSubmit={
          AppoinmentUpdateToggle
            ? handleAppoinmentThemeUpdate
            : handleAppoinmentSubmit
        }
      >
        <div className="First_colour">
          <div className="theme_title">
            <h5>Label Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={LabelColor}
            onChange={(e) => setLabelColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{LabelColor}</strong>
          </h2>
        </div>

        <div className="First_colour">
          <div className="theme_title">
            <h5>Border Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InputBorderColor}
            onChange={(e) => setInputBorderColor(e.hex)}
          />
          <h2>
            You Picked - &nbsp;<strong>{InputBorderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>PlaceHolder Color</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={PlaceholderColor}
            onChange={(e) => setPlaceholderColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{PlaceholderColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InputColor}
            onChange={(e) => setInputColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InputColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input OnFocus Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InputBorderOnFocus}
            onChange={(e) => setInputBorderOnFocus(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InputBorderOnFocus}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Input Error Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={InputError}
            onChange={(e) => setInputError(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{InputError}</strong>
          </h2>
        </div>
        <div className="form_group radio_group">
          <div className="radio_input">
            <div className="radio">
              <input
                type="radio"
                name="Design1"
                id="Design1"
                value={AppoinmentInputDesign}
                checked={AppoinmentInputDesign === "Design1"}
                onChange={(e) => setAppoinmentInputDesign("Design1")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design2"}
                  onChange={(e) => setAppoinmentInputDesign("Design2")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design3"}
                  onChange={(e) => setAppoinmentInputDesign("Design3")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design4"}
                  onChange={(e) => setAppoinmentInputDesign("Design4")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design5"}
                  onChange={(e) => setAppoinmentInputDesign("Design5")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design6"}
                  onChange={(e) => setAppoinmentInputDesign("Design6")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design7"}
                  onChange={(e) => setAppoinmentInputDesign("Design7")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design8"}
                  onChange={(e) => setAppoinmentInputDesign("Design8")}
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
                  value={AppoinmentInputDesign}
                  checked={AppoinmentInputDesign === "Design9"}
                  onChange={(e) => setAppoinmentInputDesign("Design9")}
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
          {AppoinmentUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Appoinment_Theme;
