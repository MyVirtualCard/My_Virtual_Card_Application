import React, { useState,useRef, useEffect,useContext} from 'react'
import './OTP_Input.scss';

const OTP_input = ({length=6,onOTPSubmit,OTP_Value,setOTP_Value}) => {

    let[OTP,setOTP]=useState(new Array(length).fill(''));
    let InputFocus=useRef([]);
    useEffect(()=>{
      if(InputFocus.current[0]){
        InputFocus.current[0].focus()
      }  
    },[])
    
    let handleOTPInputChange=((index,e)=>{
         let value=e.target.value;

         if(isNaN(value)) return;
         const newOTP=[...OTP];
         //Allow Only one Digit
         newOTP[index]=value.substring(value.length-1);
         setOTP(newOTP);

         //Submit Trigger After All input Fill
         let combineOTP=newOTP.join("");
         setOTP_Value(combineOTP)
         if(combineOTP.length === length){
          onOTPSubmit(combineOTP);
         };

         //Move to Next Input Field:
         if(value && index<length-1 && InputFocus.current[index+1]){
          InputFocus.current[index+1].focus()
         };
    

    });
    let handleClick=((index)=>{
         InputFocus.current[index].setSelectionRange(1,1);

        //  optional

        if(index>0 && !OTP[index-1]){
          InputFocus.current[OTP.indexOf("")].focus()
        };
    });
    let handleKeydown=((index,e)=>{
         if(e.key === 'Backspace' && !OTP[index] && index>0 && InputFocus.current[index-1]){
          //Move the focus on previous input field on backspace
          InputFocus.current[index-1].focus();

         }
    });
  return (
 <>
 <div className="otp_input_Container">
  {OTP.map((data,index)=>{
   
    return(
        <input ref={(input)=>InputFocus.current[index]=input} className='otp_input' key={index} type="text" value={data} 
        onChange={(e)=>handleOTPInputChange(index,e)}
        onClick={(e)=>handleClick(index)}
        onKeyDown={(e)=>handleKeydown(index,e)}
        />
    )
  })}
 </div>
 </>
  )
}

export default OTP_input
