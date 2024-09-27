import React from "react";
import "./Page_Not_Found_Error_Page.scss";
import not_found from "../../src/assets/404/page_not_found.jpg";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const Page_Not_Found_Error_Page = () => {
  return (
    <>
      <div className="page_not_found">
        <div className="left">
          <h3>Page Not Found</h3>
          <p>If you are receiving 404 Error Page  because of your  URL Path not matching.. so u may provide correct URL PathName to avoid this Error Page!</p>

          <Link to='/'><FaHome/>Go Home</Link>
        </div>
        <div className="right">
          <img src={not_found} alt="Page Not Found" />
        </div>
      </div>
    </>
  );
};

export default Page_Not_Found_Error_Page;
