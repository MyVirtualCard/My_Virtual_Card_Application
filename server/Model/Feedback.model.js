import mongoose from 'mongoose';


let FeedbackShema=new mongoose.Schema({
    URL_Alies:{
        type:String,
        required:true
    },
    ClientName:{
        type:String,
        required:true
    },
    ClientFeedback:{
        type:String,
        required:true
    },
    ClientRatting:{
        type:Number,
        default:0
    }
},{timestamps:true});


let FeedbackModel=mongoose.model('FeedbackData',FeedbackShema);

export default FeedbackModel;