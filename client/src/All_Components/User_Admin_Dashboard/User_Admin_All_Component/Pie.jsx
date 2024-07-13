import React from 'react'
import './menuStyles/Pie.scss';
import { Pie as P } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { barCharts, lineCharts, pieCharts } from "./FAKE_DATA";
ChartJs.register(
    ArcElement,
    Tooltip,
    Legend,
);
const Pie = () => {
    let options={
        responsive:true,
        border:false,
        plugins:{
          legend:{
            position:"bottom"
          },
          title:{
            display:true,
            text:'Plan By User'
          }
        }
      };
  let data={}
  return (
    <>
      <div className="pieChart_container">
        <P options={options} data={pieCharts} className='pie'/>
      </div>
    </>
  );
}

export default Pie;

