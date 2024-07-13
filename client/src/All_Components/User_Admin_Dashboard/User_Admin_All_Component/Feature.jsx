import React from 'react'
import './menuStyles/Feature.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Feature = () => {
  return (
  <>
  <div className="feature_container">
  <div className="top">
    <div className="title">
        <h4>Total Revenue</h4>
        <MoreVertIcon/>
    </div>
  </div>
  <div className="bottom">
    <div className="feature_chart">
        <CircularProgressbar value={70} text='70%'strokeWidth={5}/>
    </div>
    <div className="summary">
      <h4>Total sales made today</h4>
      <small>₹2000</small>
      <p>Previous Transaction Included.Last payment may not be included.</p>
    </div>
  </div>
  </div>
  </>
  )
}

export default Feature;
