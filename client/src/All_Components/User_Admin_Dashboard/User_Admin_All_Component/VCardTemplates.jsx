import React,{useRef,useState} from 'react'
import './menuStyles/VCardTemplates.scss';
import card1 from '../../assets/Digicards/1.png';
import card2 from '../../assets/Digicards/2.png';
import card3 from '../../assets/Digicards/3.png';
import card4 from '../../assets/Digicards/4.png';
import card5 from '../../assets/Digicards/5.png';
import card6 from '../../assets/Digicards/6.png';
import card7 from '../../assets/Digicards/7.png';
import card8 from '../../assets/Digicards/8.png';
import card9 from '../../assets/Digicards/9.png';
import Footer from '../Footer/Footer';

const VCardTemplates = () => {

  return (
   <>
   <div className="vcard_template_container">
{/* <div className="row_1">
  <input type="text" placeholder='Search....' />
</div> */}
<div className="row_2">
<div className="image_container">
  <div className="image"  >
     <div className="used_count">
       <h5>Used Count - <small>05</small></h5>
     </div>
    <a href="https://digital-vcard.netlify.app/" target='_blank'>
      <img src={card7} alt=""  />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>08</small></h5>
     </div>
    <a href="https://digital-vcard3.netlify.app/" target='_blank'>
      <img src={card2} alt="" id='image'/>
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>15</small></h5>
     </div>
    <a href="https://digital-vcard4.netlify.app/" target='_blank'>
      <img src={card3} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>03</small></h5>
     </div>
    <a href="https://digital-vcard5.netlify.app/" target='_blank'>
      <img src={card4} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>02</small></h5>
     </div>
    <a href="https://digital-vcard6.netlify.app/" target='_blank'>
      <img src={card5} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>07</small></h5>
     </div>
    <a href="https://digital-vcard7.netlify.app/" target='_blank'>
      <img src={card6} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>03</small></h5>
     </div>
    <a href="https://digital-vcard2.netlify.app/" target='_blank'>
      <img src={card1} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>06</small></h5>
     </div>
    <a href="#" target='_blank'>
      <img src={card8} alt="" />
    </a>
  </div>
  <div className="image">
        <div className="used_count">
       <h5>Used Count - <small>01</small></h5>
     </div>
    <a href="#" target='_blank'>
      <img src={card9} alt="" />
    </a>
  </div>
</div>
</div>
<div className="row_3">
  <Footer/>
</div>
   </div>
   </>
  )
}

export default VCardTemplates;
