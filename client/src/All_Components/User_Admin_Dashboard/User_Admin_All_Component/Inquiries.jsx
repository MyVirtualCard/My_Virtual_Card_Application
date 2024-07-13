import React from "react";
import "./menuStyles/Inquiries.scss";

const Inquiries = () => {
  return (
    <>
      <div className="inquiries_container">

        <div className="inquiry_table">
          <div className="title">
            <h5 className="fw-medium">All Inquiries</h5>
          </div>

          <div className="appoinment_container table-responsive  ">
            <div className="container">
              <table className="table table-hover rounded-3" id="example">
                <thead>
                  <tr>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "20%" }}
                    >
                      VCARD NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                      CLIENT NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "20%" }}
                    >
                      EMAIL
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "20%" }}
                    >
                      MOBILE NUMBER
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      RECEIVED AT
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "30%" }}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                 
                    <td colSpan="1" className="text-center">
                      No Inquiries Found!
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inquiries;
