import React from 'react'
import './menuStyles/BarChart.scss';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { barCharts, lineCharts } from "./FAKE_DATA";
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = () => {
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
      <div className="barchart_container">
        <Bar options={options} data={barCharts}/>
      </div>
    </>
  );
}

export default BarChart
