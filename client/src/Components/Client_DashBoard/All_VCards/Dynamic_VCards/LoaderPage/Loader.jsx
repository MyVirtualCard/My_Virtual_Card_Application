import React from "react";
import "./Loader.scss";
import loader from "../../../../../assets/Lotte_Animation/Loader2.json";
import Lottie from "react-lottie";
const Loader = () => {
  const LoaderOption = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="dynamic_vcard_loader">
      <div className="svg-wrapper">
        <Lottie
          options={LoaderOption}
          height={window.innerWidth < 900 ? "70px" : "100px"}
          width={window.innerWidth < 900 ? "70px" : "100px"}
          className="lottie"
        />

        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
