import React from "react";
import "./styles/AccountSetting.scss";
const AccountSetting = () => {
  return (
    <>
      <div className="account_setting_container">
        <div className="account_form_box">
          <form action="">
            <div className="form_group">
              <label htmlFor="avatar">
                <h5>
                  Avatar{" "}
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>

              <label htmlFor="avatar">
                <img
                  src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1715790254~exp=1715793854~hmac=ba7343c32c0eb17b5cadcdddf5f5ea1b4cc7510ce54d4436095344458fedb8ca&w=740"
                  alt="avatar"
                />
                <i class='bx bxs-message-rounded-edit'></i>
              </label>

              <input type="file" id="avatar" name="avatar" />
            </div>
            <div className="form_group">
              <label htmlFor="fullName">
                <h5>
                  FullName
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>

              <div className="input">
                <div className="first">
                <input type="text" placeholder="Enter FirstName" value='Super' />
                <i className='bx bxs-user'></i>
             
                </div>
              <div className="second">
              <input type="text" placeholder="Enter LastName" value='Admin' />
              <i className='bx bx-user'></i>
              </div>
               
             
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="email">
                <h5>
                  Email
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>
<div className="fullwidth_input">
<input type="email" placeholder="Enter Your Email" value='sadmin@virtualcard.com'/>
<i className='bx bxs-envelope' ></i>
</div>
            
            </div>
            <div className="form_group">
              <label htmlFor="mobileNumber">
                <h5>
                  Mobile  Number
                  <span>
                    <sup>*</sup>
                  </span>
                </h5>
              </label>
<div className="fullwidth_input">
<input type="tel" placeholder="+91 ............." value='+91 93444 82370'/>
<i className='bx bxs-phone-call' ></i>
</div>
            
            </div>

            <div className="form_submit">
                <button className="save">Save</button>
                <button className="discard">Discard</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountSetting;
