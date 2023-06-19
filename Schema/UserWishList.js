const mongoose=require("mongoose");
const Wish=new mongoose.Schema({
    Buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
            },
    Item:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Allproducts"
    },
   
  
    
},{timestamps:true});

module.exports=mongoose.model("Wish",Wish);
