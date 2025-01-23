import mongoose from 'mongoose';


let  PopupBannerSchema=new mongoose.Schema({
    UserName: {
      type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
      BannerTitle: {
        type: String,
        required:true
      },
      BannerURL: {
        type: String,
 
      },
      BannerDescription: {
        type: String,
        required:true
      },
      BannerButtonName: {
        type: String,
      default:'Go'
      },  
      BannerActive:{
        type:Boolean,
        default:false
      }
},{timestamps:true});


let PopupBannerModel=mongoose.model('PopupBanner_Detail',PopupBannerSchema);

export default PopupBannerModel;