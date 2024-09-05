import React, { useContext } from 'react'
import './Styles/User_Notification.scss'
import { ImProfile } from "react-icons/im";
import {NavLink} from 'react-router-dom'
import { RxUpdate } from "react-icons/rx";
import {Link } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Context from '../../Context/GlobalContext';
const User_Notification = () => {

  let{userName}=useContext(Context)
  return (
    <div className="setting_container">
    <div className="notify_title">
       <h3>Notifications</h3>
 
       <Link to={`/${userName}/uadmin/VCards`}>Back <FaArrowRightFromBracket/></Link>
    </div>
 
    <div className="notification_box">

      <div className="notify_content">
        {/* Profile_update */}
        <div className="Profile_update_container">
         <div className="Profile_update_title">
           <h4>From Aristostech India Private Limited</h4>
         </div>
      <div className="notifications">
     <small>Notification Empty!</small>
      </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default User_Notification;
