const mongoose=require("mongoose");
const Allproducts=new mongoose.Schema({
    title:{
        type:String,
        required:true
            },
    description:{
        required:true,
        type:String
    },
    rating:{
        required:true,
        type:Number
    },
    stock:{
        required:true,
        type:Number
    },
    brand:{
        required:true,
        type:String
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        required:true,
        type:String
    },
    images:[{
        required:true,
        type:String
    }],
  
    
},{timestamps:true});

module.exports=mongoose.model("Allproducts",Allproducts);
