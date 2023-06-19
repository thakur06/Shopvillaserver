const mongoose=require("mongoose");

const order=new mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
require:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Allproducts",
        require:true
    },
    quantity:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Orders",order);