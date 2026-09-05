// user schema
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true, "please provide your name"],
      trim:true,
      maxlength:[40, "name should not be more than 40 characters"]
    },
    email:{
      type:String,
      required:[true, "please provide your email"],
      unique:true,
      lowercase:true,
      trim:true,
      validate:[validator.isEmail, "please provide a valid email"]
    },
    password:{
      type:String,
      required:[true,"please enter your password"],
      minlength:[8,"password should be atleast 8 characters"],
      select:false
    },
    passwordConfirm:{
      type:String,
      required:[true,"please confirm your password"],
      validate:{
        validator:function(el){
          return el === this.password;
        },
        message:"passwords are not the same"
      }
      },
    phoneNumber:{
      type:String,
      required:[true, "please provide your phone number"],
      unique:true,
      trim:true
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    },
    avatar:{
      url:{type:String},
      public_id:{type:String}
    }
  }
)