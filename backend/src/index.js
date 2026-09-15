import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";

import connectDB from"./utils/db.js";

dotenv.config();

const app = express();

//express.json
app.use(express.json({limit:"100mb" }));

//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}));

//cookie parser
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// test route 
app.get("/",(req, res)=>{
  res.send("Hello from backend");
});

app.use("/api/v1/rent/user",router);
app.use("/api/v1/rent/listing",propertyRouter)

connectDB();

app.listen(PORT, ()=>{
  console.log(`App is running on port number ${PORT}`);
})