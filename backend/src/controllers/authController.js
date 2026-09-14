import {User} from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import  crypto from "node:crypto";
import imagekit from "../utils/imagekit.js";
import {sendMail, forgotPassworfMailGenContent} from "../utils/mail.js";
import {signinToken, createSendToken, defaultAvatarUrl, filterObj} from "../utils/token.js";

//signup
const signup = async (req, res) =>{
try{

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    avatar: {url:req.body.avatar || defaultAvatarUrl(req.body.name)}
  })

}
catch(error){

}
}
