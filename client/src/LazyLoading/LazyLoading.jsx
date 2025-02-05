import React from "react";
import "./LazyLoading.scss";
import lazy_loader from "../assets/Loaders/Lazy_loader.svg";
import Lottie from "react-lottie";
import LoaderAnime from "../assets/Lotte_Animation/Loader6.json";
const LazyLoading = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: LoaderAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="lazy_loading_container">
        <div className="back_image"></div>
        <p>Loading...</p>
        <Lottie
          options={options}
          height={window.innerWidth < 900 ? "150px" : "180px"}
          width={window.innerWidth < 900 ? "150px" : "180px"}
          className="lottie"
        />
      </div>
    </>
  );
};

export default LazyLoading;
