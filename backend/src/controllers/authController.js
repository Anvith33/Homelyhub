import {User} from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import  crypto from "node:crypto";
import imagekit from "../utils/ImagekitIO.js";
import {sendMail, forgotPasswordMailGenContent} from "../utils/mail.js";
import {signinToken, createSendToken, defaultAvatarUrl, filterObj} from "../utils/token.js";

//signup
const signup = async (req, res) =>{
try{

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phoneNumber: req.body.phoneNumber,
    avatar: {url:req.body.avatar || defaultAvatarUrl(req.body.name)}
  })

  createSendToken(newUser, 201, res);

}
catch(error){

  const duplicateField = error?.keyPattern
  ? Object.keys(error.keyPattern)[0]
  : null;

const message = duplicateField
  ? `An account with that ${duplicateField} already exists`
  : error?.message || "Something went wrong";

res.status(400).json({ message });
}
}

//login: check email and password and we give the token

const login = async (req,res)=>{
  try{

    const {email,password}=req.body;
    if(!email || !password){
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({email}).select("+password")
    if(!user || (await user.correctPassword(password,user.password))==false){
      throw new Error("Incorrect email or password")
    }

    createSendToken(user,200,res);
  }
  catch(error){
    res.status(401).json({status:"fail",message:error.message})

  }
}

export{signup, login};
