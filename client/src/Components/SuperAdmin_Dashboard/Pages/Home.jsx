import React from "react";
import "./Styles/Home.scss";
import CustomYAxis from "./Charts/AllUserChart";
import { FaUsers } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import PieChartDiagram from "./Charts/PiChart";
import BarChartForViews from "./Charts/BarChart";
const Home = () => {
  return (
    <>
      <div className="home_container">
        <div className="row1">
          <div className="title">
            <h4>OverView</h4>
          </div>
          <div className="box_container">
            <div className="box">
              <div className="all_users">
                <div className="details">
                  <h5>Total Users</h5>
                  <p>35</p>
                </div>
                <div className="icon">
                  <FaUsers />
                </div>
              </div>
              <div className="chart">
                <CustomYAxis />
              </div>
            </div>
            <div className="box">
              <div className="all_users">
                <div className="details">
                  <h5>Reseller Users</h5>
                  <p>05</p>
                </div>
                <div className="icon">
                  <FaUserSecret />
                </div>
              </div>
              <div className="chart">
                <CustomYAxis />
              </div>
            </div>
            <div className="box">
              <div className="all_users">
                <div className="details">
                  <h5>Basic Plan Users</h5>
                  <p>20</p>
                </div>
                <div className="icon">
                  <FaUsersLine />
                </div>
              </div>
              <div className="chart">
                <CustomYAxis />
              </div>
            </div>
            <div className="box">
              <div className="all_users">
                <div className="details">
                  <h5>EnterPrice Plan Users</h5>
                  <p>10</p>
                </div>
                <div className="icon">
                  <FaUsersGear />
                </div>
              </div>
              <div className="chart">
                <CustomYAxis />
              </div>
            </div>
          </div>
        </div>
        <div className="row2">
       
          <div className="box_container2">

            <div className="left">
            <div className="title">
            <h4>Pi-Chart Diagram Based Up on UserCount </h4>
          </div>
              <PieChartDiagram className='piechart'/>
            </div>
            <div className="right">
            <div className="title">
            <h4>No of Views </h4>
          </div>
              <BarChartForViews className='piechart'/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
