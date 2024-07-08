
import mongoose from 'mongoose';


let currentPlanSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.String,
        ref:'User',
        required:true
    },
    URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
    currentPlan:{
        type:String,
        required:true
    },
    PlanPrice:{
        type:Number,
        required:true,
    }

},{timestamps:true});


let currentPlan=mongoose.model('currentPlan',currentPlanSchema);

export default currentPlan;
