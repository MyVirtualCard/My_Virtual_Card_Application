import "./Teacher_Preview.scss";
import Lottie from "react-lottie";
//service Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BackAnime from "../../../../../assets/Lotte_Animation/Back_Anime4.json";
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

  console.log(ArticleIndex);
  return (
    <div className="doctor_demo_container">
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
                  src="https://img.freepik.com/premium-photo/portrait-young-female-with-curly-hair-dressed-violet-sweater-looking-camera_79762-2422.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid"
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
                      <a href="#" target="_blank">
                        Taxation
                      </a>
                      <a href="#" target="_blank">
                        Digital Marketing
                      </a>
                      <a href="#" target="_blank">
                        HRM
                      </a>
                      <a href="#" target="_blank">
                        Business Management
                      </a>
                      <a href="#" target="_blank">
                        Finance
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

            {/* Footer */}
            <div className="Footer">
              <div className="footer_container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,96L80,122.7C160,149,320,203,480,213.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
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
                src="https://img.freepik.com/premium-photo/portrait-young-female-with-curly-hair-dressed-violet-sweater-looking-camera_79762-2422.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid"
                alt="profile"
              />
            </div>
          </div>

          <div className="author_details">
            <div className="profile">
              <img
                src="https://img.freepik.com/premium-photo/portrait-young-female-with-curly-hair-dressed-violet-sweater-looking-camera_79762-2422.jpg?uid=R79330344&ga=GA1.1.1189974794.1739838046&semt=ais_hybrid"
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
                  <td>{Papers[ArticleIndex]. PublicationDate}</td>
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
