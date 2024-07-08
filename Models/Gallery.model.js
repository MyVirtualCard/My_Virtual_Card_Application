import mongoose from 'mongoose';


let GallerySchema=new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.String,
        required: true,  
      },
      URL_Alies:{
        type:String,
        required:true,

      },
      GalleryImage:{
        // data:Buffer,
        // contentType:String,
        type:String,
        required:true
   
      },
      GalleryName:{
        // data:Buffer,
        // contentType:String,
        type:String,

    
      }
    ,
    GalleryURL:{
        type:String
    }
},
{timestamps:true});

let GalleryModel=mongoose.model('GalleryData',GallerySchema);
export default GalleryModel;