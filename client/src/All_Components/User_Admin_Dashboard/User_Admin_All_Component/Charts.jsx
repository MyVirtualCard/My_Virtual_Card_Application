import React from "react";
import "./menuStyles/Charts.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { lineCharts } from "./FAKE_DATA";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Charts = () => {

  let options={
    responsive:true,
    plugins:{
      legend:{
        position:"bottom"
      },
      title:{
        display:true,
        text:'This is graph check VCard Improvement status'
      }
    }
  };
  let data={}
  return (
    <>
      <div className="chart_container">
        <Line options={options} data={lineCharts}/>
      </div>
    </>
  );
};

export default Charts;
