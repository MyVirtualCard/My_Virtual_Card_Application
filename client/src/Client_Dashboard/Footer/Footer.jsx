import React from 'react'
import './Footer.scss';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
   <>
   <div className="footer_container">
    <div className="footer_left">
     <h4>All Rights Reserved ©2024 <Link to='/'>myvirtualcard.in</Link></h4>
    </div>
    <div className="footer_right">
     <p>Version 1.0</p>
    </div>
   </div>
   </>
  )
}

export default Footer;

