import React, { useState } from 'react'
import './Edit_form_styles/Edit_Manage_Session.scss'
const Manage_Session = () => {
let [HeaderCheckboxToggle,setHeaderCheckboxToggle]=useState(false);
let [ContactCheckboxToggle,setContactCheckboxToggle]=useState(true);
let [ServiceCheckboxToggle,setServiceCheckboxToggle]=useState(true);
let [GalleriesCheckboxToggle,setGalleriesCheckboxToggle]=useState(true);
let [ProductCheckboxToggle,setProductCheckboxToggle]=useState(true);
let [TestimonialCheckboxToggle,setTestimonialCheckboxToggle]=useState(true);
let [BlogCheckboxToggle,setBlogCheckboxToggle]=useState(true);
let [BusinessCheckboxToggle,setBusinessCheckboxToggle]=useState(true);
let [AppoinmentCheckboxToggle,setAppoinmentCheckboxToggle]=useState(true);
let [BannerCheckboxToggle,setBannerCheckboxToggle]=useState(true);
  return (
<>
<div className="manage_container">
<div className="title">
    <h6>Manage Your Sessions</h6>
    <div className="note">
      <small><span>Note :</span>It will help you to <span>Show (or) Remove </span>your specific session on your <span>VCard Website</span>..</small>
    </div>
  </div>

  <div className="all_session_box">
    <div className="session">
       <div className="checkbox">
      {HeaderCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setHeaderCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setHeaderCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Header</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {ContactCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setContactCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setContactCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Contact</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {ServiceCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setServiceCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setServiceCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Services</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {GalleriesCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setGalleriesCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setGalleriesCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Galleries</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {ProductCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setProductCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setProductCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Products</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {TestimonialCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setTestimonialCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setTestimonialCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Testimonial</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {BlogCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setBlogCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setBlogCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Blogs</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {BusinessCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setBusinessCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setBusinessCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Business Hour</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {AppoinmentCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setAppoinmentCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setAppoinmentCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Appoinments</p>
    </div>
    </div>
    <div className="session">
       <div className="checkbox">
       {BannerCheckboxToggle ? <i className='bx bxs-checkbox-checked on' onClick={()=>setBannerCheckboxToggle(false)}></i>:<i className='bx bxs-checkbox off' onClick={()=>setBannerCheckboxToggle(true)}></i>} 
    </div> 
    <div className="session_name">
        <p>Banner</p>
    </div>
    </div>

  </div>
  <div className="submit_actions">
                <div className="save">
                  <button type="submit">Save</button>
                </div>
                <div className="discard">
                  <button>Discard</button>
                </div>
              </div>
</div>
</>
  )
}

export default Manage_Session;

