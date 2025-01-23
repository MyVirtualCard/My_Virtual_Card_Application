import React from "react";
import "./Footer.scss";
import Lottie from "react-lottie";
import logo from "../../../assets/Brand_Logo/brand_logo.png";
import SocialIconBack from "../../../assets/Lotte_Animation/Logo_Back.json";
import footerBack from "../../../assets/Lotte_Animation/Gradient_Back3.json";
const Footer = () => {
  const footerBackImageoptions = {
    loop: true,
    autoplay: true,
    animationData: footerBack,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const SocialIconoptions = {
    loop: true,
    autoplay: true,
    animationData: SocialIconBack,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="Footer_container">
      
      <div className="footer_row1">
      <div className="Footer_left">
          <div className="row_1">
            <div className="company">
              <img src={logo} alt="logo" />
              <h3>MyVirtualCard.In</h3>
            </div>
            <div className="details">
              <div className="list">
                <i className="bx bx-mail-send"></i>
                <p>contact@aristostechindia.com</p>
              </div>
              <div className="list">
                <i className="bx bx-phone-call"></i>
                <p>+91 93444 82370</p>
              </div>
              <div className="list">
              <i className='bx bxs-map'></i>
                <p>G. N Chetty Road, T. Nagar, Chennai-600017</p>
              </div>
            </div>
          </div>
        
        </div>
        <div className="Footer_right">
       <div className="row_1">
       <div className="form">
              <form action="">
                <div className="form_group">
                  <input type="text" placeholder="Your Email" />
                </div>
                <div className="action">
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
       </div>
       <div className="row_2">

      
<div className="social_medias">
  <a href="#">
    <i className="bx bxl-facebook"></i>
    {/* <div className="note">
    <p>Facebook</p>
  </div> */}
    <div className="back_anime">
      <Lottie
        options={SocialIconoptions}
        height={window.innerWidth < 900 ? "40px" : "50px"}
        width={window.innerWidth < 900 ? "40px" : "50px"}
        className="lottie"
      />
    </div>
  </a>
  <a href="#">
    <i className="bx bxl-instagram-alt"></i>
    {/* <div className="note">
    <p>Instagram</p>
  </div> */}
    <div className="back_anime">
      <Lottie
        options={SocialIconoptions}
        height={window.innerWidth < 900 ? "40px" : "50px"}
        width={window.innerWidth < 900 ? "40px" : "50px"}
        className="lottie"
      />
    </div>
  </a>
  <a href="#">
    <i className="bx bxl-whatsapp"></i>
    {/* <div className="note">
    <p>Whatsup</p>
  </div> */}
    <div className="back_anime">
      <Lottie
        options={SocialIconoptions}
        height={window.innerWidth < 900 ? "40px" : "50px"}
        width={window.innerWidth < 900 ? "40px" : "50px"}
        className="lottie"
      />
    </div>
  </a>
  <a href="#">
    <i className="bx bxl-twitter"></i>
    {/* <div className="note">
    <p>Twiter</p>
  </div> */}
    <div className="back_anime">
      <Lottie
        options={SocialIconoptions}
        height={window.innerWidth < 900 ? "40px" : "50px"}
        width={window.innerWidth < 900 ? "40px" : "50px"}
        className="lottie"
      />
    </div>
  </a>
  <a href="#">
    <i className="bx bxl-linkedin"></i>
    {/* <div className="note">
    <p>LinkedIn</p>
  </div> */}
    <div className="back_anime">
      <Lottie
        options={SocialIconoptions}
        height={window.innerWidth < 900 ? "40px" : "50px"}
        width={window.innerWidth < 900 ? "40px" : "50px"}
        className="lottie"
      />
    </div>
  </a>
</div>


</div>
          
          </div>

      </div>
      
      <div className="copyright">
      <small>
              &copy; 2024 MyVirtualCard.In. All rights reserved.
            </small>
      </div>
       
        
       
      </div>
    </>
  );
};

export default Footer;
