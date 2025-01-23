import mongoose from 'mongoose';

let TestimonialSchema=new mongoose.Schema({
    UserName: {
        type: mongoose.Schema.Types.String,
        required: true,  
      },
      URL_Alies:{
        type:String,
        required:true,
      },
    ClientName:{
        type:String,
        required:true
    },
    ClientFeedback:{
        type:String,
        required:true
    },
    ClientReviewDate:{
       type:String,
       require:false
    },

    ClientImage:{
        type:String,
        default:'https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?t=st=1718905206~exp=1718908806~hmac=66b71371f6581281335856c83d37c49d64dd263f365e7d4dc8d089afffd07818&w=740'
    }
},{timestamps:true});


let TestimonialModel=mongoose.model('Testimonial_Data',TestimonialSchema);

export default TestimonialModel;