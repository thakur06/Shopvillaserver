const mongoose=require("mongoose");

const User=new mongoose.Schema({
    Fname:{
type:String,
required:true,

    },
    Uname:{
        type:String,
        required:true,
        unique:true,
    },
    Pass:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Profile:{
        required:true,
        type:String,
       
    },

    
    WalletCash:{
        required:true,
        type:Number
    },
    TotalOrders:
        [{type:mongoose.Schema.Types.ObjectId,
            ref:"Orders"}],
            
    WishList:[{type:mongoose.Schema.Types.ObjectId,
    ref:"Wish"}],
    Cart:[{type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"}]
},{
    Timestamps:true

})


module.exports=mongoose.model("User",User);