import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//express.json
app.use(express.json({limit:"100mb" }));

//urlencoded
app.use(express.urlencoded({limit:"100mb",extended:true}));

//cookie parser
app.use(cookieParser());

const PORT = process.env.PORT;

//ine test route 
app.get("/",(req, res)=>{
  res.send("Hello from backend");
});

app.listen(PORT, ()=>{
  console.log(`App is running on port number ${PORT}`);
})