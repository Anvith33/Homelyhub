import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//ine test route 
app.get("/",(req, res)=>{
  res.send("Hello from backend");
});

app.listen(PORT, ()=>{
  console.log(`App is running on port number ${PORT}`);
})