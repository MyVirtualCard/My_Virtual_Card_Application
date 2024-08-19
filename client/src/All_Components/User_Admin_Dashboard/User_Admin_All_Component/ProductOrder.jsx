import React from "react";
import "./menuStyles/ProductOrder.scss";
import Footer from "../UserAdmin_Footer/Footer";

const ProductOrder = () => {
  return (
    <>
      <div className="productOrder_container">

        <div className="inquiry_table">
          <div className="title">
            <h5 className="fw-medium">All Ordered Products</h5>
          </div>

          <div className="appoinment_container table-responsive  ">
            <div className="container">
              <table className="table table-borderless table-hover rounded-3" id="example">
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
                      PRODUCT NAME
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "10%" }}
                    >
                     PRICE
                    </th>

                    <th
                      className="text-center fw-semibold "
                      style={{ width: "15%" }}
                    >
                       DATE
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
                      No ProductOrder Found!
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
                              {/* Footer */}
                              <div className="row_3">
            <Footer />
          </div>
      </div>
    </>
  );
};

export default ProductOrder;
