import {User} from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import  crypto from "node:crypto";
import imagekit from "../utils/imagekit.js";
import {sendMail, forgotPassworfMailGenContent} from "../utils/mail.js";
import {signinToken, createSendToken, defaultAvatarUrl, filterObj} from "../utils/token.js";

//signup