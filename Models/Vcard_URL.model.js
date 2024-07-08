import mongoose from "mongoose";


let Vcard_URL_Schema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
    VCardName:{
        type:String,
        required:true
    },
    Occupation:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true , 
       
    },
    Profile:{
        type:String,
        required:true
    },
    Banner:{
    type:String,
    default:'https://img.freepik.com/free-photo/cement-wall-floor-copy-space_53876-30237.jpg?t=st=1716040667~exp=1716044267~hmac=37c1f0faf9137d781a0aa0d1436b486b6e0a620fec789a836ab08533c16cbeeb&w=826'
    }

},
{timestamps:true}
);



let Vcard_URL=mongoose.model('Vcard_URL',Vcard_URL_Schema);

export default Vcard_URL;