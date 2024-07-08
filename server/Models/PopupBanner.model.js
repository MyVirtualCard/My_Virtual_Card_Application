import mongoose from 'mongoose';


let  PopupBannerSchema=new mongoose.Schema({
    user: {
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
});


let PopupBannerModel=mongoose.model('PopupBannerDetail',PopupBannerSchema);

export default PopupBannerModel;