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
    }
  }
)