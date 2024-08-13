
import mongoose from 'mongoose';


let  InquirySchema=new mongoose.Schema({
      URL_Alies:{
        type:String,
      },
      Name: {
        type: String,
        required:true
      },
      Email: {
        type: String,
        required:true
      },
      MobileNumber: {
        type: String,
        
      },
      Message: {
        type: String,
        required:true
      },  
},{timestamps:true});


let InquiryModel=mongoose.model('InquiryModel',InquirySchema);

export default InquiryModel;