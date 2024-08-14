import React from 'react'
import './Footer.scss';
import {useNavigate} from 'react-router-dom'
const Footer = () => {

  let navigate=useNavigate();
  return (
    <>

    <div className="footer_container">
    <footer>
      <small>All Rights Reserved ©2024 <span onClick={()=>navigate('/')}>myvirtualcard.in</span></small>
      <p>v1.2.0</p>
    </footer>
  </div>
  </>
  )
}

export default Footer;
