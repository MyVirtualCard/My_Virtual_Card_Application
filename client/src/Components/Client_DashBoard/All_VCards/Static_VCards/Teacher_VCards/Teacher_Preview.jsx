import "./Teacher_Preview.scss";
import Lottie from "react-lottie";
//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaShareFromSquare } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RiCloseLargeLine } from "react-icons/ri";
import "react-slideshow-image/dist/styles.css";
//Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BackAnime from "../../../../../assets/Lotte_Animation/Back_Anime3.json";
import { useState } from "react";
const Teacher_Preview = () => {
  const BackImageOptions = {
    loop: true,
    autoplay: true,
    animationData: BackAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  let [ViewArticle, setViewArticle] = useState(false);
  let [ArticleIndex, setArticleIndex] = useState(0);
  let [ActivePDF, setActivePDF] = useState("Images");
  const [width, setWidth] = useState(window.innerWidth);
  const Papers = [
    {
      id: 1,
      Title:
        "Online shopping behavior and attitude among the college teachers towards digital marketing",
      Authors: "M Nithyalakshmi",
      PublicationDate: "2022/12",
      Journal: "Shodhasmitha – journal of fundamental comparative research",
      Volume: "8",
      Issue: "No. 2(III) J",
      Pages: "pp.612-615,",
      Publisher: "Shodhasmitha – journal of fundamental comparative research",
    },
    {
      id: 2,
      Title:
        "AI-DRIVEN CUSTOMER SEGMENTATION: UNLOCKING VALUABLE INSIGHTS FOR PRECISION MARKETING",
      Authors: "M Nithyalakshmi",
      PublicationDate: "2024/5",
      Journal: "Futuristic Trends in Management volumn 3 Book 25",
      Volume: "3",
      Issue: "No. 2(III) J",
      Pages: "42-47,",
      Publisher: "IIP Series",
    },
    {
      id: 3,
      Title: "A Review on Blogging as Tool in Digital Marketing",
      Authors: "M Nithyalakshmi",
      PublicationDate: "2024/1",
      Journal:
        "IJRAR - International Journal of Research and Analytical Reviews",
      Volume: "11",
      Issue: "1",
      Pages: "pp.612-615,",
      Publisher: "IJPUBLICATION | IJRAR | www.ijrar.org",
    },
  ];

  const Gallery = [
    {
      id: 1,
      Title: "Image 1",
      Image:
        "https://img.freepik.com/free-photo/copywriter-writing-ideas_1098-17580.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid",
    },
    {
      id: 2,
      Title: "Image 2",
      Image:
        "https://img.freepik.com/free-photo/medium-shot-woman-enjoying-blue-matcha_23-2150649614.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid",
    },
    {
      id: 3,
      Title: "Image 3",
      Image:
        "https://img.freepik.com/free-photo/front-view-businesswoman-working-with-laptop-notebook_23-2148788877.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid",
    },
  ];
  // const Certificates = [
  //   {
  //     id: 1,
  //     Title: "Doc 1",
  //     Image: "../../../../../../public/PDF/Arthi R E.jpg",
  //   },
  //   {
  //     id: 2,
  //     Title: "Doc 2",
  //     Image: "../../../../../../public/PDF/Dr.K. J. Vinodini.jpg",
  //   },
  //   {
  //     id: 3,
  //     Title: "Doc 3",
  //     Image: "../../../../../../public/PDF/Dr.S.Constance Angela.jpg",
  //   },
  //   {
  //     id: 4,
  //     Title: "Doc 4",
  //     Image: "../../../../../../public/PDF/Dr.S.Maragathasundari.jpg",
  //   },
  //   {
  //     id: 5,
  //     Title: "Doc 5",
  //     Image: "../../../../../../public/PDF/Dr.S.Maragathasundari.jpg",
  //   },
  //   {
  //     id: 6,
  //     Title: "Doc 6",
  //     Image: "../../../../../../public/PDF/Nivedha M.jpg",
  //   },
  // ];
  //Gallery Functionality
  const handleShare = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this image!",
          text: "Have a look at this cool image.",
          url: url, // Replace with your image URL
        });
        toast.success("Image Link Copied!");
      } catch (error) {
        toast.error("Error sharing the image." + error);
      }
    } else {
      toast.error("Sharing not supported on this browser.");
    }
  };

  const handleDownload = async (imageUrl) => {
    const link = document.createElement("a");
    link.href = await imageUrl; // Replace with your image URL or path
    link.download = "downloaded-image.jpg"; // The name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSelectChange = (event) => {
    setActivePDF(event.target.value);
  };
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
  return (
    <div className="doctor_demo_container">
         {/* Gallery Full IMAGE */}
            <div
              className="full_image"
              id="fullImageBox"
              style={{ position: "absolute", top: scrollY }}
            >
              <div className="close_Full_Image_gallery">
                <RiCloseLargeLine className="icon" onClick={closeFullImage} />
              </div>
              <img src='' alt="gallery" id="fullImage" />
            </div>
      <div className="lottie">
        <Lottie
          options={BackImageOptions}
          height={window.innerWidth < 700 ? "100%" : "100%"}
          width={window.innerWidth < 700 ? "100%" : "100%"}
          className="lottie"
        />
      </div>
      {ViewArticle == false ? (
        <>
          <div className="doctor_box">
            {/* Banner and logo */}
            <div className="Image_row_1">
              {/* <div className="banner_image">
            <img
              src="https://img.freepik.com/premium-photo/group-people-sitting-around-table-front-cityscape_250469-22109.jpg?w=1060"
              alt="banner"
            />
            <div className="overlay"></div>
          </div> */}
              <div className="user_logo">
                <img
                  src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=tnYiyxMAAAAJ&citpid=1"
                  alt="user_logo"
                />
                {/* <div className="svg_image">
              <img src={profileSVG[sVGIndex]} alt="svg_logo_back" />
            </div> */}
              </div>
              {/* Actions */}
              <div className="contacts_btns">
                {/* Call */}
                <a href="tel:+919344482370" target="_blank">
                  <i className="bx bx-phone-call"></i>

                  <div className="plus">
                    <i className="bx bx-plus"></i>
                  </div>
                </a>
                {/* Mail */}
                <a href={`mailto:contact@aristostechindia.com`} target="_blank">
                  <i className="bx bxl-gmail"></i>
                  <div className="plus">
                    <i className="bx bx-plus"></i>
                  </div>
                </a>
                {/* Whatsup */}
                <a
                  href={`https://wa.me/+919344482370?text=${encodeURIComponent(
                    `Hi there!`
                  )}`}
                  target="_blank"
                >
                  <i className="bx bxl-whatsapp"></i>
                  <div className="plus">
                    <i className="bx bx-plus"></i>
                  </div>
                </a>
                {/* Direction */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query="No. 113, Ankur Plaza, GN Chetty Rd, T. Nagar, Chennai, India, Tamil Nadu 600017`}
                  target="_blank"
                >
                  <i className="bx bx-current-location"></i>
                  <div className="plus">
                    <i className="bx bx-plus"></i>
                  </div>
                </a>
              </div>
            </div>
            {/* basic Details */}
            <div className="basic_row_2">
              <div className="user_details">
                <div className="user_data">
                  <div className="user_information">
                    <h2>M Nithyalakshmi</h2>
                    <p>
                      Asst. Professor of Commerce, Dharmamurthi Rao Bahadur
                      calavala cunnan chettys HINDU COLLEGE Verified email at
                      drbccchinducollege.edu.in - Homepage
                    </p>

                    <div className="article_title">
                      <a  onClick={() => {
                          setViewArticle(true), setArticleIndex(0);
                        }}>
                        Taxation
                      </a>
                      <a  onClick={() => {
                          setViewArticle(true), setArticleIndex(1);
                        }}>
                        Digital Marketing
                      </a>
                      <a  onClick={() => {
                          setViewArticle(true), setArticleIndex(2);
                        }}>
                        HRM
                      </a>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Filter */}
            <div className="filter_row_3">
              <form>
                <select>
                  <option value="">SORT</option>
                  <option value="">Sort by citations</option>
                  <option value="Sort by year">Sort by year</option>
                  <option value="Sort by title">Sort by title</option>
                </select>
              </form>
            </div>
            {/* //Papers */}
            <div className="publishing_container">
              {Papers.map((data, index) => {
                return (
                  <div className="paper" key={index}>
                    <div className="paper_title">
                      <a
                        onClick={() => {
                          setViewArticle(true), setArticleIndex(index);
                        }}
                      >
                        <p>{data.Title}</p>
                      </a>
                    </div>
                    <div className="author">
                      <div className="name">
                        <p>{data.Authors}</p>
                      </div>

                      <div className="date">
                        <small>{data.PublicationDate}</small>
                      </div>
                    </div>

                    <div className="journal">
                      <p>{data.Journal}</p>
                    </div>
                    <div className="details">
                      <div className="issue">
                        <p>Issued : {data.Issue}</p>
                      </div>
                      <small>|</small>
                      <div className="volume">
                        <small>volume : {data.Volume}</small>
                      </div>
                    </div>
                    <div className="publisher">
                      <p>{data.Publisher}</p>
                    </div>
                    <div className="pages">
                      <small>Page No : {data.Pages}</small>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Awards */}
            <div className="Gallery_container">
              <div className="gallery_title">
                <div className="left">
                  <h2> Posts </h2>
                  <FaAward className="icon" />
                </div>
                <div className="right">
                  <form>
                    <select value={ActivePDF} onChange={handleSelectChange}>
                      <option value="Images">Images</option>
                      <option value="Documents">Documents</option>
                    </select>
                  </form>
                </div>
              </div>
              {ActivePDF == "Images" ? (
                <div className="gallery_container">
                  <div className="full_image" id="fullImageBox">
                    <div className="close_Full_Image_gallery">
                      <span className="material-symbols-outlined">cancel</span>
                    </div>
                  </div>

                  <div className="gallery_box">
                    {Gallery.map((data, index) => {
                      return (
                        <>
                          <div className="gallery_item" key={index}>
                            <img
                              src={data.Image}
                              alt="developer"
                              // onClick={(e) => openFullImage(e.target.src)}
                            />

                            <div className="actions">
                              <IoMdDownload
                                className="icon"
                                onClick={() => handleDownload(data.Image)}
                              />
                              <FaRegEye className="icon"    onClick={() => openFullImage(data.Image)}/>
                              <FaShareFromSquare
                                className="icon"
                                onClick={() => handleShare(data.Image)}
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                <div className="documents">
                <p>No Document Found!</p>
                </div>
                 

                  {/* <iframe
        src="../../../../../../public/PDF/Hall Ticket.pdf"
        width="100%"
        height="200px"
        title="PDF Viewer"
      /> */}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="Footer">
              <div className="footer_container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#0099ff"
                    fillOpacity="1"
                    d="M0,96L80,122.7C160,149,320,203,480,213.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                  ></path>
                </svg>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="article_box">
          <div className="view_article_header">
            <div className="left">
              <i
                className="bx bx-left-arrow-alt"
                onClick={() => setViewArticle(false)}
              ></i>
              <h2>View Article</h2>
            </div>
            <div className="right">
              <img
                src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=tnYiyxMAAAAJ&citpid=1"
                alt="profile"
              />
            </div>
          </div>

          <div className="author_details">
            <div className="profile">
              <img
              src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=tnYiyxMAAAAJ&citpid=1"
                alt="profile"
              />
            </div>
            <div className="name">
              <p>M Nithyalakshmi</p>
            </div>
          </div>

          <div className="article">
            <div className="article_header">
              <h2>{Papers[ArticleIndex].Title}</h2>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Author</th>
                </tr>
                <tr>
                  <th>Year</th>
                </tr>
                <tr>
                  <th>Journal</th>
                </tr>
                <tr>
                  <th>Volume</th>
                </tr>
                <tr>
                  <th>Pages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Papers[ArticleIndex].Authors}</td>
                </tr>
                <tr>
                  <td>{Papers[ArticleIndex].PublicationDate}</td>
                </tr>
                <tr>
                  <td>{Papers[ArticleIndex].Journal}</td>
                </tr>
                <tr>
                  <td>{Papers[ArticleIndex].Volume}</td>
                </tr>
                <tr>
                  <td>{Papers[ArticleIndex].Pages}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher_Preview;
