const mongoose=require("mongoose");
require("dotenv").config();
const conn=async ()=>{await mongoose.connect(process.env.DB).then(console.log("connected to db")).catch(err=>console.log(err))};
module.exports=conn;