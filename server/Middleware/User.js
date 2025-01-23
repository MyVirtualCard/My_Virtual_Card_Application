import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";
import ResellerUserModel from "../Models/Reseller_Models/ResellerAuth.model.js";
import Reseller_ClientModel from "../Models/Reseller_Models/Reseller_Client.model.js";
export const UserAuth = async (req, res, next) => {


  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized,Login Again" });
    }
    const TokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await UserModel.findById(TokenDecode.id).select("Password").select('UserName');
    if (TokenDecode.id) {
      req.body.userId = TokenDecode.id;
      req.body.UserName = TokenDecode.UserName;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized,Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const ResellerUserAuth = async (req, res, next) => {


  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized,Login Again" });
    }
    const TokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await ResellerUserModel.findById(TokenDecode.id).select("Password").select('UserName');
    if (TokenDecode.id) {
      req.body.userId = TokenDecode.id;
      req.body.ResellerUserName= TokenDecode.UserName;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized,Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const ResellerClientsUserAuth = async (req, res, next) => {


  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized,Login Again" });
    }
    const TokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await Reseller_ClientModel.findById(TokenDecode.id).select("Password").select('UserName');
    if (TokenDecode.id) {
      req.body.userId = TokenDecode.id;
      req.body.UserName = TokenDecode.UserName;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized,Login Again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};