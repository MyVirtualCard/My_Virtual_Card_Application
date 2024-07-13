import React, { useState } from "react";
import "./menuStyles/Users.scss";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Select } from "@mui/material";
import Footer from "../Footer/Footer";
const Users = () => {

  let [userFormToggle,setUserFormToggle]=useState(false);
  const [selectedOption, setSelectedOption] = useState('Select Plan');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="users_container">
        {!userFormToggle ?   
        <div>
        <div className="row_1">
          <div className="row_1_left">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="row_1_right">
            <div className="filter_icons">
              <i className="bx bxs-filter-alt"></i>
            </div>

            <div className="add_new_user_btn">
              <button onClick={()=>setUserFormToggle(true)}>Add New</button>
            </div>
          </div>
        </div>
        <div className="row_2 table-responsive rounded-4">
          <table className="table table-hover   ">
            <thead className="table-dark w-100">
              <tr>
                <th className=" text-nowrap ">FULLNAME</th>
                <th className=" text-nowrap">CURRENT PLAN</th>
                <th className=" text-nowrap">EMAIL VERIFIED</th>
                <th className=" text-nowrap">IMPERSONATE</th>
                <th className=" text-nowrap">IS ACTIVE</th>
                <th className=" text-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" p-3 text-secondary text-nowrap d-flex align-items-center justify-content-start g-3">
                  <img
                    src="https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1715077295~exp=1715077895~hmac=e2a642dc99025b5f6986f574fc639e8e7561e06f2a1875aea92f2b0f5b98c911"
                    alt="logo"
                  />
                  <div className="user_detail d-flex flex-column align-items-start justify-content-center g-1">
                    <h5 className="fs-6">Kodiyarasu C</h5>
                    <small className="text-info">kodiyarasu01@gmail.com</small>
                  </div>
                </td>
                <td className="p-3 text-secondary  text-nowrap ">
                  <span className="text-success py-2 px-4 rounded fw-bolder h-100 plan">
                    Free
                  </span>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch />
                </td>
                <td className="p-3 text-secondary  text-nowrap">
                  <p className="py-1 px-0 text-bg-primary rounded  fw-bold">
                    Impersonate
                  </p>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch {...label} defaultChecked />
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <div className="actions d-flex align-items-center justify-content-center g-5">
                    <BorderColorIcon className="text-secondary mr-3" />
                    <DeleteForeverIcon className="text-danger" />
                  </div>
                </td>
              </tr>
              <tr>
                <td className=" p-3 text-secondary text-nowrap d-flex align-items-center justify-content-start g-3">
                  <img
                    src="https://img.freepik.com/free-photo/3d-portrait-businessman_23-2150793877.jpg?t=st=1715195874~exp=1715199474~hmac=34c422fd04591a92f3585a3d767e8cf9efebd56a71cdef6b173b7c3455917aa1&w=740"
                    alt="logo"
                  />
                  <div className="user_detail d-flex flex-column align-items-start justify-content-center ">
                    <h5 className="fs-6">Jayakumar V</h5>
                    <small className="text-info">jayakumar@gmail.com</small>
                  </div>
                </td>
                <td className="p-3 text-secondary  text-nowrap ">
                  <span className="text-success py-2 px-4 rounded fw-bolder h-100 plan">
                    Free
                  </span>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch />
                </td>
                <td className="p-3 text-secondary  text-nowrap">
                <p className="py-1 px-0 text-bg-primary rounded  fw-bold">
                    Impersonate
                  </p>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch {...label} defaultChecked />
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <div className="actions d-flex align-items-center justify-content-center g-5">
                    <BorderColorIcon className="text-secondary mr-3" />
                    <DeleteForeverIcon className="text-danger" />
                  </div>
                </td>
              </tr>
              <tr>
                <td className=" p-3 text-secondary text-nowrap d-flex align-items-center justify-content-start g-3">
                  <img
                    src="https://img.freepik.com/free-photo/3d-icon-travel-with-man_23-2151037420.jpg?t=st=1715195941~exp=1715199541~hmac=35b436cbc2b713c4512ca46a341b4c66691d44bf9e0ff20de9afaa1605da79c3&w=826"
                    alt="logo"
                  />
                  <div className="user_detail d-flex flex-column align-items-center justify-content-center ">
                    <h5 className="fs-6">Dinesh Kumar K</h5>
                    <small className="text-info">dinesh@gmail.com</small>
                  </div>
                </td>
                <td className="p-3 text-secondary  text-nowrap ">
                  <span className="text-success py-2 px-4 rounded fw-bolder h-100 plan">
                    Free
                  </span>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch  />
                </td>
                <td className="p-3 text-secondary  text-nowrap">
                <p className="py-1 px-0 text-bg-primary rounded  fw-bold">
                    Impersonate
                  </p>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch {...label} defaultChecked />
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <div className="actions d-flex align-items-center justify-content-center g-5">
                    <BorderColorIcon className="text-secondary mr-3" />
                    <DeleteForeverIcon className="text-danger" />
                  </div>
                </td>
              </tr>
              <tr className="w-100">
                <td className=" p-3 text-secondary text-nowrap d-flex align-items-center justify-content-start g-3">
                  <img
                    src="https://img.freepik.com/free-photo/3d-illustration-happy-cartoon-man-wearing-glasses-suspenders_1142-41013.jpg?t=st=1715196229~exp=1715199829~hmac=f909ed5b8ba2e66f1ccc773d1e081b99a85a795886d0b9550663276e714f2253&w=740"
                    alt="logo"
                  />
                  <div className="user_detail d-flex flex-column align-items-start justify-content-center ">
                    <h5 className="fs-6">John T</h5>
                    <small className="text-info">john@gmail.com</small>
                  </div>
                </td>
                <td className="p-3 text-secondary  text-nowrap ">
                  <span className="text-success py-2 px-4 rounded fw-bolder h-100 plan">
                    Free
                  </span>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch />
                </td>
                <td className="p-3 text-secondary  text-nowrap">
                <p className="py-1 px-0 text-bg-primary rounded  fw-bold">
                    Impersonate
                  </p>
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <Switch {...label} defaultChecked />
                </td>
                <td className="p-3 text-secondary text-nowrap ">
                  <div className="actions d-flex align-items-center justify-content-center g-5">
                    <BorderColorIcon className="text-secondary mr-3" />
                    <DeleteForeverIcon className="text-danger" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>:   <div className="user_form_container">
           <div className="user_form_title d-flex align-items-center justify-content-between">
            <h4 className="fw-bold">Add User</h4>
            <button onClick={()=>setUserFormToggle(false)}>Back</button>
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
              <div className="form_group">
                <label htmlFor="confirm_password">Plan<span><em>*</em></span></label>
                <select value={selectedOption} onChange={handleChange}>
          <option value="option1">-----Select Plan-----</option>
          <option value="option2" className="opt">Free Plan</option>
          <option value="option3">Basic Plan</option>
          <option value="option4">Standard Plan</option>
          <option value="option4">Testing Plan</option>
          <option value="option4">Premium Plan</option>
        </select>
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
      
      <div className="row_3">
        <Footer/>
      </div>
    
      </div>
    </>
  );
};

export default Users;
