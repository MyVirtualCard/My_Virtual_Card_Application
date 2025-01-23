import React, { useState,useEffect,useContext } from 'react'
import './Gallery_Design.scss'
import { Range } from "react-range";
import axios from 'axios';
import { toast } from "react-toastify";
import { AppContext } from '../../../../Context/AppContext';
const Gallery_Design = () => {
let{
   URL_Alies,
   Token,
   ImageBorderRadius,setImageBorderRadius,
   GalleryUpdateToggle,setGalleryUpdateToggle,
}=useContext(AppContext)

  return (
   <div className="gallery_design_container">
       <form action="">
        <div className="form_group ">
          <label className="form_label" htmlFor="ImageBorderRadius">
            Adjust Image Border Radius
          </label>
          <div className="current">
            <p>Current Border Radius - &nbsp; {ImageBorderRadius}px</p>
          </div>

          <Range
            label="Select your value"
            step={0.1}
            min={0}
            max={100}
            values={ImageBorderRadius}
            onChange={(ImageBorderRadius) => setImageBorderRadius(ImageBorderRadius)}
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
            {GalleryUpdateToggle ? (
              <button type="submit">Update</button>
            ) : (
              <button type="submit">Save</button>
            )}
          </div>
      </form>
   </div>
  )
}

export default Gallery_Design;
