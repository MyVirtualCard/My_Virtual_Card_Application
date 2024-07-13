import React, { useState } from "react";
import "./menuStyles/Admins.scss";
import Dropdown from "react-bootstrap/Dropdown";
import Switch from "@mui/material/Switch";
import Footer from "../Footer/Footer";
const label = { inputProps: { "aria-label": "Switch demo" } };
const Admins = () => {

  let[adminFormToggle,setAdminFormToggle]=useState(false)
  return (
    <>
      <div className="admins_container_box">
        {!adminFormToggle ?    
        <div className="admin_parent_box">
         <div className="row_one">
            <div className="search_box">
              <input
                type="text"
                placeholder="Search"
                id="search"
                name="search"
                className="py-2 px-5"
              />
            </div>
            <div className="add_admin_actions">
              <button onClick={()=>setAdminFormToggle(true)}><i className='bx bx-user-plus'></i>Add Admin</button>
            </div>
          </div> 
          <div className="row_two">
            <div className="admin_table table-responsive rounded-4">
              <table className="table   ">
                <thead className="table-dark ">
                  <tr className="align-middle d-flex align-items-center justify-content-between w-100 m-auto">
                    <th scope="col" className="text-nowrap text-center">
                      #
                    </th>
                    <th scope="col" className="text-nowrap" colspan="2">
                      Name
                    </th>
                    <th scope="col" className="text-nowrap">
                      EMAIL VERIFIED
                    </th>
                    <th scope="col" className="text-nowrap">
                      IS ACTIVE
                    </th>
                    <th scope="col" className="text-nowrap " colspan="4">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className=" rounded table-light">
                  <tr className="align-middle d-flex align-items-center justify-content-between w-100 m-auto">
                    <td className="text-nowrap" scope="row">
                      1
                    </td>
                    <td
                      className="text-nowrap d-flex flex-column align-items-center justify-content-center g-1"
                      colspan="2"
                    >
                      <p>Jayakumar V</p>
                      <small>jayakumar@gmail.com</small>
                    </td>
                    <td className="text-nowrap">
                      <div class="wrap-check-57">
                        <input id="s1-57" type="checkbox" class="switch" />
                        <label for="s1-57"></label>
                      </div>
                    </td>
                    <td className="text-nowrap">
                      <div class="wrap-check-57">
                        <input id="s1-57" type="checkbox" class="switch" />
                        <label for="s1-57"></label>
                      </div>
                    </td>
                    <td className="text-nowrap" colspan="4">
                      <i className="bx bxs-edit-alt p-3"></i>
                      <i className="bx bxs-trash"></i>
                    </td>
                  </tr>
                  <tr className="align-middle d-flex align-items-center justify-content-between w-100 m-auto">
                    <td className="text-nowrap" scope="row">
                      2
                    </td>
                    <td
                      className="text-nowrap d-flex flex-column align-items-center justify-content-center g-1"
                      colspan="2"
                    >
                      <p>Dinesh Kumar T</p>
                      <small>dineshkumar@gmail.com</small>
                    </td>
                    <td className="text-nowrap">
                      <div class="wrap-check-57">
                        <input id="s1-57" type="checkbox" class="switch" />
                        <label for="s1-57"></label>
                      </div>
                    </td>
                    <td className="text-nowrap">
                      <div class="wrap-check-57">
                        <input id="s1-57" type="checkbox" class="switch" />
                        <label for="s1-57"></label>
                      </div>
                    </td>
                    <td className="text-nowrap" colspan="4">
                      <i className="bx bxs-edit-alt p-3"></i>
                      <i className="bx bxs-trash"></i>
                    </td>
                  </tr> 
            
                </tbody>
              </table>
            </div>
          </div>
<div className="row_three">
  <Footer/>
</div>
        
        </div>:  
        <div className="admin_form_container">
           <div className="admin_form_title d-flex align-items-center justify-content-between">
            <h4 className="fw-bold">Add Admin</h4>
            <button onClick={()=>setAdminFormToggle(false)}>Back</button>
           </div>
           <div className="admin_form_box">
            <form action="">
              <div className="form_group">
                <label htmlFor="firstName">FirstName<span><em>*</em></span></label>
                <input type="text" placeholder="Enter Your FirstName" />
                <i className='bx bx-user i'></i>
              </div>
              <div className="form_group">
                <label htmlFor="lastName">LastName<span><em>*</em></span></label>
                <input type="text" placeholder="Enter Your LastName" />
                <i className='bx bx-user-voice' ></i>
              </div>
              <div className="form_group">
                <label htmlFor="email">Email<span><em>*</em></span></label>
                <input type="email" placeholder="Enter Your Email" />
                <i className='bx bx-envelope' ></i>
              </div>
              <div className="form_group">
                <label htmlFor="mobileNumber">Contact No<span><em>*</em></span></label>
                <input type="tel" placeholder="+91 ............" />
                <i className='bx bx-phone-call'></i>
              </div>
              <div className="form_group">
                <label htmlFor="password">Create Password<span><em>*</em></span></label>
                <input type="password" placeholder="Create Secure Password" />
                <i className='bx bx-lock-open' ></i>
            
              </div>
              <div className="form_group">
                <label htmlFor="confirm_password">Confirm Password<span><em>*</em></span></label>
                <input type="password" placeholder="Confirm Secure Password" />
                <i className='bx bx-lock' ></i>
              </div>
              <div className="form_group profile_group">
                <label htmlFor="profile">
                  <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="profile"/>
                  <i className='bx bxs-edit-location'></i>
                </label>
                <small>Allowed file types: png, jpg, jpeg.</small>
                <input type="file" name="profile" id="profile" />
              </div>

              <div className="form_submit">
                <button>Save</button>
              </div>
            </form>
           </div>
        </div>}
  


      
      </div>
    </>
  );
};

export default Admins;
