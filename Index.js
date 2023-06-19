const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db=require("./auth/db");
const Product=require("./Routes/ProductsCtrl")
const app = express();
require("dotenv").config();
const PORT=process.env.PORT || 4000;
const variable=require("./auth/variable");
app.use(cors());
app.use(express.json());
app.use(session({
    secret:variable.S_secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:100*200*10*500
    }

}))
app.use(express.urlencoded({extended:true}));
const UserRoute=require("./Routes/UserRoute");
const User = require("./Schema/User");

db();
app.post("/userProfile",UserRoute);
app.post("/userLogin",UserRoute);
app.post("/signin",UserRoute);
app.get("/Logout",UserRoute);
app.get("/Logout",UserRoute);
app.get("/allItems",UserRoute);
app.post("/admin/addNewItem",UserRoute);
app.post("/getUser",UserRoute);
app.post("/user/orders",UserRoute);
// Adding addition routes 
app.post("/user/deleteWish/:id",Product)
app.post("/user/deleteCart/:id",Product)
app.get("/getProduct/:pid",Product)
app.get("/Cartitem/:id",Product);
app.get("/Wishitem/:id",Product);
app.post("/BuyNow/:id",Product);
app.post("/addToWishList/:itemId",Product);
app.post("/addToCart/:itemId",Product);
app.post("/category/:value",Product);
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`app listening on post 4000`);
       
    } else {
        console.log(err);

    }
})




// Create a virtual column with get and set method 


