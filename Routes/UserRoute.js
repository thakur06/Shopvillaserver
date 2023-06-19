const express=require("express");
const Router=express.Router();
const User=require("../Schema/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const jwtAuth=require("../auth/authToken");
const Allproducts=require("../Schema/AllProducts");
require("dotenv").config();
Router.post("/userLogin",async(req,res)=>{
    const {user,pass}=req.body;

    try {
        const me=await User.findOne({Email:user});
        
        if (me && await bcrypt.compare(pass,me.Pass)){
       
            me.Pass=undefined;
            req.session.userName=me;
    const token= jwt.sign({me},process.env.SECRET);
            res.status(200).send({value:req.session.userName,token:token});
        }else{
            console.log(req.session.userName);
            res.status(401).send("invalid credentials");
        }
    } catch (error) {
        console.log(error)
       res.status(401).send("invalid credentials") 
    }
});

Router.post("/signin",async(req,res)=>{

const {email,pass,fname,userName}=req.body;

try {
    if (await User.findOne({email:email})){
        
        res.status(401).send("user already exists");

    }else {

        
       
        let hashedPass= await bcrypt.hash(pass,10);
        let user=await User.create({
Fname:fname,
Uname:userName,
Pass:hashedPass,
Email:email,
Profile:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",

WalletCash:1500,

        });
        user.save();

        req.session.userName={email,fname,userName};
        const token= jwt.sign({user},process.env.SECRET);
        user.pass=undefined;
        
res.status(200).send({value:user,token:token});
    }

} catch (error) {
    console.log(error)
    res.status(401).send("invalid Creadentials");
}


});

Router.get("/Logout",(req,res)=>{
try {
    req.session.destroy();
    res.status(200).send("Logout succesfully");
} catch (error) {
    console.log(error)
}
});

// ADDING DATA TO DATA BASE AS AN ADMIN 

Router.post("/admin/addNewItem",async(req,res)=>{
    const {title,description,thumbnail , images,rating,stock,brand ,category}=req.body;
try {
    await Allproducts.create({
       title: title,
       description:description,
        thumbnail:thumbnail,
        images,
        brand,
        category,
        rating,
        stock
    });
    res.send("item added");
} catch (error) {
    res.send(error);
}
});
Router.get("/allItems",async(req,res)=>{
   try{
    let data=await Allproducts.find({});
    res.send(data);
} catch (error) {
    res.send(error);
}
});

Router.post("/userProfile",(req,res)=>{
    console.log(req.session)
res.send(req.session.userName);
});

Router.post("/getUser",jwtAuth,async(req,res)=>{
if (req.body.token){
   
   let user=await User.findById(req.user.me._id).select("-pass");
   
   res.send(user);
}
});
Router.post("/user/orders",jwtAuth,async(req,res)=>{
try {
   let user=await User.findById(req.user.me._id).select("-Pass").populate({path:"TotalOrders",populate:"product"});
   if (user){
    res.send(user);

   }

} catch (error) {
    res.send(error)
}
})
module.exports=Router;