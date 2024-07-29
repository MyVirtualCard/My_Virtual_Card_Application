import React from "react";
import "./menuStyles/Appoinment.scss";

const Appoinment = () => {
  return (
    <>
      <div className="appoinment_container">

        <div className="inquiry_table">
          <div className="title">
            <h5 className="fw-medium">All Appoinments</h5>
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
                      CLIENT NAME
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "18%" }}
                    >
                     MOBILE NUMBER
                    </th>
                    <th
                      className="text-center fw-semibold"
                      style={{ width: "20%" }}
                    >
                      EMAIL
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "10%" }}
                    >
                       DATE
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                       TIME
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "40%" }}
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
                      No Appoinments Found!
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

export default Appoinment;
