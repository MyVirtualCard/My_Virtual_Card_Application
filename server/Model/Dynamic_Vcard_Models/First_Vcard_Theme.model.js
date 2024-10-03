import mongoose from 'mongoose';


let  Vcard_Theme_Schema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
      VCardColour:{
        type:String,
        required:false
      },
      VCardTextColour:{
        type:String,
        required:false
      },
      SVG_Design:{
        type:String,
        required:false
      }
},{timestamps:true});
let VcardThemeModel=mongoose.model('VcardThemeDetails',Vcard_Theme_Schema);

export default VcardThemeModel;