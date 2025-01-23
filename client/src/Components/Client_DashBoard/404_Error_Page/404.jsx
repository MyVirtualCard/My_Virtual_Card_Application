import React from "react";
import "./404.scss";
import not_found from "../../../../src/assets/404/page_not_found.jpg";
import { Link } from "react-router-dom";
const URLNotFound = () => {
  return (
    <>
      <div className="page_not_found">
        <div className="left">
          <h3>Page Not Found</h3>
          <p>If you are receive 404 page error your URL PathName not matching either not been created...Go and create your VCard (or) provide correct URL PathName (or) Your plan will be expired to avoid this error page make to resolve any one of them you want!</p>

          <Link to='/'>Go Home</Link>
        </div>
        <div className="right">
          <img src={not_found} alt="Page Not Found" />
        </div>
      </div>
    </>
  );
};

export default URLNotFound;
