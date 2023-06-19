const mongoose=require("mongoose");
const Cart=new mongoose.Schema({
    Buyer:{
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:"User",
    },
    Item:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"Allproducts"
    },
    quantity:{
        type:Number,
        required:true,
    }
    
},
{timestamps:true});

module.exports=mongoose.model("Cart",Cart);
