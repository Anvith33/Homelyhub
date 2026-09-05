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
    },
    passwordChangedAt:{
      type:Date
    },
    passwordResetToken:{
      type:String,
      select:false,
      index:true
    },
    passwordResetExpires:{
      type:Date,
      select:false,
    },
  
  },
  {timestamps:true}
)
//settings to pass in response from server
userSchema.set("toJSON",{
  transform:function(doc,ret){
    delete ret.password;
    delete ret.passwordConfirm;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
    delete ret.__v;
    return ret;
  }
})

// password logic using hashing
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
})

//logic to check if password is correct
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword,userPassword);
}

//token logic to check if password is changed after token is issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
}

//forgot password Logic

