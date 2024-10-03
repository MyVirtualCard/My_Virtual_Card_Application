import React, { useState } from "react";
import "./Vcard_Theme.scss";
import { ChromePicker } from "react-color";
const Vcard_Theme = () => {
  let [VCardColour, setVCardColour] = useState("#fff");
  let[VCardTextColour,setVCardTextColour]=useState('#000')
  return (
    <>
      <div className="VCardTheme_container">
        <div className="First_colour">
          <div className="theme_title">
            <h5>Vcard Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={VCardColour}
            onChange={(e) => setVCardColour(e.hex)}
          />

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
      </div>
    </>
  );
};

export default Vcard_Theme;
