import mongoose from 'mongoose';


let  ManageContentSchema=new mongoose.Schema({
    UserName: {
      type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },  
      BannerActive:{
        type:Boolean,
        default:true
      },
      BussinessHour:{
        type:Boolean,
        default:true
      },
      GoogleMap:{
        type:Boolean,
        default:true
      },
      Appoinment:{
        type:Boolean,
        default:true
      },
      Service:{
        type:Boolean,
        default:true
      },
      Product:{
        type:Boolean,
        default:true
      },
      Gallery:{
        type:Boolean,
        default:true
      },
      Testimonial:{
        type:Boolean,
        default:true
      },
      BankDetail:{
        type:Boolean,
        default:true
      },
      FeedbackForm:{
        type:Boolean,
        default:true
      },
      InquiryForm:{
        type:Boolean,
        default:true
      },
      SocialMedia:{
        type:Boolean,
        default:true
      },
      ContactDetails:{
        type:Boolean,
        default:true
      }
},{timestamps:true});


let ManageContentModel=mongoose.model('ManageContent_Detail',ManageContentSchema);

export default ManageContentModel;