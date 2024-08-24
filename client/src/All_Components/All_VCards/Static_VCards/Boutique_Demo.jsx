import React, { useEffect, useState } from "react";
import "./Boutique_Demo.scss";
import banner from "../../../assets/AllVCard_Image/VCard3/Banner.jpg";
import profile_back_svg from '../../../assets/AllVCard_Image/Boutique_Shop/profile_back_svg.svg'
import profile_back_svg1 from '../../../assets/AllVCard_Image/Boutique_Shop/profile_back_svg1.svg'
import profile_back_svg2 from '../../../assets/AllVCard_Image/Boutique_Shop/profile_back_svg2.svg'
import profile_back_svg3 from '../../../assets/AllVCard_Image/Boutique_Shop/profile_back_svg3.svg'
import profile_back_svg4 from '../../../assets/AllVCard_Image/Boutique_Shop/profile_back_svg4.svg'
import social_media_back_svg from '../../../assets/AllVCard_Image/Beauty_Parlor/social_media_back_svg.svg';
import title_back_svg from '../../../assets/AllVCard_Image/Beauty_Parlor/title_back_svg.svg'
//service Slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Product Slider
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import vCardsJS from "vcards-js";
const Boutique_Demo = () => {
  let profileSVG = [
  profile_back_svg,
  profile_back_svg1,
  profile_back_svg2,
  profile_back_svg3,
  profile_back_svg4
  ];

  const [sVGIndex, setSVGIndex] = useState(0);
  // /Fashion stress:
  // useEffect(() => {
  //   if (sVGIndex >= 0) {
  //     if (sVGIndex < profileSVG.length) {
  //       const timer = setTimeout(() => {
  //         setSVGIndex(sVGIndex + 1);
  //       }, 5000);

  //       // Cleanup the timer
  //       return () => {
  //         clearTimeout(timer);
  //       };
  //     }
  //   }
  //   if (sVGIndex === 4) {
  //     setSVGIndex(0);
  //   }
  // }, [sVGIndex]);
  let style={
    $first_back__color: '#ffffff',
    $second_back__color: '#6b6b6b',
    $third_back__color: '#303030',
    //Root Background
$root_backgound: '#fcfdc8,#ffffff',
//Vcard background
$vcard_back_color: '#a1046d',

//SVG Wave backgound

$svg_wave_back_color:'#a1046d',
  }
  const [width, setWidth] = useState(window.innerWidth);
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);

  const HtmlRenderer = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };
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
  //gallery
  const buttonStyle = {
    width: "20px",
    background: "none",
    opacity: 1,
    border: "0px",
    padding: "0px",
    fontSize:'2rem',
    borderRadius: "10px",
    color: "#ffffff",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
     <span className="material-symbols-outlined">
keyboard_backspace
</span>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
  <span className="material-symbols-outlined">
east
</span>
      </button>
    ),
  };
  const gallery_buttonStyle = {
    width: "20px",
    background: "none",
    opacity: 1,
    border: "0px",
    padding: "0px",
    fontSize:'2rem',
    borderRadius: "10px",
    color: "#ffffff",
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

  //Service
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 1 : 2,
    slidesToScroll:width < 700 ? 1 : 2,
  };
  //Product
  const product_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Delay between each slide in milliseconds (e.g., 3000ms = 3 seconds)
    slidesToShow: width < 700 ? 2 : 2,
    slidesToScroll:width < 700 ? 2 : 2,
    rtl: true,            // Scroll from left to right
    arrows: true           // Show navigation arrows

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
  //Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      userName: "",
      userFeedback: "",
      currentRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      userFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setFeedbackForm({
        userName: values.userName,
        userFeedback: values.userFeedback,
        currentRatting: values.currentRatting,
      });
      feedBackSubmit();
      setTimeout(() => {
        feedbackFormik.values.userName = "";
        feedbackFormik.values.userFeedback = "";
        feedbackFormik.values.currentRatting = 0;
      }, 4000);
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
    highlightStar(feedbackForm.currentRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.currentRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.currentRatting);
      highlightStar(feedbackForm.currentRatting);
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
  return (
    <div className="bautique_demo_container">
      <div className="bautique_box">
        {/* Banner and logo and details and socialMedias */}
        <div className="row_1">
          <div className="slide_svg">

          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={style.$svg_wave_back_color} fill-opacity="1" d="M0,128L48,112C96,96,192,64,288,42.7C384,21,480,11,576,37.3C672,64,768,128,864,176C960,224,1056,256,1152,229.3C1248,203,1344,117,1392,74.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={style.$svg_wave_back_color} fill-opacity="1" d="M0,64L360,192L720,224L1080,128L1440,160L1440,320L1080,320L720,320L360,320L0,320Z"></path></svg>
            <div className="overlay"></div>
          </div>
          <div className="banner_image">
            <img
              src="https://img.freepik.com/premium-photo/women-man-fashion-accessories-bag-dress-shoes-shirt-high-heels-bag-shopping-colorful_576429-2885.jpg?w=900"
              alt="banner"
            />
            <div className="overlay"></div>
          </div>
          <div className="user_logo">
            <img
              src="https://img.freepik.com/free-photo/woman-with-black-jacket-black-jacket-with-light-bottom_1340-48120.jpg?t=st=1724522420~exp=1724526020~hmac=b0d5d77e5a16dffb7a7d196901cf0d5b376bc6a8d567a4aef690bdae5c0293e1&w=900"
              alt="user_logo"
            />
            {/* <div className="svg_image">
              <img src={profileSVG[sVGIndex]} alt="svg_logo_back" />
            </div> */}
          </div>
        </div>
        {/* Summary */}
        <div className="row_2">
          <div className="user_details">
            <div className="user_data">
              <div className="user_information">
                <h2>Rosy Women's Wear</h2>
                <p>Cloth Shop </p>
              </div>
              <div className="social_medias">
                <a
                  href="https://www.facebook.com/aristostechindia"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bxl-facebook"></i>
                  <small>Facebook</small>
                  <div className="social_media_svg">
                    <img src={profile_back_svg1} alt="social_svg" />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/aristostech_india/"
                  target="_blank"
                  className="social_media_icon"
                >
               <i className='bx bxl-instagram-alt'></i>
               <div className="social_media_svg">
                    <img src={profile_back_svg1} alt="social_svg" />
                  </div>
                  <small>Instagram</small>
                </a>
                <a
                  href="https://wa.me/+919344482370?text=Welcome to Aristostech Team!, How can we assest u ?"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bxl-whatsapp"></i>
                  <div className="social_media_svg">
                    <img src={profile_back_svg1} alt="social_svg" />
                  </div>
                  <small>Whatsup</small>
                </a>
                {/* <a href="#" className="social_media_icon">
                  <i className="bx bxl-twitter"></i>
                  <small>Twitter</small>
                </a> */}
                <a
                  href="https://maps.app.goo.gl/PCJCqMK7UJBNxBuf9"
                  target="_blank"
                  className="social_media_icon"
                >
                  <i className="bx bx-map"></i>
                  <div className="social_media_svg">
                    <img src={profile_back_svg1} alt="social_svg" />
                  </div>
                  <small>Location</small>
                </a>
                <a
                  href="https://www.aristostechindia.com/"
                  target="_blank"
                  className="social_media_icon"
                >
                  
                  <i className="bx bx-globe"></i>
                  <div className="social_media_svg">
                    <img src={profile_back_svg1} alt="social_svg" />
                  </div>
                  <small>Website</small>
                </a>
              </div>
            </div>
          </div>
          <div className="summary">
            <p>
              We started from a traditional marketing background and emerged to
              be a successful Digital Marketing Agency since Digitalisation has
              begun to evolve.
            </p>
          </div>
        </div>
        {/* ContactDetails */}
        <div className="row_3">
        <div className="bautique_title_demo">
            <h3>Testimonial</h3>
            {/* Contact */}
          </div>
          <div className="contact_list_container">
            <div className="contact_list">
              <div className="icons">
                <i class="bx bxl-gmail"></i>
                <small>Personal Email</small>
              </div>

              <div className="list_detail">
                <p>jayakumarv@aristostech.in</p>

              
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-mobile-vibration"></i>
                <small>Mobile Number</small>
              </div>

              <div className="list_detail">
                <p>(+91) 93444 82370</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-envelope"></i>
                <small>Company Email</small>
              </div>

              <div className="list_detail">
                <p>contact@aristostech.in</p>
              </div>
            </div>
            <div className="contact_list">
              <div className="icons">
                <i className="bx bx-map-alt"></i>
                <small>Address</small>
              </div>

              <div className="list_detail address">
                <p>
                  Ankur Plasa No-113 (Old 52) G.N Chetty Road T. Nagar
                  Chennai-600017
                </p>
              </div>
            </div>
          </div>

          {/* AddtoContact */}
          <div className="add_to_contact">
            <button onClick={generateVCF}>
              Add to Contact<i className="bx bxs-contact"></i>
            </button>
          </div>
        </div>
        {/* Services */}
        <div className="row_4">
          <div className="bautique_title_demo">
            <h3>Our Services</h3>
         
          </div>

          <div className="service_list_container">
            <Slide 
                 slidesToScroll={1}
                 slidesToShow={width < 600 ? 1 : 2}
                 indicators={true}
                 autoplay
                 {...gallery_properties}
                 autoplayInterval={1000}
            >
            {/* //service_icon list */}
            <a className="service_list">
              <div className="icon">
              <span className="material-symbols-outlined">palette</span>
              </div>
           

              <div className="service_detail">
                <div className="service_title">
                  <h4>Striching</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi nisi laborum reprehenderit sint doloribus ab!
                  </p>
                </div>
              </div>
            </a>
            <a className="service_list">
          
              <div className="icon">
              <span className="material-symbols-outlined">
directions_bike
</span>
              </div>
              <div className="service_detail">
                <div className="service_title">
                  <h4>Free Delivery</h4>
                </div>
                <div className="service_summary">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sint vero tenetur aliquid totam qui ipsam?
                  </p>
                </div>
              </div>
            </a>
            {/* //service_image list */}
            {/* <a className="img_service_list">
         
                <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/elevated-view-businessman-shaking-hands-with-his-partner-workplace_23-2147838558.jpg?t=st=1724258348~exp=1724261948~hmac=7f948678506d3b95893a29523b417ec7cbbdb794131111dbeb89d1227cfa6e8f&w=900"
                  alt="service"
                />
              </div>
              <div className="img_service_detail">
              <div className="service_title">
                  <h4>Knowledge of diverse business</h4>
                </div>
                <div className="img_service_summary">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sint vero tenetur aliquid totam qui ipsam?
                  </p>
                </div>
              </div>
            </a>
            <a className="img_service_list">
         
                <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/close-up-business-partner-sitting-front-manager-looking-document_23-2147838536.jpg?t=st=1724258439~exp=1724262039~hmac=6aeddc50ea9f6c6996bb3fafe83382ee2ddfed32f0c72a7efde9ca6df2ebbaf5&w=900"
                  alt="service"
                />
              </div>
              <div className="img_service_detail">
              <div className="service_title">
                  <h4>Outstanding communication</h4>
                </div>
                <div className="img_service_summary">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque alias similique, recusandae, at, iste aperiam maiores
                    quis quia incidunt mollitia laudantium corrupti laboriosam
                    harum molestias!
                  </p>
                </div>
              </div>
            </a>
            <a className="img_service_list">
            
                <div className="service_image">
                <img
                  src="https://img.freepik.com/free-photo/group-businesspeople-working-graph-office_23-2147838537.jpg?t=st=1724258500~exp=1724262100~hmac=66ad26cf021b5cfa52c872a98e80231c0553b641b256bf2bfa7f45aa339d8335&w=740"
                  alt="service"
                />
              </div>
              <div className="img_service_detail">
              <div className="service_title">
                  <h4> creative problem-solving</h4>
                </div>
                <div className="img_service_summary">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque alias similique, recusandae, at, iste aperiam maiores
                    quis quia incidunt mollitia laudantium corrupti laboriosam
                    harum molestias!
                  </p>
                </div>
              </div>
            </a> */}
            </Slide>
          </div>
        </div>
             {/* Products */}
             <div className="real_estate_row_7">
          <div className="bautique_title_demo">
            <h3>Our Products</h3>
            {/* Contact */}
          </div>
          <div className="realEstate_product_list_container">
            <Slider {...product_settings}
             
            >
              <div className="product_list">
            
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/young-consultant-showing-clothes-customer-shopping-center_23-2148101648.jpg?t=st=1724544731~exp=1724548331~hmac=1c14efa91ec858eda43f332296515d2ecba2de38fdf9c0b2547d644c349dc4b3&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                <div className="product_title">
                <h4>Weighless Cloth</h4>
                </div>
                  <small>
                    {" "}
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eveniet cupiditate magnam eos perspiciatis harum enim obcaecati dolor numquam iusto?
               
                  </small>
                  <a href='#'className="link">
                  <small>More Detail</small>
                  </a>
                </div>
              </div>
              <div className="product_list">
             
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/boutique-owner-giving-yellow-paper-bag-smiling-young-woman_23-2148101564.jpg?t=st=1724544801~exp=1724548401~hmac=2897903fadb929baec9b05ad6a364acbde99c2404b670ccf176b7afdcde5d6cb&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                <div className="product_title">
                <h4>Quality Product</h4>
                </div>
                  <small>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eveniet sint, nihil iusto in veniam corporis non pariatur ducimus harum.
                  
                  </small>
                  <a href='#'className="link">
                  <small>More Detail</small>
                  </a>
                </div>
              </div>
              <div className="product_list">
          
                <div className="product_image">
                  <img
                    src="https://img.freepik.com/free-photo/smiling-stylish-woman-showing-colorful-paper-bag_23-2148101563.jpg?t=st=1724544854~exp=1724548454~hmac=6f0e2ebe131bf68cac9708d52038c3b543bc07dd37712151b28fd86a1f8a619b&w=900"
                    alt="product"
                  />
                </div>
                <div className="product_details">
                <div className="product_title">
                <h4>Lowest Price Cloths</h4>
                </div>
                  <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, saepe? Tempore cupiditate aliquid sint eius amet neque numquam fugiat eveniet!
                    
                  </small>
                  <a href='#'className="link">
                  <small>More Detail</small>
                  </a>
             
                </div>
              </div>
           
            </Slider>
          </div>
        </div>
              {/* //Appinment */}
              <div className="row_6">
          <div className="bautique_title_demo">
            <h3>Make An Appoinment</h3>
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
        <div className="row_8">
          <div className="bautique_title_demo">
            <h3>Gallery</h3>
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
                indicators={true}
                autoplay
                {...properties}
                autoplayInterval={1000}
              >
                <img
                  src="https://img.freepik.com/free-photo/focused-female-customer-shop-assistant-browsing-dresses-rack-together-choosing-clothes-fashion-store-full-length-shopping-retail-concept_74855-11722.jpg?t=st=1724544932~exp=1724548532~hmac=9095d9890738b8cc074bee39169fc168892ebec3f1b7f273e6f17c7e07d44bea&w=900"
                  alt="developer"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/excited-female-friends-enjoying-shopping-fashion-store-together-holding-dress-taking-pictures-mobile-phone-consumerism-shopping-concept_74855-11671.jpg?t=st=1724544961~exp=1724548561~hmac=2e949540d3c4a733cfa45f5cc270e672c769fecf364c8c0091ac772e6ee7c62d&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/side-view-fashionable-beautiful-woman-shirt-holding-want-buying-elegant-red-dress-brunette-girl-with-long-hair-choosing-look-evening-spanding-time-shoppinh-mall_132075-12220.jpg?t=st=1724544975~exp=1724548575~hmac=55cbd4ad098d187de365574b8220037dbe6caa2a2843a8b4c173f5b0dbf7b861&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
                <img
                  src="https://img.freepik.com/free-photo/two-fashionable-beautiful-girls-with-colorful-braids-makeup-after-beauty-salon-tacking-self-portrait-smart-phone-stylish-women-smiling-making-photo-store-with-clothes-shopping_132075-12245.jpg?t=st=1724544988~exp=1724548588~hmac=f26213c4e4c6df9101e3a9543b022d3b8872712686f6b7e9f57f13fb95c238c1&w=900"
                  alt="dev"
                  onClick={(e) => openFullImage(e.target.src)}
                />
              </Slide>
            </div>
          </div>
        </div>

   
          {/* Opentime */}
          <div className="row_5">
          <div className="bautique_title_demo">
            <h3>Open&Close Time</h3>
            {/* Contact */}
          </div>
          <div className="time_list_container">
            <div className="time_list">
              <div className="day">
                <span>Monday</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="time_list">
              <div className="day">
                <span>Tuesday</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="time_list">
              <div className="day">
                <span>Wednesday</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="time_list">
              <div className="day">
                <span>Thursday</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="time_list">
              <div className="day">
                <span>Friday</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="time_list">
              <div className="day">
                <span>Weekend Days</span>
              </div>
              <div className="time">
                <div className="start">
                  <h6>Open Time</h6>
                  <span>9:00 AM</span>
                </div>
                <div className="end">
                  <h6>Close Time</h6>
                  <span>11:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    {/* QRCode */}
    <div className="row_12">
          <div className="bautique_title_demo">
            <h3>QRCode</h3>
            {/* Contact */}
          </div>

          <div className="qrcode_container">
            <div className="qr_code_box">
              <h4>
                <small>Note :</small>Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Ducimus, enim?
              </h4>
   <div className="qr_image">
   <div className="user_logo">
            <img
              src="https://img.freepik.com/free-photo/woman-with-black-jacket-black-jacket-with-light-bottom_1340-48120.jpg?t=st=1724522420~exp=1724526020~hmac=b0d5d77e5a16dffb7a7d196901cf0d5b376bc6a8d567a4aef690bdae5c0293e1&w=900"
              alt="user_logo"
            />
          </div>

          <div className="qr">
          <img
                src="https://img.freepik.com/premium-photo/qr-code-area-3d-illustration_118019-6664.jpg?w=740"
                alt=""
              />
          </div>

   </div>
          
            </div>
          </div>
        </div>
        {/* Testimonial */}
        <div className="row_9">
          <div className="bautique_title_demo">
            <h3>Testimonial</h3>
            {/* Contact */}
          </div>
          <div className="testimonial_container">
            <Carousel
              showThumbs={true}
              showStatus={true}
              infiniteLoop
              autoPlay
            >
              <div className="testimonial_list">
                <div className="client_feedback">
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
                  </small>
                </div>
                <div className="client_detail">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                    alt=""
                  />

                  <div className="client_name">
                    <h4>John Doe</h4>
                    <small>-Member</small>
                  </div>
                </div>
              </div>
              <div className="testimonial_list">
                <div className="client_feedback">
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
                  </small>
                </div>
                <div className="client_detail">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-office-worker-cartoon-style-artful-office-mans-avatar-skillfully-blend-design_198565-9434.jpg?w=740"
                    alt=""
                  />

                  <div className="client_name">
                    <h4>Jayakumar </h4>
                    <small>-CEO</small>
                  </div>
                </div>
              </div>
              <div className="testimonial_list">
                <div className="client_feedback">
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
                  </small>
                </div>
                <div className="client_detail">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                    alt=""
                  />

                  <div className="client_name">
                    <h4>Dinesh Kumar</h4>
                    <small>-Member</small>
                  </div>
                </div>
              </div>
              <div className="testimonial_list">
                <div className="client_feedback">
                  <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vel repellendus a ut! Architecto quis error porro nemo
                    beatae perspiciatis omnis?
                  </small>
                </div>
                <div className="client_detail">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon003_750950-54.jpg?w=740"
                    alt=""
                  />

                  <div className="client_name">
                    <h4>Punitha</h4>
                    <small>-Member</small>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
    

                {/* GoogleMap */}

                <div className="google_map_container">
          <div className="bautique_title_demo">
            <h3>Live Location</h3>
          </div>

          <div className="google_map">
            <HtmlRenderer htmlString={`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8650172790676!2d80.23659527507537!3d13.044262813281074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526650e0b6c595%3A0x4f74ddbff946af6b!2sAristostech%20India%20Pvt%20Ltd%20Software%20Company%20%26%20Website%20Design%20Experts!5e0!3m2!1sen!2sin!4v1724171244060!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`} />
          </div>
        </div>
        {/* Feedback */}
        <div className="row_10">
          <div className="bautique_title_demo">
            <h3>Feedback</h3>
            {/* Contact */}
          </div>
          <div className="feedback_container">
            <form action="" onSubmit={feedbackFormik.handleSubmit}>
              <div className="form_group">
                <label
                  htmlFor="clientName_Input"
                  className={`${
                    feedbackFormik.errors.userName ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.userName &&
                  feedbackFormik.errors.userName
                    ? feedbackFormik.errors.userName
                    : "Your Name"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="userName"
                  id="userName"
                  // value={userName}
                  // onChange={(e)=>setUserName(e.target.value)}
                  value={feedbackFormik.values.userName}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                />
              </div>
              <div className="form_group">
                <label
                  htmlFor="clientFeedBack_Input"
                  className={`${
                    feedbackFormik.errors.userFeedback ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.userFeedback &&
                  feedbackFormik.errors.userFeedback
                    ? feedbackFormik.errors.userFeedback
                    : "Your FeedBack"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <textarea
                  id="userFeedback"
                  name="userFeedback"
                  cols="30"
                  rows="2"
                  placeholder="Enter your Feedback"
                  // value={userFeedback}
                  // onChange={(e)=>setUserFeedback(e.target.value)}
                  value={feedbackFormik.values.userFeedback}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                ></textarea>
              </div>
              <div className="form_group">
                <label
                  htmlFor="clientName_Input"
                  className={`${
                    feedbackFormik.errors.currentRatting ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.currentRatting &&
                  feedbackFormik.errors.currentRatting
                    ? feedbackFormik.errors.currentRatting
                    : "Ratting"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div
                  className="ratting_container"
                  data-rating="0"
                  name="currentRatting"
                  id="currentRatting"
                  onMouseOver={handleRatting}
                  onMouseLeave={removeRatting}
                  onClick={RattingSetted}
                  // value={currentRatting}
                  // onChange={(e)=>setCurrentRatting(e.target.value)}
                  value={feedbackFormik.values.currentRatting}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                >
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="1"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="2"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="3"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="4"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="5"></i>
                  </span>
                </div>
              </div>
              <div className="form_actions">
                <button type="submit">
                  <span className="material-symbols-outlined">send</span>
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
                </button>
              )}

              {feedbackLoader ? <span className="feedBack_loader"></span> : ""}
            </div>

            {commentOpen ? (
              <div className="comment_box">
                {AllFeedBacks.map((data, index) => {
                  return (
                    <div className="message" key={index}>
                      <div className="user_detail">
                        <div className="profile">
                          <img src={profile} alt="profile" />
                        </div>
                        <div className="details">
                          <div className="userName">
                            <p>
                              {data.userName}
                              <i className="bx bxs-user-check"></i>
                            </p>
                          </div>
                          <div className="stars">
                            <div
                              className="ratting_container1"
                              data-rating={data.currentRatting}
                              name="currentRatting"
                              // id="currentRatting"
                              id={
                                data.currentRatting == 0
                                  ? "noRatting"
                                  : "" || data.currentRatting == 1
                                  ? "singleRatting"
                                  : "" || data.currentRatting == 2
                                  ? "doubleRatting"
                                  : "" || data.currentRatting == 3
                                  ? "ThreeRatting"
                                  : "" || data.currentRatting == 4
                                  ? "fourRatting"
                                  : "" || data.currentRatting == 5
                                  ? "fullRatting"
                                  : ""
                              }
                              value={data.currentRatting}
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
                        <span>{data.userFeedback}</span>
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

        {/* Inquries */}
        <div className="row_11">
          <div className="bautique_title_demo">
            <h3>Inquries</h3>
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
                  <span className="material-symbols-outlined">send</span>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="row_13">
          <div className="footer_container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={style.$first_back__color} fill-opacity="1" d="M0,96L24,90.7C48,85,96,75,144,58.7C192,43,240,21,288,48C336,75,384,149,432,176C480,203,528,181,576,170.7C624,160,672,160,720,154.7C768,149,816,139,864,117.3C912,96,960,64,1008,48C1056,32,1104,32,1152,53.3C1200,75,1248,117,1296,138.7C1344,160,1392,160,1416,160L1440,160L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
            <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boutique_Demo;
