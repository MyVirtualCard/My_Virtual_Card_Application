import UserModel from "../Models/User.model.js";

export const GetUserData=async(req,res)=>{
    let{UserName}=req.body;
    if(!UserName){
        return res.json({success:false,message:"Missing Detail!"})
    }
    try{
      let ExistUser=await UserModel.findOne({UserName});
      if(!ExistUser){
        return res.json({success:false,message:"User Not Found!"})
    };
    res.json({
        success:true,
        UserData:{
            UserName:ExistUser.UserName,
            FullName:ExistUser.FullName,
            MobileNumber:ExistUser.MobileNumber !== null ? ExistUser.MobileNumber : '',
            Email:ExistUser.Email,
            isAccountVerified:ExistUser.isAccountVerified,

        }
    })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
};
export const GetAllUserData=async(req,res)=>{

    try{
      let ExistUser=await UserModel.find();
      if(!ExistUser){
        return res.json({success:false,message:"Data Not Found!"})
    };
    res.json({
        success:true,
        UserData:ExistUser
    })
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
};