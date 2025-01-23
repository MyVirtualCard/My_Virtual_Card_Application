import React, { useContext, useState, useEffect } from "react";
import "./Vcard_Theme.scss";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import axios from "axios";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import { AppContext } from "../../../../Context/AppContext";
const Vcard_Theme = () => {
  let {
    FormSubmitLoader,
    VCardColour,
    setVCardColour,
    VCardTextColour,
    setVCardTextColour,
    SVG_Design,
    setSVG_Design,
    setFormSubmitLoader,
    WebsiteBackgroundType,
    setWebsiteBackgroundType,
    WebsiteBackImageAddress,
    setWebsiteBackImageAddress,
    VcardThemeUpdateToggle,
    setVcardThemeUpdateToggle,
    DesktopViewBackColor,
    setDesktopViewBackColor,
    LinearGradient,
    setLinearGradient,
    DesktopViewBackColor2,
    setDesktopViewBackColor2,
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
  // Handler function for the change event
  const handleWebsiteBackColorTypeChange = (event) => {
    setWebsiteBackgroundType(event.target.value);
  };
  const backgroundColorStyle = {
    background: LinearGradient
      ? `linear-gradient(90deg, ${DesktopViewBackColor}, ${DesktopViewBackColor2})`
      : DesktopViewBackColor,
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${WebsiteBackImageAddress})`,
    width:'100%',
    height:'200px',
   
  };
  // Create Vcard Theme
  async function handleVcardThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      VCardColour: VCardColour,
      VCardTextColour: VCardTextColour,
      WebsiteBackgroundType: WebsiteBackgroundType,
      WebsiteBackImageAddress: WebsiteBackImageAddress,
      LinearGradient: LinearGradient,
      DesktopViewBackColor: DesktopViewBackColor,
      DesktopViewBackColor2: DesktopViewBackColor2,
      SVG_Design: SVG_Design,
    };
    try {
      await api
        .post(`/vcard_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setVcardThemeUpdateToggle(true);
          setFormSubmitLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFormSubmitLoader(false);
          setVcardThemeUpdateToggle(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
      setVcardThemeUpdateToggle(false);
      setFormSubmitLoader(false);
    }
  }

  // Update Vcard Theme
  async function handleVcardThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      VCardColour: VCardColour,
      LinearGradient: LinearGradient,
      WebsiteBackgroundType: WebsiteBackgroundType,
      WebsiteBackImageAddress: WebsiteBackImageAddress,
      DesktopViewBackColor: DesktopViewBackColor,
      DesktopViewBackColor2: DesktopViewBackColor2,
      VCardTextColour: VCardTextColour,
      SVG_Design: SVG_Design,
    };
    try {
      await api
        .put(`/vcard_theme/${URL_Alies}`, data, {
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
      <div className="VCardTheme_container">
        <form
          action=""
          onSubmit={
            VcardThemeUpdateToggle
              ? handleVcardThemeUpdate
              : handleVcardThemeSubmit
          }
        >
          <div className="image_upload_type">
            <div className="logo_type">
              <label htmlFor="WebsiteBackgroundType">Website Background</label>
              <select
                name="WebsiteBackgroundType"
                id="WebsiteBackgroundType"
                onChange={handleWebsiteBackColorTypeChange}
                value={WebsiteBackgroundType}
              >
                <option>Background-Color</option>
                <option>Background-Image</option>
              </select>
            </div>
          </div>
          {WebsiteBackgroundType === "Background-Color" ? (
            <>
              <div className="title">
                <small>Website Background color</small>
                <div className="toggle">
                  <small>Linear Gradient</small>
                  {LinearGradient ? (
                    <BsToggleOn
                      onClick={() => setLinearGradient(false)}
                      className="iconOn"
                    />
                  ) : (
                    <BsToggleOff
                      className="icon"
                      onClick={() => setLinearGradient(true)}
                    />
                  )}
                </div>
              </div>
              <div className="First_colour">
                <ChromePicker
                  className="colourPicker"
                  color={DesktopViewBackColor}
                  onChange={(e) => setDesktopViewBackColor(e.hex)}
                />

                <h2>
                  You Picked - &nbsp;<strong>{VCardColour}</strong>
                </h2>
              </div>
              {LinearGradient ? (
                <div className="First_colour">
                  <ChromePicker
                    className="colourPicker"
                    color={DesktopViewBackColor2}
                    onChange={(e) => setDesktopViewBackColor2(e.hex)}
                  />

                  <h2>
                    You Picked - &nbsp;<strong>{VCardColour}</strong>
                  </h2>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <div className="title">
                <small>Website Background Image</small>
              </div>
              <div className="paste_image_address_container">
                {/* //Banner Type */}
                <div className="form_group url_link_input_group">
                  <label htmlFor="VCardName">
                    Paste Background Image-Address
                  </label>
                  {!FormSubmitLoader ? (
                    <img
                      src={
                        WebsiteBackImageAddress != null &&
                        WebsiteBackImageAddress != undefined &&
                        WebsiteBackImageAddress.length > 0
                          ? WebsiteBackImageAddress
                          : "https://img.freepik.com/free-vector/illustration-cloud-storage_53876-37579.jpg?t=st=1723314357~exp=1723317957~hmac=c0048a06d35bbbc842bf16e401a16913a6c3237aa9c0fce7bed26b10f401c942&w=996"
                      }
                      alt=""
                      className="banner_address_image"
                    />
                  ) : (
                    ""
                  )}

                  <input
                    type="text"
                    placeholder="Paste Your Banner Address!"
                    name="BannerAddress"
                    id="BannerAddress"
                    value={WebsiteBackImageAddress}
                    onChange={(e) => setWebsiteBackImageAddress(e.target.value)}
                  />
                  <div className="clear_action">
                    <button
                      className="clear_btn"
                      type="button"
                      onClick={() => setWebsiteBackImageAddress("")}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={`First_colour ${LinearGradient ? "full_row" : ""}`}>
            <div className="theme_title">
              <h5>Preview Website Background Colour</h5>
            </div>

            <div
              className="lap_background"
              style={
                WebsiteBackgroundType === "Background-Color"
                  ? backgroundColorStyle
                  : backgroundImageStyle
              }
            >
              <small>
                Website <br />
                Back-color
              </small>
              <div
                className="vcardback"
                style={{ backgroundColor: VCardColour }}
              >
                <small style={{ color: VCardTextColour }}>
                  Vcard Back-color
                </small>
              </div>
            </div>

            <h2>
              You Picked - &nbsp;<strong>{VCardColour}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>Vcard Background Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={VCardColour}
              onChange={(e) => setVCardColour(e.hex)}
            />
            {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

            <h2>
              You Picked - &nbsp;<strong>{VCardColour}</strong>
            </h2>
          </div>
          <div className="First_colour">
            <div className="theme_title">
              <h5>Vcard Text Colour</h5>
            </div>

            <ChromePicker
              className="colourPicker"
              color={VCardTextColour}
              onChange={(e) => setVCardTextColour(e.hex)}
            />

            <h2>
              You Picked - &nbsp;<strong>{VCardTextColour}</strong>
            </h2>
          </div>

          <div className="First_colour svg_design_group">
            <div className="theme_title">
              <h5>Vcard SVG Design</h5>
              <div className="link">
                <i className="bx bx-link-alt"></i>
                <a
                  href="https://getwaves.io/"
                  target="_blank"
                  rel="noopener
                "
                >
                  Get SVG Design
                </a>
              </div>
            </div>

            <textarea
              name="svg_design"
              id="svg_design"
              rows="10"
              value={SVG_Design}
              onChange={(e) => setSVG_Design(e.target.value)}
              placeholder="Paste Your SVG Design.."
            ></textarea>
            <div className="preview_container">
              <div className="title">
                <h2>Demo Preview</h2>
              </div>
              <div className="preview">
                <HtmlRenderer htmlString={SVG_Design} />
              </div>
            </div>
          </div>

          <div className="form_actions">
            {VcardThemeUpdateToggle ? (
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

export default Vcard_Theme;
