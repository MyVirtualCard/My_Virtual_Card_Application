import mongoose from 'mongoose';


let QRCodeSchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.String,
        required: true,  
      },
      URL_Alies:{
        type:String,
        required:true,

      },
      QRCodeImage:{
        type:String,
        required:true
   
      },
},
{timestamps:true});

let QRCodeModel=mongoose.model('QRCodeData',QRCodeSchema);
export default QRCodeModel;