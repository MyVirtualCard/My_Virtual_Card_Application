import React, { useContext } from "react";
import "./Styles/Dashboard.scss";
import Context from "../../Context/GlobalContext";
const User_Dashboard = () => {
  let { AllFeedback, setAllFeedback, AllAppoinment, setAllAppoinment } =
    useContext(Context);
  return (
    <>
      <div className="client_dashboard_container">
        <div className="dashboard_title">
          <h3>Digital Status</h3>
        </div>
        <div className="dashboard_content_box">
          <div className="row_1 d-flex align-items-center justify-content-center gap-3">
            <div className="list_box">
              <div className="icon">
                <i className="bx bxs-card"></i>
              </div>

              <div className="details">
                <h4>08</h4>
                <small>Active VCards</small>
              </div>
              <ul className="dashboard_background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
                <i className="bx bxs-user-pin"></i>
              </div>

              <div className="details">
                <h4>0</h4>
                <small>Site Reached Count</small>
              </div>
              <ul className="dashboard_background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
                <i className="bx bx-message-rounded-error"></i>
              </div>

              <div className="details">
                <h4>
                  {/* {AllFeedback?.length < 10
                    ? "0" + AllFeedback?.length
                    : AllFeedback?.length} */}
                    0
                </h4>
                <small>Today inquiries</small>
              </div>
              <ul className="dashboard_background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div className="list_box">
              <div className="icon">
                <i className="bx bxs-group"></i>
              </div>

              <div className="details">
                <h4>
                  {/* {AllAppoinment?.length < 10
                    ? "0" + AllAppoinment?.length
                    : AllAppoinment?.length} */}
                    0
                </h4>
                <small>Today Appointments</small>
              </div>
              <ul className="dashboard_background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="row_2">
            <div className="today_appoinment_title">
              <h3>Today Appoinment</h3>
            </div>

            <div className="table_container">
              <table>
                <thead className="bg-primary">
                  <tr>
                    <th
                      className="fw-semibold text-center"
                      style={{ width: "10%" }}
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
                      style={{ width: "25%" }}
                    >
                      MOBILE NUMBER
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                      DATE
                    </th>

                    {/* <th
                      className="text-center fw-semibold "
                      style={{ width: "5%" }}
                    >
                      SUBSCRIBERS
                    </th> */}
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
                <tbody className="bg-light text-center">
                  <tr>
                    <td></td>
                    <td></td>
                    <td colSpan="1" className="text-center">
                      No Appoinment Found!
                    </td>
                    <td></td>

                    {/* <td></td> */}
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

export default User_Dashboard;
