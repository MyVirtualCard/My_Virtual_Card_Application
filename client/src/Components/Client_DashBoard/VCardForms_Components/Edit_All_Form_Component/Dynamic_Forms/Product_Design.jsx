import React, { useContext, useState, useEffect  } from "react";
import "./Product_Design.scss";
import { ChromePicker } from "react-color";

import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../../../Context/AppContext";
const Product_Design = () => {
  let{
Token,
URL_Alies,
setFormSubmitLoader,
ProductBackColor, setProductBackColor,
ProductTextColor, setProductTextColor,
ProductTitleColor, setProductTitleColor,
ProductTitleFont, setProductTitleFont,
ProductTitleSize, setProductTitleSize,
ProductTitleUnit, setProductTitleUnit,
ProductFontWeight,setProductFontWeight,
ProductTitleAlign, setProductTitleAlign,
ProductBtnBackColor,setProductBtnBackColor,
ProductBtnTextColor,setProductBtnTextColor,
ProductBtnHoverBackColor,setProductBtnHoverBackColor,
ProductBtnHoverTextColor,setProductBtnHoverTextColor,
ProductThemeUpdateToggle,
setProductThemeUpdateToggle
  }=useContext(AppContext)


  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  
  let [UpdateToggle, setUpdateToggle] = useState(false);
  const fontFamilies = [
    "Arial",
    "Poppins",
    "Afacad Flux",
    "Montserrat",
    "Playwrite DE Grund",
    "Outfit",
    "Pacifico",
    "Georgia",
    "Courier New",
    "Tahoma",
    "Verdana",
    "Times New Roman",
    "Comic Sans MS",
    "Lucida Console",
  ];
  const fontWeight = [400, 450, 500, 550, 600, 650, 700, 750, 800];
  // Server API
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_API_URL,
  });
     // Fetch Vcard Theme
     async function handleProductThemeFetch() {
      setFormSubmitLoader(true);
      try {
        await api
          .get(`/product_theme/${URL_Alies}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            if (res.data.data.length == 0) {
              setFormSubmitLoader(false);
              setUpdateToggle(false);
            } else {
              setProductBackColor(res.data.data[0].ProductBackColor);
              setProductTextColor(res.data.data[0].ProductTextColor);
              setProductTitleColor(res.data.data[0].ProductTitleColor);
              setProductTitleFont(res.data.data[0].ProductTitleFont);
              setProductTitleSize(res.data.data[0].ProductTitleSize);
              setProductTitleUnit(res.data.data[0].ProductTitleUnit);
              setProductFontWeight(res.data.data[0].ProductFontWeight);
              setProductTitleAlign(res.data.data[0].ProductTitleAlign);
              setProductBtnBackColor(res.data.data[0].ProductBtnBackColor);
              setProductBtnTextColor(res.data.data[0].ProductBtnTextColor);
              setProductBtnHoverBackColor(res.data.data[0].ProductBtnHoverBackColor);
              setProductBtnHoverTextColor(res.data.data[0].ProductBtnHoverTextColor)
            
              setUpdateToggle(true);
              setFormSubmitLoader(false);
            }
          })
          .catch((error) => {
            // toast.error(error.response.data.message);
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
    //   handleProductThemeFetch();
    }, []);
    // Create Vcard Theme
    async function handleProductThemeSubmit(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        ProductBackColor:ProductBackColor,
        ProductTextColor:ProductTextColor,
        ProductTitleColor:ProductTitleColor,
        ProductTitleFont:ProductTitleFont,
        ProductTitleSize:ProductTitleSize,
        ProductTitleUnit:ProductTitleUnit,
        ProductFontWeight:ProductFontWeight,
        ProductTitleAlign:ProductTitleAlign,
        ProductBtnBackColor:ProductBtnBackColor,
        ProductBtnTextColor:ProductBtnTextColor,
        ProductBtnHoverBackColor:ProductBtnHoverBackColor,
        ProductBtnHoverTextColor:ProductBtnHoverTextColor,
      };
      try {
        await api
          .post(`/product_theme/${URL_Alies}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
          setProductThemeUpdateToggle(true);
            toast.success(res.data.message);
            setFormSubmitLoader(false);
          })
          .catch((error) => {
            setProductThemeUpdateToggle(false);
            setFormSubmitLoader(false);
            toast.error(error.response.data.message);
          });
      } catch (error) {
        setProductThemeUpdateToggle(false);
        setFormSubmitLoader(false);
      }
    };
  
    // Update Vcard Theme
    async function handleProductThemeUpdate(e) {
      e.preventDefault();
      setFormSubmitLoader(true);
      let data = {
        URL_Alies: URL_Alies,
        ProductBackColor:ProductBackColor,
        ProductTextColor:ProductTextColor,
        ProductTitleColor:ProductTitleColor,
        ProductTitleFont:ProductTitleFont,
        ProductTitleSize:ProductTitleSize,
        ProductTitleUnit:ProductTitleUnit,
        ProductFontWeight:ProductFontWeight,
        ProductTitleAlign:ProductTitleAlign,
        ProductBtnBackColor:ProductBtnBackColor,
        ProductBtnTextColor:ProductBtnTextColor,
        ProductBtnHoverBackColor:ProductBtnHoverBackColor,
        ProductBtnHoverTextColor:ProductBtnHoverTextColor,
      };
      try {
        await api
          .put(`/product_theme/${URL_Alies}`, data, {
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
    <div className="product_design_container">
      <form action="" onSubmit={ProductThemeUpdateToggle ? handleProductThemeUpdate : handleProductThemeSubmit}>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Product Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductBackColor}
            onChange={(e) => setProductBackColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ProductBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Product Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductTextColor}
            onChange={(e) => setProductTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ProductTextColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Product Title Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductTitleColor}
            onChange={(e) => setProductTitleColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ProductTitleColor}</strong>
          </h2>
        </div>
        <div className="form_group">
          <label className="form_label" for="BannerHeight">
            Adjust Title Font-Size
          </label>
          <div className="current">
            <p>
              Current FontSize - &nbsp; {ProductTitleSize}
              {ProductTitleUnit}
            </p>
          </div>
          <div className="input_container">
            <input
              type="number"
              name="ProductTitleSize"
              id="ProductTitleSize"
              value={ProductTitleSize}
              onChange={(e) => setProductTitleSize(e.target.value)}
            />
            <select
              name="ProductTitleUnit"
              id="ProductTitleUnit"
              value={ProductTitleUnit}
              onChange={(e) => setProductTitleUnit(e.target.value)}
            >
              <option value="px">PX</option>
              <option value="rem">REM</option>
            </select>
          </div>

          <label className="form_label" for="BannerHeight">
            Adjust Title Font-Wight
          </label>
          <div className="current">
            <p>Current FontWeight - &nbsp; {ProductFontWeight}</p>
          </div>
          <div className="input_container">
            <select
              name="ProductFontWeight"
              id="ProductFontWeight"
              value={ProductFontWeight}
              onChange={(e) => setProductFontWeight(e.target.value)}
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
            Apply Product Font-Family
          </label>
          <div className="current">
            <p>Current FontFamily - &nbsp; {ProductTitleFont}</p>
          </div>
          <div className="input_container">
            <select
              name="ProductTitleFont"
              id="ProductTitleFont"
              value={ProductTitleFont}
              onChange={(e) => setProductTitleFont(e.target.value)}
            >
              {fontFamilies.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>

        </div>
        <div className="form_group radio_group">
          <label className="form_label" for="TitlePosition">
            Adjust Title Position
          </label>

          <div className="radio_inputs">
            <div className="radio_input">
              <input type="radio" name="start" id="start" value={ProductTitleAlign} 
                 checked={ProductTitleAlign === 'start'}
              onChange={(e)=>setProductTitleAlign('start')}/>
              <label htmlFor="start">Start</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="center" id="center" value={ProductTitleAlign} onChange={(e)=>setProductTitleAlign('center')}
              
              checked={ProductTitleAlign === 'center'}/>

            
              <label htmlFor="center">Middle</label>
            </div>
            <div className="radio_input">
              <input type="radio" name="end" id="end" value={ProductTitleAlign} onChange={(e)=>setProductTitleAlign('end')}
              
              checked={ProductTitleAlign === 'end'}/>

            
              <label htmlFor="end">End</label>
            </div>
          </div>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button Background Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductBtnBackColor}
            onChange={(e) => setProductBtnBackColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{ProductBtnBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductBtnTextColor}
            onChange={(e) => setProductBtnTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ProductBtnTextColor}</strong>
          </h2>
        </div>
        
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button  Hover Back Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductBtnHoverBackColor}
            onChange={(e) => setProductBtnHoverBackColor(e.hex)}
          />
          {/* <input type="color" value={VCardColour} onChange={(e)=>setVCardColour(e.target.value)} name="VCardColour" id="VCardColour"/> */}

          <h2>
            You Picked - &nbsp;<strong>{ProductBtnHoverBackColor}</strong>
          </h2>
        </div>
        <div className="First_colour">
          <div className="theme_title">
            <h5>Button  Hover Text Colour</h5>
          </div>

          <ChromePicker
            className="colourPicker"
            color={ProductBtnHoverTextColor}
            onChange={(e) => setProductBtnHoverTextColor(e.hex)}
          />

          <h2>
            You Picked - &nbsp;<strong>{ProductBtnHoverTextColor}</strong>
          </h2>
        </div>
        <div className="form_actions">
          {ProductThemeUpdateToggle ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Product_Design;
