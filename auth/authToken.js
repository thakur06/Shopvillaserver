const jwt=require("jsonwebtoken");
require("dotenv").config();
const imp=(req,res,next)=>{
    const token=req.body.token;

    try {
        if (!token){

res.status(401).send("session expired");
        }
        else {
           jwt.verify(token,process.env.SECRET,(err,user)=>{
if (!err){
    
    req.user=user;
next();
}
else{
    res.send(err);
}
           })
        
    } }
    catch (error) {
        res.send(error);
    }
};
module.exports=imp;