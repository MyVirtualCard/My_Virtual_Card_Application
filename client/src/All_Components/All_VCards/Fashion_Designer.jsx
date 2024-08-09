import React, { useEffect, useState } from "react";
import "./Fashion_Designer.scss";
import banner from "../../assets/AllVCard_Image/VCard3/Banner.jpg";

import fashion1 from "../../assets/AllVCard_Image/Fashion_Designer/fashion2.png";
import fashion2 from "../../assets/AllVCard_Image/Fashion_Designer/fashion1.png";
import fashion3 from "../../assets/AllVCard_Image/Fashion_Designer/fashion3.png";
import fashion4 from "../../assets/AllVCard_Image/Fashion_Designer/fashion4.png";
import fashion5 from "../../assets/AllVCard_Image/Fashion_Designer/fashion5.png";
import fashion6 from "../../assets/AllVCard_Image/Fashion_Designer/fashion6.png";
import fashion7 from "../../assets/AllVCard_Image/Fashion_Designer/fashion7.png";
import fashion8 from "../../assets/AllVCard_Image/Fashion_Designer/fashion8.png";
import fashion9 from "../../assets/AllVCard_Image/Fashion_Designer/fashion9.png";
import fashion10 from "../../assets/AllVCard_Image/Fashion_Designer/fashion10.png";
import fashion11 from "../../assets/AllVCard_Image/Fashion_Designer/fashion11.png";
import fashion12 from "../../assets/AllVCard_Image/Fashion_Designer/12.png";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import vCardsJS from "vcards-js";
import axios from "axios";
import trianglelogo from "../../assets/LandingPage_image/Triangle_logo.png";
import { Toaster, toast } from "react-hot-toast";
const Fashion_Designer = () => {
  let fashionIcons = [
    fashion1,
    fashion2,
    fashion3,
    fashion4,
    fashion5,
    fashion6,
    fashion7,
    fashion8,
    fashion9,
    fashion10,
    fashion11,
    fashion12,
  ];
  const [fashionIconIndex, setFashionIconIndex] = useState(0);
  let [popupBannerToggle, setPopUpBannerToggle] = useState(false);
  // /Fashion stress:
  useEffect(() => {
    if (fashionIconIndex >= 0) {
      if (fashionIconIndex < fashionIcons.length) {
        const timer = setTimeout(() => {
          setFashionIconIndex(fashionIconIndex + 1);
        }, 5000);

        // Cleanup the timer
        return () => {
          clearTimeout(timer);
        };
      }
    }
    if (fashionIconIndex === 12) {
      setFashionIconIndex(0);
    }
  }, [fashionIconIndex]);
  let bannerImages = [
    "https://img.freepik.com/free-photo/female-fashion-designer-working-studio-sitting-desk_155003-17085.jpg?t=st=1722620141~exp=1722623741~hmac=2600260415736230b94f075a655befc0207fc4ddf7e9b441a4d218426cb75f81&w=900",
    "https://img.freepik.com/free-photo/female-fashion-designer-working-studio-sitting-desk_155003-17084.jpg?t=st=1722629038~exp=1722632638~hmac=84f26cfbb8fa2162126520c8d085144c9d7a8eb2583d65b24a16f853d39f6682&w=900",
    "https://img.freepik.com/free-photo/fashion-designer-woman-working-studio-sitting-desk_155003-2461.jpg?t=st=1722629056~exp=1722632656~hmac=d8f30ab33efe964a8a68faf2d322c1fcdc949f33aa574ccaf2c2befd985af241&w=900",
  ];
  const [bannerIndex, setBannerIndex] = useState(0);
  // /Fashion stress:
  useEffect(() => {
    if (bannerIndex >= 0) {
      if (bannerIndex < bannerImages.length) {
        const timer = setTimeout(() => {
          setBannerIndex(bannerIndex + 1);
        }, 5000);

        // Cleanup the timer
        return () => {
          clearTimeout(timer);
        };
      }
    }
    if (bannerIndex === 3) {
      setBannerIndex(0);
    }
  }, [fashionIconIndex]);
  const [width, setWidth] = useState(window.innerWidth);
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  //create a new vCard
  var vCard = vCardsJS();

  function generateVCF() {
    //set properties
    vCard.firstName = "Jayakumar";
    vCard.middleName = "";
    vCard.lastName = "V";
    vCard.organization = "Aristostech India Private Limited,CEO";
    vCard.photo.attachFromUrl(
      "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1714999372~exp=1715002972~hmac=148ead13ab2f0dc4db7268fb984501266e0547e55d0bd1a6918e3e51ca5a5af4&w=740",
      "JPEG"
    );
    vCard.workPhone = "+91 9344482370";
    vCard.birthday = new Date(1985, 0, 1);
    vCard.title = "Bussiness Man";
    vCard.url = "https://www.aristostechindia.com/";
    vCard.note = "Notes on Eric";

    //save to file
    // vCard.saveToFile('./eric-nesser.vcf');
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", `data:,${vCard.getFormattedString()}`);
    linkElement.setAttribute("download", "card.vcf");
    linkElement.style.display = "none";
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }
  const buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  const gallery_buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const gallery_properties = {
    prevArrow: (
      <button style={{ ...gallery_buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...gallery_buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  //Gallery Functionality
  //openFullImage preview:
  function openFullImage(pic) {
    let fullImageBox = document.getElementById("fullImageBox");
    let fullImage = document.getElementById("fullImage");
    fullImageBox.style.display = "block";
    fullImage.src = pic;
  }

  //Close FullImage Preview
  function closeFullImage() {
    let fullImageBox = document.getElementById("fullImageBox");

    fullImageBox.style.display = "none";
  }
  //Feedback Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      URL_Alies: window.location.pathname,
      ClientName: "",
      ClientFeedback: "",
      ClientRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      ClientName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      ClientFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      console.log(values);
      setFeedbackLoader(true);
      await api
        .post(`/feedback${window.location.pathname}`, values)
        .then((res) => {
          toast.success(res.data.message);

          setFeedbackLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setFeedbackLoader(false);
        });
    },
  });
  //Start Ratting:
  // let currentRatting=0;
  function handleRatting(e) {
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      let ratting = parseInt(star.dataset.rating, 10);
      highlightStar(ratting);
    }
  }
  //Remove Ratting:
  function removeRatting() {
    highlightStar(feedbackForm.ClientRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.ClientRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.ClientRatting);
      highlightStar(feedbackForm.ClientRatting);
    }
  }

  //Highlight star color:
  function highlightStar(ratting) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      if (index < ratting) {
        star.classList.add("highlight");
      } else {
        star.classList.remove("highlight");
      }
    });
  }
  //Form Logic :
  let formik = useFormik({
    initialValues: {
      clientFullName1: "",
      clientEmail1: "",
      clientMobileNumber1: "",
      clientInquiries1: "",
    },

    //Validation :
    validationSchema: Yup.object({
      clientFullName1: Yup.string()
        .min(3, "Min 3 char required")
        .max(20, "Name must be 20 character or less")
        .required("Name is required"),
      clientEmail1: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      clientMobileNumber1: Yup.string()
        .min(10, "Invalid Mobile number")
        .max(10, "Invalid Mobile number")
        .required("MobileNumber is required"),
      clientInquiries1: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(100, "Inquiries must be 100 character or less")
        .required("Inquiries is required"),
    }),
    //Form Submit :
    onSubmit: (values) => {
      setFormData({
        clientFullName1: values.clientFullName1,
        clientEmail1: values.clientEmail1,
        clientMobileNumber1: values.clientMobileNumber1,
        clientInquiries1: values.clientInquiries1,
      });

      sendEmail();
      setLoading(!loading);
      setConfetti(true);
      setTimeout(() => {
        setPopup(!popup);
        setLoading(false);
        setConfetti(!confetti);
        formik.values.clientFullName1 = "";
        formik.values.clientEmail1 = "";
        formik.values.clientMobileNumber1 = "";
        formik.values.clientInquiries1 = "";
      }, 4000);

      setTimeout(() => {
        setPopup(false);
      }, 7000);
      StopConfetti();
    },
  });
  let [SiteLoader, setSiteLoader] = useState(false);

  let [VCard_URL_Data, setVCard_URL_Data] = useState([]);
  let [BasicData, setBasicData] = useState([]);
  let [VCardData, setVCardData] = useState([]);
  let [GalleryData, setGalleryData] = useState([]);
  let [TestimonialData, setTestimonialData] = useState([]);
  let [ProductData, setProductData] = useState([]);
  let [BlogData, setBlogData] = useState([]);
  let [ServiceData, setServiceData] = useState([]);
  let [QRCodeData, setQRCodeData] = useState([]);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  let [SocialMediaData, setSocialMediaData] = useState([]);
  let [BussinessHourData, setBussinessHourData] = useState([]);
  let [GoogleMapData, setGoogleMapData] = useState([]);
  let [PopUpBannerData, setPopUpBannerData] = useState([]);
  const currentUrl = window.location.pathname; // Full URL
  const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });
  async function fetchAllData() {
    setSiteLoader(true);
    try {
      await api
        .get(`/vcard/allDataAPI${currentUrl}`)
        .then((res) => {
          console.log(res.data.data);
          setGoogleMapData(res.data.data.GoogleMapData);
          setVCard_URL_Data(res.data.data.Vcard_URL);
          setBasicData(res.data.data.BasicDetails);
          setSocialMediaData(res.data.data.SocialMediaModel);
          setGalleryData(res.data.data.GalleryModel);
          setTestimonialData(res.data.data.TestimonialModel);
          setServiceData(res.data.data.ServiceData);
          setProductData(res.data.data.ProductModel);
          setQRCodeData(res.data.data.QRCodeModel);
          setBussinessHourData(res.data.data.BussinessModel);
          setPopUpBannerData(res.data.data.PopupBannerModel);
          setSiteLoader(false);
          setTimeout(() => {
            // window.scrollTo(0, 0);
            setPopUpBannerToggle(true);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setSiteLoader(false);
        });
    } catch (error) {
      console.log(error);
      setSiteLoader(false);
    }
  }
  useEffect(() => {
    fetchAllData();
  }, []);
  useEffect(() => {
    api
      .get(`/feedback${window.location.pathname}`)
      .then((res) => {
        setAllFeedBacks(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [commentOpen]);
  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
  return (
    <>
      {SiteLoader ? (
        <div className="newDesignLoader3">
          <div className="loadingbackground">
            {/* <img src={loadingBack} alt="loading" className="aris_back" /> */}
          </div>
          <small>
            {" "}
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </small>
          {/* <Triangle
        visible={true}
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        className='logoLoader'
        style={{zIndex:1}}
      /> */}
          <img src={trianglelogo} alt="LOGO" className="aris_logo" />
        </div>
      ) : (
        <>
          {VCard_URL_Data != undefined ? (
            <div className="Fashion_Designer_container">
              <Toaster position="top-right" reverseOrder={false} />
              <div className="Fashion_Designer_box">
                {/* popupbanner */}
                {PopUpBannerData.length > 0 ? (
                  <>
                    {PopUpBannerData.map((data, index) => {
                      return (
                        <div
                          className="popup_container"
                          id={popupBannerToggle ? "popupShow" : "popupHide"}
                          key={index}
                        >
                          <div className="box">
                            <div
                              className="close_banner_icon"
                              onClick={() => setPopUpBannerToggle(false)}
                            >
                              <i className="bx bx-x"></i>
                            </div>
                            <div className="banner_title">
                              <h3>{data.BannerTitle || "Be In Touch"}</h3>
                            </div>
                            <div className="summary">
                              <p>
                                {data.BannerDescription ||
                                  ` Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Quidem, ut?`}
                              </p>
                            </div>
                            <div className="action">
                              <a
                                href={`mailto:${data.BannerURL}`}
                                target="_blank"
                              >
                                {data.BannerButtonName || "Get In Touch"}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
                {/* Banner and logo and details and socialMedias */}
                {VCard_URL_Data.map((data, index) => {
                  return (
                    <>
                      <div className="row_1" key={index}>
                        <div className="banner_image">
                          {data.BannerType == "Paste_ImageAddress" ? (
                            <>
                              <img
                                src={
                                  data.BannerAddress ||
                                  "https://img.freepik.com/premium-psd/isolated-realistic-shiny-metalic-orange-luxury-city-taxi-cab-car-from-left-front-view_16145-9734.jpg?w=996"
                                }
                                alt="banner"
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {data.BannerType == "ImageUpload"
                            ? data.Banner ||
                              "https://img.freepik.com/premium-psd/isolated-realistic-shiny-metalic-orange-luxury-city-taxi-cab-car-from-left-front-view_16145-9734.jpg?w=996"
                            : ""}
                          <div className="overlay"></div>
                        </div>
                        <div className="user_logo">
                        {data.ProfileType == "ImageUpload" ? (
                                <img
                                  src={
                                    data.Profile ||
                                    "https://img.freepik.com/premium-photo/asian-man-wearing-trendy-fashion-clothes_148840-7198.jpg?w=900"
                                  }
                                  alt="user_logo"
                                />
                              ) : (
                                ""
                              )}
                              {data.ProfileType == "Paste_ImageAddress" ? (
                                <img
                                  src={
                                    data.ProfileAddress ||
                                    "https://img.freepik.com/premium-photo/asian-man-wearing-trendy-fashion-clothes_148840-7198.jpg?w=900"
                                  }
                                  alt="user_logo"
                                />
                              ) : (
                                ""
                              )}
                        </div>
                      </div>
                    </>
                  );
                })}

                {/* Summary */}
                {BasicData.length >0 ? 
                <>
                      <div className="row_2">
                  <div className="user_details">
                    <div className="user_data">
                      {BasicData.map((data,index)=>{
                        return(
                          <>
                               <div className="user_information" key={index}>
                        <h2>{data.FirstName} {data.LastName}</h2>
                        <p>
                          {data.Profession}
                          {/* <img
                            src={fashionIcons[fashionIconIndex]}
                            alt="fashion"
                          /> */}
                        </p>
                      </div>
                          </>
                        )
                      })}
                     {SocialMediaData.length>0 ? 
                       <>
                       {SocialMediaData.map((data, index) => {
                         return (
                           <div
                             className="social_medias"
                             key={index}
                           >
                             {data.Facebook != "" &&
                             data.Facebook ? (
                               <a
                                 href={data.Facebook}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-facebook"></i>
                                 <small>Facebook</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.WhatsUp != "" &&
                             data.WhatsUp ? (
                               <a
                                 href={`https://wa.me/${data.WhatsUp}?text=Hello%20there!`}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-whatsapp"></i>
                                 <small>Whatsup</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.Instagram != "" &&
                             data.Instagram ? (
                               <a
                                 href={data.Instagram}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-instagram"></i>
                                 <small>Instagram</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.LinkedIn != "" &&
                             data.LinkedIn ? (
                               <a
                                 href={data.LinkedIn}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-linkedin-square"></i>
                                 <small>LinkedIn</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.Github != "" &&
                             data.Github ? (
                               <a
                                 href={data.Github}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-github"></i>
                                 <small>Github</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.Twiter != "" &&
                             data.Twiter ? (
                               <a
                                 href={data.Twiter}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-twitter"></i>
                                 <small>Twitter</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.Youtube != "" &&
                             data.Youtube ? (
                               <a
                                 href={data.Youtube}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bxl-youtube"></i>
                                 <small>Youtube</small>
                               </a>
                             ) : (
                               ""
                             )}
                             {data.Website != "" &&
                             data.Website ? (
                               <a
                                 href={data.Website}
                                 className="social_media_icon"
                                 target="_blank"
                               >
                                 <i className="bx bx-globe"></i>
                                 <small>Website</small>
                               </a>
                             ) : (
                               ""
                             )}
                           </div>
                         );
                       })}
                     </>
                     : ""}
                   
                    </div>
                  </div>
                  {VCard_URL_Data.map((data,index)=>{
                    return(
                      <>
                          <div className="summary" key={index}>
                    <p>
                    {data.Description || 'No Description!'}
                    </p>
                  </div>
                      </>
                    )
                  })}
              
                </div>
                </>
                : ''}
          
                {/* ContactDetails */}
                {BasicData.length > 0 ?
                <>
                     <div className="row_3">
                  <div className="title">
                    <h3>#&nbsp;Contact Details</h3>
                   
                  </div>

                  {BasicData.map((data, index) => {
                        return (
                          <div className="contact_list_container" key={index}>
                            <div className="contact_list">
                              <div className="icons">
                                <i className="bx bxl-gmail"></i>
                                {/* <small>Personal Email</small> */}
                              </div>

                              <div className="list_detail">
                                <p>
                                  {data.Email || "jayakumarv@aristostech.in"}
                                </p>
                              </div>
                            </div>
                            <div className="contact_list">
                              <div className="icons">
                                <i className="bx bx-mobile-vibration"></i>
                                {/* <small>Mobile Number</small> */}
                              </div>

                              <div className="list_detail">
                                <p>
                                  {data.MobileNumber || "(+91) -----------"}
                                </p>
                              </div>
                            </div>
                            {data.AlternateEmail.length > 0 ? (
                              <div className="contact_list">
                                <div className="icons">
                                  <i className="bx bx-envelope"></i>
                                  {/* <small>Alternate Email</small> */}
                                </div>

                                <div className="list_detail">
                                  <p>
                                    {data.AlternateEmail ||
                                      "contact@aristostech.in"}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {data.Location.length > 0 ? (
                              <div className="contact_list">
                                <div className="icons">
                                  <i className="bx bx-map-alt"></i>
                                  {/* <small>Address</small> */}
                                </div>

                                <div className="list_detail">
                                  <p>{data.Location || "....."}</p>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}

                  {/* AddtoContact */}
                  <div className="add_to_contact">
                    <button onClick={generateVCF}>
                      Add to Contact<i className="bx bxs-contact"></i>
                    </button>
                  </div>
                </div>
                </>
                : ''}
           
                {/* Services */}
                {ServiceData.length > 0 ? 
                <>
                  <div className="row_4">
                  <div className="title">
                    <h3>#&nbsp;Our Services</h3>
                  </div>

                  <div className="service_list_container">
                    {ServiceData.map((data,index)=>{
                      return(
                        <>
                           <div className="service_list" key={index}>
                                {data.ServiceType == "Icon_Tag" ? (
                                  <>
                                    <HtmlRenderer
                                      htmlString={data.ServiceIcon}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                                {data.ServiceType == "ImageUpload" ? (
                                  <>
                                    <img src={data.ServiceImage} alt="" />
                                  </>
                                ) : (
                                  ""
                                )}

                                <div className="service_detail" id={data.ServiceType == 'Icon_Tag' ? "contentMargin":''}>
                                  <div className="service_title">
                                    <h4>{data.ServiceName || "Empty Data"}</h4>
                                  </div>
                                  <div className="service_summary">
                                    <p>
                                      {data.ServiceDescription ||
                                        `Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Quasi nisi laborum
                                      reprehenderit sint doloribus ab!`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                        </>
                      )
                    })}
                    {/* <div className="service_list">
                      <span className="material-symbols-outlined">palette</span>

                      <div className="service_detail">
                        <div className="service_title">
                          <h4>Color direction</h4>
                        </div>
                        <div className="service_summary">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quasi nisi laborum reprehenderit sint
                            doloribus ab!
                          </p>
                        </div>
                      </div>
                    </div> */}
             
                  </div>
                </div>
                </>
                :''}
              

           

                {/* Products */}
                {ProductData.length>0? 
                <>
                    <div className="row_7">
                  <div className="title">
                    <h3>#&nbsp;Our Products</h3>
                    {/* Contact */}
                  </div>
                  <div className="product_list_container">
                    <Slide
                      slidesToScroll={1}
                      slidesToShow={width < 600 ? 1 : 2}
                      indicators={true}
                      autoplay
                      {...properties}
                      autoplayInterval={500}
                    >
                      {ProductData.map((data,index)=>{
                        return(
                          <>
                              {data.ProductType == "ImageUpload" ? (
                                  <div className="product_list">
                                    <div className="product_image">
                                      <img
                                        src={
                                          data.ProductImage ||
                                          "https://img.freepik.com/free-vector/taxi-poster-with-realistic-yellow-public-service-car-with-reflection_1284-5444.jpg?t=st=1722540843~exp=1722544443~hmac=246e42b048cc2cd6debfbc2526ba1a7aaab7297900915186ff665942dffd3a3b&w=740"
                                        }
                                        alt="product"
                                      />
                                    </div>
                                    <div className="product_details">
                                      <h4>{data.ProductName}</h4>
                                      <small> {data.ProductDescription}</small>
                                      <button>₹ &nbsp;{data.ProductPrice}</button>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {data.ProductType == "Image_Address_Link" ? (
                                  <div className="product_list">
                                    <div className="product_image">
                                      <img
                                        src={
                                          data.ProductImageLink != undefined ||
                                          data.ProductImageLink != null
                                            ? data.ProductImageLink
                                            : `https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114181.jpg?t=st=1722480930~exp=1722484530~hmac=b3e99f19f2f2261ec0d7c5f1da8914dbfa376f325e37125598579ea7d7eced3b&w=900`
                                        }
                                        alt="product"
                                      />
                                    </div>
                                    <div className="product_details">
                                      <h4>{data.ProductName || '...'}</h4>
                                      <small>{data.ProductDescription || ''}</small>
                                      <button>₹ &nbsp;{data.ProductPrice}</button>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                          </>
                        )
                      })}

                    
                    </Slide>
                  </div>
                </div>
                </>
                : ''}
            
                {/* //Appinment */}
                <div className="row_6">
                  <div className="title">
                    <h3>#&nbsp;Make An Appoinment</h3>
                  </div>

                  <div className="appinment_form_container">
                    <form className="appinment_form">
                      <div className="form_group">
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          name="data"
                          id="date"
                          className="date-input"
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="time">Time</label>
                        <select name="time" id="time">
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                        </select>
                      </div>
                      <div className="form_submit">
                        <button type="submit" className="submit-btn">
                          Book Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* Gallery */}
                {GalleryData.length > 0 ? 
                <>
                     <div className="row_8">
                  <div className="title">
                    <h3>#&nbsp;Gallery</h3>
                  </div>
                  <div className="gallery_container">
                    <div className="full_image" id="fullImageBox">
                      <div className="close_Full_Image_gallery">
                        <span
                          className="material-symbols-outlined"
                          onClick={closeFullImage}
                        >
                          cancel
                        </span>
                      </div>
                      <img src={banner} alt="gallery" id="fullImage" />
                    </div>

                    <div className="gallery_box">
                      <Slide
                        slidesToScroll={1}
                        slidesToShow={width < 600 ? 2 : 2}
                        indicators={false}
                        autoplay
                        {...gallery_properties}
                        autoplayInterval={1000}
                      >
                        {GalleryData.map((data,index)=>{
                          return(
                            <>
                            <div key={index}>
                            {data.GalleryType == "ImageUpload" ? (
                                    <img
                                      src={
                                        data.GalleryImage ||
                                        "https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-3.png?fit=1030%2C679&ssl=1"
                                      }
                                      alt="developer"
                                      onClick={(e) =>
                                        openFullImage(e.target.src)
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                                  {data.GalleryType == "Image_Address_URL" ? (
                                    <img
                                      src={
                                        data.GalleryImageURL ||
                                        "https://i0.wp.com/www.aristostechindia.com/wp-content/uploads/2023/12/Mobilebannerhojo-3.png?fit=1030%2C679&ssl=1"
                                      }
                                      alt="developer"
                                      onClick={(e) =>
                                        openFullImage(e.target.src)
                                      }
                                    />
                                  ) : (
                                    ""
                                  )}
                            </div>
                            </>
                          )
                        })}
                       
                        {/* <img
                          src="https://img.freepik.com/free-photo/emotional-funny-attractive-woman-holding-colorful-dresses-hanger-clothing-store_285396-4615.jpg?t=st=1722621932~exp=1722625532~hmac=76da5fd66d6aefca0f7e92a77f015312a2cb6367a26fa80f2ca671de6a747e32&w=900"
                          alt="dev"
                          onClick={(e) => openFullImage(e.target.src)}
                        />  */}
                      </Slide>
                    </div>
                  </div>
                </div>
                </>
                : ''}
                {/* Testimonial */}
                {TestimonialData.length > 0 ? 
                <>
                     <div className="row_9">
                  <div className="title">
                    <h3>#&nbsp;Testimonial</h3>
                    {/* Contact */}
                  </div>
                  <div className="testimonial_container">
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      autoPlay
                    >
                      {TestimonialData.map((data,index)=>{
                        return(
                          <div className="testimonial_list">
                          <div className="client_feedback">
                            <small>
                            {data.ClientFeedback ||
                                      ` Lorem ipsum dolor, sit amet consectetur adipisicing
                              elit. Vel repellendus a ut! Architecto quis error
                              porro nemo beatae perspiciatis omnis?`}
                            </small>
                          </div>
                          <div className="client_detail">
                            <img
                              src={
                                data.ClientImage ||
                                "https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                              } alt='clientImage'/>
  
                            <div className="client_name">
                            <h4>{data.ClientName}</h4>
                            <small>-Member</small>
                            </div>
                          </div>
                        </div>
                        )
                      })}
                 
                    </Carousel>
                  </div>
                </div>
                </>
                : ''}
           
                {/* QRCode */}
                {QRCodeData.length>0 ? 
                <>
                        <div className="row_12">
                  <div className="title">
                    <h3>#&nbsp;Scan To Pay</h3>
                    {/* Contact */}
                  </div>
         {QRCodeData.map((data,index)=>{
          return(
            <div className="qrcode_container" key={index}>
            <div className="qr_code_box">
              <h4>
              <small>Note :</small>If You want to buy any product with us directly scan to pay easily!
              </h4>

              <img
        src={data.QRCodeImage || "https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?t=st=1722540928~exp=1722544528~hmac=37be49c02a6f26b2ee598eeec0fc1b4f8133a5107efef5c3360142d745b6b58e&w=740"}
        alt=""
      />
            </div>
          </div>
          )
         })}
                 
                </div>
                </>
                : ''}
        
                {/* Opentime */}
                {BussinessHourData.length>0 ? 
                <>
                    <div className="row_5">
                  <div className="title">
                    <h3>#&nbsp;Open&Close Time</h3>
                    {/* Contact */}
                  </div>
                  <div className="time_list_container">
                        {BussinessHourData[0].Monday.from.length > 0 &&
                        BussinessHourData[0].Monday.to.length > 0 ? (
                          <div className="time_list">
                            <div className="day">
                              <span>Monday</span>
                            </div>
                            <div className="time">
                              <div className="start">
                                <h6>Open Time</h6>
                                <span>
                                  {BussinessHourData[0].Monday.from}AM
                                </span>
                              </div>
                              <div className="end">
                                <h6>Close Time</h6>
                                <span>{BussinessHourData[0].Monday.to}PM</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {BussinessHourData[0].Tuesday.from.length > 0 &&
                        BussinessHourData[0].Tuesday.to.length > 0 ? (
                          <>
                            <div className="time_list">
                              <div className="day">
                                <span>Tuesday</span>
                              </div>
                              <div className="time">
                                <div className="start">
                                  <h6>Open Time</h6>
                                  <span>
                                    {BussinessHourData[0].Tuesday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Tuesday.to}PM
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {BussinessHourData[0].Wednesday.from.length > 0 &&
                        BussinessHourData[0].Wednesday.to.length > 0 ? (
                          <>
                            <div className="time_list">
                              <div className="day">
                                <span>Wednesday</span>
                              </div>
                              <div className="time">
                                <div className="start">
                                  <h6>Open Time</h6>
                                  <span>
                                    {BussinessHourData[0].Wednesday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Wednesday.to}PM
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {BussinessHourData[0].Thursday.from.length > 0 &&
                        BussinessHourData[0].Thursday.to.length > 0 ? (
                          <div className="time_list">
                            <div className="day">
                              <span>Thursday</span>
                            </div>
                            <div className="time">
                              <div className="start">
                                <h6>Open Time</h6>
                                <span>
                                  {BussinessHourData[0].Thursday.from}AM
                                </span>
                              </div>
                              <div className="end">
                                <h6>Close Time</h6>
                                <span>
                                  {BussinessHourData[0].Thursday.to}PM
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {BussinessHourData[0].Friday.from.length > 0 &&
                        BussinessHourData[0].Friday.to.length > 0 ? (
                          <>
                            <div className="time_list">
                              <div className="day">
                                <span>Friday</span>
                              </div>
                              <div className="time">
                                <div className="start">
                                  <h6>Open Time</h6>
                                  <span>
                                    {BussinessHourData[0].Friday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Friday.to}PM
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {(BussinessHourData[0].Saturday.from.length > 0 &&
                          BussinessHourData[0].Saturday.to.length > 0) ||
                        BussinessHourData[0].Sunday.from.length > 0 ||
                        BussinessHourData[0].Sunday.from.length ? (
                          <>
                            <div className="time_list">
                              <div className="day">
                                <span>Weekend Days</span>
                              </div>
                              <div className="time">
                                <div className="start">
                                  <h6>Open Time</h6>
                                  <span>
                                    {BussinessHourData[0].Saturday.from}AM
                                  </span>
                                </div>
                                <div className="end">
                                  <h6>Close Time</h6>
                                  <span>
                                    {BussinessHourData[0].Saturday.to}PM
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                </div>
                </>
                : ''}
              {/* GoogleMap */}
              {GoogleMapData.length > 0 ? (
                  <>
                    <div className="google_map_container">
                    <div className="title">
                    <h3>
                    
                   #&nbsp;Live Location
          
                    </h3>
               
                  </div>
                   
                      {GoogleMapData.map((data, index) => {
                        return (
                          <div className="google_map" key={index}>
                            <HtmlRenderer htmlString={data.GoogleIframe} />
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
                {/* Feedback */}
                {VCard_URL_Data.length > 0 ||
                BasicData.length > 0 ||
                SocialMediaData.length > 0 ? 
                <>
                     <div className="row_10">
                  {/* <div className="rattingcar_image">
                    <img src={RattingCar_Image} alt="ratting" />
                  </div> */}
                  <div className="title">
                    <h3>
                     
                      Feedback
                      <span className="material-symbols-outlined">reviews</span>
                    </h3>
                    {/* Contact */}
                  </div>
                  <div className="feedback_container">
                        <form action="" onSubmit={feedbackFormik.handleSubmit}>
                          <div className="form_group">
                            <label
                              htmlFor="clientName_Input"
                              className={`${
                                feedbackFormik.errors.ClientName ? "error" : ""
                              } `}
                            >
                              {feedbackFormik.touched.ClientName &&
                              feedbackFormik.errors.ClientName
                                ? feedbackFormik.errors.ClientName
                                : "Your Name"}
                              <span>
                                <sup>*</sup>
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Your Name"
                              name="ClientName"
                              id="ClientName"
                              // value={userName}
                              // onChange={(e)=>setUserName(e.target.value)}
                              value={feedbackFormik.values.ClientName}
                              onChange={feedbackFormik.handleChange}
                              onBlur={feedbackFormik.handleBlur}
                            />
                          </div>
                          <div className="form_group">
                            <label
                              htmlFor="clientFeedBack_Input"
                              className={`${
                                feedbackFormik.errors.ClientFeedback
                                  ? "error"
                                  : ""
                              } `}
                            >
                              {feedbackFormik.touched.ClientFeedback &&
                              feedbackFormik.errors.ClientFeedback
                                ? feedbackFormik.errors.ClientFeedback
                                : "Your FeedBack"}
                              <span>
                                <sup>*</sup>
                              </span>
                            </label>
                            <textarea
                              id="ClientFeedback"
                              name="ClientFeedback"
                              cols="30"
                              rows="2"
                              placeholder="Enter your Feedback"
                              // value={userFeedback}
                              // onChange={(e)=>setUserFeedback(e.target.value)}
                              value={feedbackFormik.values.ClientFeedback}
                              onChange={feedbackFormik.handleChange}
                              onBlur={feedbackFormik.handleBlur}
                            ></textarea>
                          </div>
                          <div className="form_group">
                            <label
                              htmlFor="clientName_Input"
                              className={`${
                                feedbackFormik.errors.ClientRatting
                                  ? "error"
                                  : ""
                              } `}
                            >
                              {feedbackFormik.touched.ClientRatting &&
                              feedbackFormik.errors.ClientRatting
                                ? feedbackFormik.errors.ClientRatting
                                : "Ratting"}
                              <span>
                                <sup>*</sup>
                              </span>
                            </label>
                            <div
                              className="ratting_container"
                              data-rating="0"
                              name="ClientRatting"
                              id="ClientRatting"
                              onMouseOver={handleRatting}
                              onMouseLeave={removeRatting}
                              onClick={RattingSetted}
                              value={feedbackForm.ClientRatting}
                              // onChange={(e)=>setCurrentRatting(e.target.value)}
                              // value={feedbackFormik.ClientRatting}
                              onChange={feedbackFormik.handleChange}
                              onBlur={feedbackFormik.handleBlur}
                            >
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="1"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="2"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="3"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="4"
                                ></i>
                              </span>
                              <span className="ratting_star">
                                <i
                                  className="bx bxs-star star"
                                  data-rating="5"
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div className="form_actions">
                            <button type="submit">
                              <span className="material-symbols-outlined">
                                send
                              </span>
                              Send Feedback
                            </button>
                          </div>
                        </form>
                      </div>
                   {/* //Feedback messages */}
                   <div className="Feedback_container_message">
                        <div className="feeback_title">
                          {commentOpen ? (
                            <button onClick={() => setCommentOpen(false)}>
                              <span className="material-symbols-outlined">
                                thumbs_up_down
                              </span>
                              Hide All Feedbacks
                            </button>
                          ) : (
                            <button onClick={() => setCommentOpen(true)}>
                              <span className="material-symbols-outlined">
                                thumbs_up_down
                              </span>
                              See All Feedbacks
                              <i className="bx bxs-bell-ring bx-tada"></i>
                              <div className="count">{AllFeedBacks.length}</div>
                            </button>
                          )}

                          {feedbackLoader ? (
                            <span className="feedBack_loader"></span>
                          ) : (
                            ""
                          )}
                        </div>

                        {commentOpen ? (
                          <div className="comment_box">
                            {AllFeedBacks.map((data, index) => {
                              return (
                                <div className="message" key={index}>
                                  <div className="user_detail">
                                    <div className="profile">
                                      <img
                                        src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1722896783~exp=1722900383~hmac=3628f6befbe82fb4e2642e0c0f1f836c946ba70bb2e17c5d12d5c839123aeb12&w=740"
                                        alt="profile"
                                      />
                                    </div>
                                    <div className="details">
                                      <div className="userName">
                                        <p>
                                          {data.ClientName}
                                          <i className="bx bxs-user-check"></i>
                                        </p>
                                      </div>
                                      <div className="stars">
                                        <div
                                          className="ratting_container1"
                                          data-rating={data.ClientRatting}
                                          name="currentRatting"
                                          // id="currentRatting"
                                          id={
                                            data.ClientRatting == 0
                                              ? "noRatting"
                                              : "" || data.ClientRatting == 1
                                              ? "singleRatting"
                                              : "" || data.ClientRatting == 2
                                              ? "doubleRatting"
                                              : "" || data.ClientRatting == 3
                                              ? "ThreeRatting"
                                              : "" || data.ClientRatting == 4
                                              ? "fourRatting"
                                              : "" || data.ClientRatting == 5
                                              ? "fullRatting"
                                              : ""
                                          }
                                          value={data.ClientRatting}
                                        >
                                          <span className="ratting_star">
                                            <i
                                              className="bx bxs-star star1"
                                              data-rating="1"
                                            ></i>
                                          </span>
                                          <span className="ratting_star">
                                            <i
                                              className="bx bxs-star star1"
                                              data-rating="2"
                                            ></i>
                                          </span>
                                          <span className="ratting_star">
                                            <i
                                              className="bx bxs-star star1"
                                              data-rating="3"
                                            ></i>
                                          </span>
                                          <span className="ratting_star">
                                            <i
                                              className="bx bxs-star star1"
                                              data-rating="4"
                                            ></i>
                                          </span>
                                          <span className="ratting_star">
                                            <i
                                              className="bx bxs-star star1"
                                              data-rating="5"
                                            ></i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="comments">
                                    <i className="bx bx-chat"></i>
                                    <span>{data.ClientFeedback}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                </div>
                </>
                : ' '}

                {/* Inquries */}
                <div className="row_11">
                  <div className="title">
                    <h3>#&nbsp;Inquries</h3>
                  </div>
                  <div className="inquiries_container5">
                    <form action="">
                      <div className="form_group">
                        <label htmlFor="name">
                          Name <sup style={{ color: "red" }}>*</sup>
                        </label>
                        <div className="input">
                          <input type="text" placeholder="Your Name" />
                          <i className="bx bxs-user-pin"></i>
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="email">
                          Email <sup style={{ color: "red" }}>*</sup>
                        </label>
                        <div className="input">
                          <input type="email" placeholder="Your Email" />
                          <i className="bx bxs-envelope"></i>
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="name">
                          Phone <sup style={{ color: "red" }}>*</sup>
                        </label>
                        <div className="input">
                          <input type="tel" placeholder="Enter Phone Number" />
                          <i className="bx bxs-phone-call"></i>
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="name">
                          Message <sup style={{ color: "red" }}>*</sup>
                        </label>
                        <div className="input">
                          <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="2"
                            placeholder="Enter Your Message Here..."
                          ></textarea>
                          <i class="bx bxs-message-dots"></i>
                        </div>
                      </div>
                      <div className="form_actions">
                        <button type="submit">
                          <span className="material-symbols-outlined">
                            send
                          </span>
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Footer */}
                <div className="row_13">
                  <div className="footer_container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill="#be96d8b6"
                        fill-opacity="1"
                        d="M0,32L40,42.7C80,53,160,75,240,96C320,117,400,139,480,149.3C560,160,640,160,720,160C800,160,880,160,960,154.7C1040,149,1120,139,1200,160C1280,181,1360,235,1400,261.3L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                      ></path>
                    </svg>
                    <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default Fashion_Designer;
