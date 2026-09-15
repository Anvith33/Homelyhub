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

//protect
const protect =async(req,res,next)=>{
  try{
        //step1: find token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {

      token=req.headers.authorization.split(" ")[1]

    }else if(req.cookies.jwt && req.cookies.jwt !=="loggedout"){
      token = req.cookies.jwt;
    }

    //step2: no token so stop here
    if(!token){
      throw new Error("you are not logged in!! please login to access")
    }

    //step3: token is real or not

    const decoded=jwt.verify(token, process.env.JWT_SECRET)

    //step 4: token is real but is the user still there?
    const currentUser = await User.findById(decoded.id)
    if(!currentUser)
    {
      throw new Error("the user belonging to the token doesnt exist")
    }

    //step 5:stolen token case
    if(currentUser.changedPasswordAfter(decoded.iat)){
      throw new Error("user recently changed the password, please login again")
    }

    //step 6: all check passed
    req.user=currentUser;
    next();
  }
  catch(error){
    res.status(401).json({
    status:"fail",
    message: error.message
    })
  }
}

export{signup, login, protect};
