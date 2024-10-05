import React, { useContext, useState, useEffect } from "react";
import "./Vcard_Theme.scss";
import { ChromePicker } from "react-color";
import Context from "../../../../Context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
const Vcard_Theme = () => {
  let {
    VCardColour,
    setVCardColour,
    VCardTextColour,
    setVCardTextColour,
    SVG_Design,
    setSVG_Design,
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
  // Fetch Vcard Theme
  async function handleVcardThemeFetch() {
    setFormSubmitLoader(true);
    try {
      await api
        .get(`/vcard_theme/${URL_Alies}`, {
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
            setVCardColour(res.data.data[0].VCardColour);
            setVCardTextColour(res.data.data[0].VCardTextColour);
            setSVG_Design(res.data.data[0].SVG_Design);
            setUpdateToggle(true);
            setFormSubmitLoader(false);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
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
    handleVcardThemeFetch();
  }, []);
  // Create Vcard Theme
  async function handleVcardThemeSubmit(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      VCardColour: VCardColour,
      VCardTextColour: VCardTextColour,
      SVG_Design: SVG_Design,
    };
    try {
      await api
        .post(`/vcard_theme/${URL_Alies}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
     
          toast.success(res.data.data.message);
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
  async function handleVcardThemeUpdate(e) {
    e.preventDefault();
    setFormSubmitLoader(true);
    let data = {
      URL_Alies: URL_Alies,
      VCardColour: VCardColour,
      VCardTextColour: VCardTextColour,
      SVG_Design: SVG_Design,
    };
    try {
      await api
        .put(`/vcard_theme/${URL_Alies}`, data, {
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
    <>
      <div className="VCardTheme_container">
        <form action="" onSubmit={UpdateToggle ? handleVcardThemeUpdate : handleVcardThemeSubmit}>
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
            </div>

            <textarea
              name="svg_design"
              id="svg_design"
              rows="10"
              value={SVG_Design}
              onChange={(e) => setSVG_Design(e.target.value)}
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
            {UpdateToggle ? (
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
