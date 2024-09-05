import mongoose from "mongoose";

let LikesSchema=new mongoose.Schema({
    
    LikesCount:{
        type:Number,
        default:0
    }
},
{timestamps:true});



let TotalLikes=mongoose.model('TotalLikes',LikesSchema);

export default TotalLikes;