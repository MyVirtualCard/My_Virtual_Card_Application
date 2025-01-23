import jwt from "jsonwebtoken";


export const generateTokenAndCookies = async (res,UserId) => {

    const token=jwt.sign({UserId},process.env.SECRET_KEY,{expiresIn:'30d'});

    res.cookie('token',token,{
        httpOnly:true,
        maxAge:30*24*60*60*1000,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict',

    });
    return token;
};

