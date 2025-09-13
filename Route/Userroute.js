import { useradd, userlogin,updateuser, getdetails } from "../Controller/Usercontroller.js";
import { Router } from "express";
import { addtolist,clearCart,deleteitem,getCart,updateQuantity } from "../Controller/CartContoller.js";
import authMiddleware from "../connection/auth.js";
// import { copyToPrevious, getPreviousItems } from "../Controller/PreviousController.js";

const route = Router()
route.post('/register',useradd)
route.post('/login',userlogin)
route.post("/cart/add", authMiddleware, addtolist);
route.get("/cart", authMiddleware, getCart);
route.delete('/cart/delete',authMiddleware,deleteitem)
route.put('/user/update',authMiddleware,updateuser)
route.get('/user/get',authMiddleware,getdetails)
route.post('/cart/update-quantity',authMiddleware,updateQuantity)
route.put('/cart/clear',authMiddleware,clearCart)

// route.post('/previous/cart/add',copyToPrevious)
// route.get('/previous/cart/get',getPreviousItems)

; 

export default route
