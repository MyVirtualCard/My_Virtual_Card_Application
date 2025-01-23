import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_API_URL;

  let [Token, setToken] = useState(null);
  let [UserName, setUserName] = useState(null);
  let [ResellerUserName, setResellerUserName] = useState(null);
  let [IsLoggedIn, setIsLoggedIn] = useState(false);
  let [UserData, setUserData] = useState(false);
  let [ResellerUserData, setResellerUserData] = useState(false);
  let [FormSubmitLoader, setFormSubmitLoader] = useState(false);
  let [ClientData, setClientData] = useState([]);
  let [URL_Alies, setURL_Alies] = useState("demo-url");
  console.log(ResellerUserName)
  //CurrentVCard templateActive
  let [currentTemplate, setCurrentTemplate] = useState(null);
  let [ShowForm, setShowForm] = useState("Choose Your Plan");
  let [DynamicForm, setDynamicForm] = useState();
  let [LiveLinkActivate, setLiveLinkActivate] = useState([]);
  let [VCardCount, setVCardCount] = useState([]);
  let [PaymentSuccessPopup, setPaymentSuccessPopup] = useState(false);
  //Payment state
  let [status, setStatus] = useState(null);
  let [currentPlan, setCurrentPlan] = useState(null);
  let [SavedPlan, setSavedPlan] = useState(null);
  let [PlanPrice, setPlanPrice] = useState();
  let [ActivePlan, setActivePlan] = useState([]);
  let [CurrentPlanActive, setCurrentPlanActive] = useState(0);

  // Dynamic Form States

  // 1]Vcard theme states
  let [VCardColour, setVCardColour] = useState("#fff");
  let [VCardTextColour, setVCardTextColour] = useState("#000");
  let [DesktopViewBackColor, setDesktopViewBackColor] = useState("#B7B7B7");
  let [SVG_Design, setSVG_Design] = useState("");
  let [WebsiteBackgroundType, setWebsiteBackgroundType] =
    useState("Background-Color");
  let [WebsiteBackImageAddress, setWebsiteBackImageAddress] = useState("");
  let [LinearGradient, setLinearGradient] = useState(false);
  let [DesktopViewBackColor2, setDesktopViewBackColor2] = useState("#fff");
  let [VcardThemeUpdateToggle, setVcardThemeUpdateToggle] = useState(false);
  // 2]Banner and Logo
  const [BannerHeight, setBannerHeight] = React.useState([200]);
  const [BannerBrightness, setBannerBrightness] = React.useState([100]);
  let [LogoWidth, setLogoWidth] = useState(100);
  let [LogoWidthUnit, setLogoWidthUnit] = useState("px");
  let [LogoHeight, setLogoHeight] = useState(100);
  let [LogoHeightUnit, setLogoHeightUnit] = useState("px");
  let [LogoBorderRadius, setLogoBorderRadius] = useState("0");
  let [LogoBorderRadiusUnit, setLogoBorderRadiusUnit] = useState("px");
  let [LogoPosition, setLogoPosition] = useState("absolute");
  let [LogoTopPosition, setLogoTopPosition] = useState("100");
  let [LogoPositionUnit, setLogoPositionUnit] = useState("%");
  let [LogoLeftPosition, setLogoLeftPosition] = useState("50");
  let [LogoBottomPosition, setLogoBottomPosition] = useState("0");
  let [LogoRightPosition, setLogoRightPosition] = useState("0");
  let [LogoImageAnimation, setLogoImageAnimation] = useState("Animation-1");

  let [ImageThemeUpdateToggle, setImageThemeUpdateToggle] = useState(false);
  //3]Button/icon states
  let [BtnBackColour, setBtnBackColour] = useState("violet");
  let [BtnTextColour, setBtnTextColour] = useState("white");
  let [BtnHoverColour, setBtnHoverColour] = useState("tomato");
  let [BtnHoverTextColour, setBtnHoverTextColour] = useState("white");
  const [isHovered, setIsHovered] = useState(false);
  let [ContactBtnBorderRadius, setContactBtnBorderRadius] = useState("0");
  let [ContactBtnUnit, setContactBtnUnit] = useState("px");
  let [IconBorderRadius, setIconBorderRadius] = useState("0");
  let [IconUnit, setIconUnit] = useState("px");
  let [UserDataPosition, setUserDataPosition] = useState("center");
  let [ButtonThemeUpdateToggle, setButtonThemeUpdateToggle] = useState(false);
  // 4]Title states
  let [TitleColor, setTitleColor] = useState("#4c4c4c");
  let [TitleSize, setTitleSize] = useState("15");
  let [TitleUnit, setTitleUnit] = useState("px");
  let [TitleFontWeight, setTitleFontWeight] = useState("600");
  let [TitleFont, setTitleFont] = useState("Arial");
  let [TitlePosition, setTitlePosition] = useState("center");
  // SubTitle
  let [SubTitleColor, setSubTitleColor] = useState("#4c4c4c");
  let [SubTitleSize, setSubTitleSize] = useState("10");
  let [SubTitleUnit, setSubTitleUnit] = useState("px");
  let [SubTitleFontWeight, setSubTitleFontWeight] = useState("500");
  let [SubTitleFont, setSubTitleFont] = useState("Arial");
  let [SubTitlePosition, setSubTitlePosition] = useState("start");
  let [TitleThemeUpdateToggle, setTitleThemeUpdateToggle] = useState(false);
  // 5] Service States
  let [ServiceBackColor, setServiceBackColor] = useState("lightGray");
  let [ServiceTextColor, setServiceTextColor] = useState("white");
  let [ServiceTitleColor, setServiceTitleColor] = useState("gray");
  let [ServiceTitleFont, setServiceTitleFont] = useState("Arial");
  let [ServiceTitleSize, setServiceTitleSize] = useState(15);
  let [ServiceTitleUnit, setServiceTitleUnit] = useState("px");
  let [ServiceFontWeight, setServiceFontWeight] = useState(500);
  let [ServiceTitleAlign, setServiceTitleAlign] = useState("start");
  let [BtnBackColor, setBtnBackColor] = useState("orange");
  let [BtnTextColor, setBtnTextColor] = useState("white");
  let [BtnHoverBackColor, setBtnHoverBackColor] = useState("white");
  let [BtnHoverTextColor, setBtnHoverTextColor] = useState("orange");
  let [ServiceThemeUpdateToggle, setServiceThemeUpdateToggle] = useState(false);
  //6].Product states
  let [ProductBackColor, setProductBackColor] = useState("yellow");
  let [ProductTextColor, setProductTextColor] = useState("black");
  let [ProductTitleColor, setProductTitleColor] = useState("gray");
  let [ProductTitleFont, setProductTitleFont] = useState("Arial");
  let [ProductTitleSize, setProductTitleSize] = useState(15);
  let [ProductTitleUnit, setProductTitleUnit] = useState("px");
  let [ProductFontWeight, setProductFontWeight] = useState(500);
  let [ProductTitleAlign, setProductTitleAlign] = useState("start");
  let [ProductBtnBackColor, setProductBtnBackColor] = useState("gray");
  let [ProductBtnTextColor, setProductBtnTextColor] = useState("white");
  let [ProductBtnHoverBackColor, setProductBtnHoverBackColor] =
    useState("white");
  let [ProductBtnHoverTextColor, setProductBtnHoverTextColor] =
    useState("gray");
  let [ProductThemeUpdateToggle, setProductThemeUpdateToggle] = useState(false);
  // 7]Gallery States
  let [ImageBorderRadius, setImageBorderRadius] = useState([0]);
  let [GalleryUpdateToggle, setGalleryUpdateToggle] = useState(false);
  // 8]Timer states
  let [TimerBackColour, setTimerBackColour] = useState("white");
  let [TimerTextColour, setTimerTextColour] = useState("#000");
  let [TimerTitleColor, setTimerTitleColor] = useState("#4c4c4c");
  let [TimerSubTitleColor, setTimerSubTitleColor] = useState("gray");
  let [TimerBoxBorderRadius, setTimerBoxBorderRadius] = useState([5]);
  let [TimerUpdateToggle, setTimerUpdateToggle] = useState(false);
  //  9]Testimonial states
  let [TestimonialBackColor, setTestimonialBackColor] = useState("gray");
  let [TestimonialTextColor, setTestimonialTextColor] = useState("white");
  let [TestimonialTitleColor, setTestimonialTitleColor] = useState("yellow");
  let [TestimonialClientNameColor, setTestimonialClientNameColor] =
    useState("orange");
  let [FlexDirection, setFlexDirection] = useState("row");
  let [UserDataFlexDirection, setUserDataFlexDirection] = useState("column");
  let [UserDataJustifyContent, setUserDataJustifyContent] = useState("center");
  let [UserDataAlignItems, setUserDataAlignItems] = useState("center");
  let [TestimonialBorderRadius, setTestimonialBorderRadius] = useState([
    0, 0, 0, 0,
  ]);
  let [TestimonialImageBorderRadius, setTestimonialImageBorderRadius] =
    useState([0, 0, 0, 0]);
  let [TestimonialUpdateToggle, setTestimonialUpdateToggle] = useState(false);
  // 10]Appoinment Theme
  let [AppoinmentInputDesign, setAppoinmentInputDesign] = useState("Design1");
  let [LabelColor, setLabelColor] = useState("white");
  let [InputBorderColor, setInputBorderColor] = useState("white");
  let [InputBorderOnFocus, setInputBorderOnFocus] = useState("yellow");
  let [PlaceholderColor, setPlaceholderColor] = useState("white");
  let [InputColor, setInputColor] = useState("white");
  let [InputError, setInputError] = useState("red");
  let [AppoinmentUpdateToggle, setAppoinmentUpdateToggle] = useState(false);
  // 11]Feedback Theme
  let [FeedbackInputDesign, setFeedbackInputDesign] = useState("Design3");
  let [FeedbackLabelColor, setFeedbackLabelColor] = useState("white");
  let [FeedbackInputBorderColor, setFeedbackInputBorderColor] =
    useState("white");
  let [FeedbackInputBorderOnFocus, setFeedbackInputBorderOnFocus] =
    useState("yellow");
  let [FeedbackPlaceholderColor, setFeedbackPlaceholderColor] =
    useState("white");
  let [FeedbackInputColor, setFeedbackInputColor] = useState("white");
  let [FeedbackInputError, setFeedbackInputError] = useState("red");
  let [FeedbackUpdateToggle, setFeedbackUpdateToggle] = useState(false);
  // 12]Inquiry Theme
  let [InquiryInputDesign, setInquiryInputDesign] = useState("Design3");
  let [InquiryLabelColor, setInquiryLabelColor] = useState("white");
  let [InquiryInputBorderColor, setInquiryInputBorderColor] = useState("white");
  let [InquiryInputBorderOnFocus, setInquiryInputBorderOnFocus] =
    useState("yellow");
  let [InquiryPlaceholderColor, setInquiryPlaceholderColor] = useState("white");
  let [InquiryInputColor, setInquiryInputColor] = useState("white");
  let [InquiryInputError, setInquiryInputError] = useState("red");
  let [InquiryUpdateToggle, setInquiryUpdateToggle] = useState(false);
  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.UserData) : '';
      if (data.success) {
        localStorage.setItem("UserName", data.UserData.UserName);
        setUserName(data.UserData.UserName);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getResellerAuthStatus = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/auth/reseller/is-auth"
      );

      if (data.success) {
        setIsLoggedIn(true);
        getResellerUserData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getResellerUserData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/auth/reseller/register"
      );

      data.success
        ? setResellerUserData(data.UserData)
        : '';
      if (data.success) {
        localStorage.setItem("ResellerUserName", data.UserData.UserName);
        setResellerUserName(data.UserData.UserName);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAuthStatus();
    getResellerAuthStatus();
  
  }, []);
  const value = {
    Token,
    setToken,
    backendUrl,
    IsLoggedIn,
    setIsLoggedIn,
    UserData,
    setUserData,
    ResellerUserData,
    setResellerUserData,

    getUserData,
    getAuthStatus,
    getResellerAuthStatus,
    getResellerUserData,
    FormSubmitLoader,
    setFormSubmitLoader,
    URL_Alies,
    setURL_Alies,
    ClientData,
    setClientData,
    UserName,
    setUserName,
    ResellerUserName,
    setResellerUserName,
    currentTemplate,
    setCurrentTemplate,
    ShowForm,
    setShowForm,
    status,
    setStatus,
    currentPlan,
    setCurrentPlan,
    SavedPlan,
    setSavedPlan,
    PlanPrice,
    setPlanPrice,
    ActivePlan,
    setActivePlan,
    CurrentPlanActive,
    setCurrentPlanActive,
    DynamicForm,
    setDynamicForm,
    LiveLinkActivate,
    setLiveLinkActivate,
    VCardCount,
    setVCardCount,
    PaymentSuccessPopup,
    setPaymentSuccessPopup,
    //1] Vcard Theme states
    VCardColour,
    setVCardColour,
    VCardTextColour,
    setVCardTextColour,
    SVG_Design,
    setSVG_Design,
    WebsiteBackgroundType,
    setWebsiteBackgroundType,
    WebsiteBackImageAddress,
    setWebsiteBackImageAddress,
    DesktopViewBackColor,
    setDesktopViewBackColor,
    VcardThemeUpdateToggle,
    setVcardThemeUpdateToggle,
    LinearGradient,
    setLinearGradient,
    DesktopViewBackColor2,
    setDesktopViewBackColor2,
    //2] Dynamic Banner and Logo states
    BannerHeight,
    setBannerHeight,
    BannerBrightness,
    setBannerBrightness,
    LogoWidth,
    setLogoWidth,
    LogoWidthUnit,
    setLogoWidthUnit,
    LogoHeight,
    setLogoHeight,
    LogoHeightUnit,
    setLogoHeightUnit,
    LogoBorderRadius,
    setLogoBorderRadius,
    LogoBorderRadiusUnit,
    setLogoBorderRadiusUnit,
    LogoPosition,
    setLogoPosition,
    LogoTopPosition,
    setLogoTopPosition,
    LogoPositionUnit,
    setLogoPositionUnit,
    LogoLeftPosition,
    setLogoLeftPosition,
    LogoBottomPosition,
    setLogoBottomPosition,
    LogoRightPosition,
    setLogoRightPosition,
    UserDataPosition,
    setUserDataPosition,
    LogoImageAnimation,
    setLogoImageAnimation,
    ImageThemeUpdateToggle,
    setImageThemeUpdateToggle,
    // 3]Dynamic Button and Icon states
    BtnBackColour,
    setBtnBackColour,
    BtnTextColour,
    setBtnTextColour,
    BtnHoverColour,
    setBtnHoverColour,
    BtnHoverTextColour,
    setBtnHoverTextColour,
    isHovered,
    setIsHovered,
    ContactBtnBorderRadius,
    setContactBtnBorderRadius,
    ContactBtnUnit,
    setContactBtnUnit,
    IconBorderRadius,
    setIconBorderRadius,
    IconUnit,
    setIconUnit,
    ButtonThemeUpdateToggle,
    setButtonThemeUpdateToggle,
    // 4]Title states
    TitleColor,
    setTitleColor,
    TitleSize,
    setTitleSize,
    TitleUnit,
    setTitleUnit,
    TitleFontWeight,
    setTitleFontWeight,
    TitleFont,
    setTitleFont,
    TitlePosition,
    setTitlePosition,
    // SubTitle
    SubTitleColor,
    setSubTitleColor,
    SubTitleSize,
    setSubTitleSize,
    SubTitleUnit,
    setSubTitleUnit,
    SubTitleFontWeight,
    setSubTitleFontWeight,
    SubTitleFont,
    setSubTitleFont,
    SubTitlePosition,
    setSubTitlePosition,
    TitleThemeUpdateToggle,
    setTitleThemeUpdateToggle,
    // 5]ServiceStates
    ServiceBackColor,
    setServiceBackColor,
    ServiceTextColor,
    setServiceTextColor,
    ServiceTitleColor,
    setServiceTitleColor,
    ServiceTitleFont,
    setServiceTitleFont,
    ServiceTitleSize,
    setServiceTitleSize,
    ServiceTitleUnit,
    setServiceTitleUnit,
    ServiceFontWeight,
    setServiceFontWeight,
    ServiceTitleAlign,
    setServiceTitleAlign,
    BtnBackColor,
    setBtnBackColor,
    BtnTextColor,
    setBtnTextColor,
    BtnHoverBackColor,
    setBtnHoverBackColor,
    BtnHoverTextColor,
    setBtnHoverTextColor,
    ServiceThemeUpdateToggle,
    setServiceThemeUpdateToggle,
    // 6]Product States
    ProductBackColor,
    setProductBackColor,
    ProductTextColor,
    setProductTextColor,
    ProductTitleColor,
    setProductTitleColor,
    ProductTitleFont,
    setProductTitleFont,
    ProductTitleSize,
    setProductTitleSize,
    ProductTitleUnit,
    setProductTitleUnit,
    ProductFontWeight,
    setProductFontWeight,
    ProductTitleAlign,
    setProductTitleAlign,
    ProductBtnBackColor,
    setProductBtnBackColor,
    ProductBtnTextColor,
    setProductBtnTextColor,
    ProductBtnHoverBackColor,
    setProductBtnHoverBackColor,
    ProductBtnHoverTextColor,
    setProductBtnHoverTextColor,
    ProductThemeUpdateToggle,
    setProductThemeUpdateToggle,
    // 7]Gallery states
    ImageBorderRadius,
    setImageBorderRadius,
    GalleryUpdateToggle,
    setGalleryUpdateToggle,
    // 8]Timer states
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
    // 9]Testimonial states
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
    FlexDirection,
    setFlexDirection,
    UserDataFlexDirection,
    setUserDataFlexDirection,
    UserDataJustifyContent,
    setUserDataJustifyContent,
    UserDataAlignItems,
    setUserDataAlignItems,
    TestimonialImageBorderRadius,
    setTestimonialImageBorderRadius,
    TestimonialUpdateToggle,
    setTestimonialUpdateToggle,
    // 10]Appoinment States
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
    // 11]Feedback states
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
    //12]Inquiry States
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
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
