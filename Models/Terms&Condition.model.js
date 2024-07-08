import mongoose from 'mongoose';

let Terms_ConditionSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,  
      },
      URL_Alies:{
        type:String,
        required:true
      },
    Terms_Conditions:{
        type:String,
        required:true
    },
},{timestamps:true});


let TermConditionModel=mongoose.model('Term_Condition_Data',Terms_ConditionSchema);

export default TermConditionModel;