import mongoose from 'mongoose';


let TemplateSchema=new mongoose.Schema({
    UserName:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref:'UserName'
    },
    URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
    currentTemplate:{
        type:Number,
        required:[true,'Select Your VCard Template!']
    }
},
{timestamps:true});


let VCardTemplate_Model=mongoose.model('Static_VCardTemplate',TemplateSchema);

export default VCardTemplate_Model;