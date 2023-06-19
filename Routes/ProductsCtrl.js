const express = require("express");
const Router = express.Router();
const User = require("../Schema/User");
const Cart = require("../Schema/UserCart");
const Wish=require("../Schema/UserWishList");
const AllProducts = require("../Schema/AllProducts");
const jwt=require("../auth/authToken");
const UserCart = require("../Schema/UserCart");
const Order = require("../Schema/Order");
Router.post("/addToWishList/:itemId",jwt, async (req, res) => {
    try{
        const items = await Wish.findOne({Item:req.params.itemId});
        if (items){
            res.status(200).send("item already present in Wish List")
        }
    
    
        // if (item) { res.status(200).send("item already present in wishList"); }
        else {
            let item=await AllProducts.findById(req.params.itemId);
            if (!item){
                res.status(401).send("item not found");
            }
            let obj =await Wish.create({
                Buyer: req.user.me._id,
               
               Item:item
            });
            obj.save();
          const user=await User.findById(req.user.me._id).select("-Pass");
          user.WishList.push(obj._id);
          user.save();
          
    
    
            res.status(200).send("item added to Wish succesfully ");
        }
    }
    catch(err){
        res.send(err)
    }
});


Router.post("/addToCart/:itemId",jwt,async (req, res) => {
  
    
    try{
    const items = await Cart.findOne({Item:req.params.itemId});
    if (items){
        res.status(200).send("item already present in cart")
    }


    // if (item) { res.status(200).send("item already present in wishList"); }
    else {
        let item=await AllProducts.findById(req.params.itemId);
        if (!item){
            res.status(401).send("item not found");
        }
        let obj =await Cart.create({
            Buyer: req.user.me._id,
           quantity:req.body.quantity,
           Item:item
        });
        obj.save();
      const user=await User.findById(req.user.me._id).select("-Pass");
      user.Cart.push(obj._id);
      user.save();
      


        res.status(200).send("item added to cart succesfully ");
    }
}

catch(err){
    console.log(err);
    res.send(err);
}
});

Router.get("/getProduct/:pid",async(req,res)=>{
try {
    let product=await AllProducts.findById(req.params.pid);
    if (product){
res.status(200).send(product);

    }else {
        res.end(401).send("An error has accured")
    }
} catch (error) {
    res.send(error);
}
});
Router.post("/category/:value",async(req,res)=>{
try {
    let data=await AllProducts.find({category:req.params.value});
    
    res.status(200).send(data);

} catch (error) {
    res.send(error)
}

});

Router.get("/Cartitem/:id",async(req,res)=>{

    try {
        let item=await UserCart.findById(req.params.id).populate("Item").exec();
if (!item){
    res.send("item not found");
}else {
    res.send(item);
}

    } catch (error) {
        console.log(error)
        res.send(error);

    }
});
Router.get("/Wishitem/:id",async(req,res)=>{

    try {
        let item=await Wish.findById(req.params.id).populate("Item").exec();
if (!item){
    res.send("item not found");
}else {
    res.send(item);
}

    } catch (error) {
        console.log(error)
        res.send(error);

    }
});

Router.post("/BuyNow/:id",jwt,async(req,res)=>{

    try {
       
       let cart=await Cart.findById(req.params.id).populate("Item").exec();
       
        let item=await AllProducts.findById(cart.Item.id);
if (!item){
    res.send("item not found");
}else {
 let user =await User.findById(req.user.me._id).select("-pass");

 if ((user.WalletCash-((item.price)*req.body.quantity))>=0){
let order=await Order.create({
    user:req.user.me_id,
    product:item._id,
    quantity:req.body.quantity
});

await order.save();

 user.TotalOrders.push(order._id);
 let cash=user.WalletCash-((item.price)*req.body.quantity);
 user.WalletCash=cash;
await user.save();
res.status(200).send("oredered suceessfully");
 }else {
    res.status(200).send("You dont have enough cash ");
 }
}


    } catch (error) {
        console.log(error)
        res.send(error);

    }
});

Router.post("/user/deleteWish/:id",jwt,async(req,res)=>{
try { 
   await Wish.findByIdAndDelete(req.params.id);
   
 await User.findByIdAndUpdate(req.user.me._id,{$pull:{WishList:req.params.id}});


    
   
   res.status(200);
    

} catch (error) {
    console.log(error)
    res.send(error);
}
});

Router.post("/user/deleteCart/:id",jwt,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
   
        await User.findByIdAndUpdate(req.user.me._id,{$pull:{Cart:req.params.id}});
       
       
           
          
          res.status(200);
    } catch (error) {
        res.send(error);
    }
    });
module.exports=Router;