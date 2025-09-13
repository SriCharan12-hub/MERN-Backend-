
import CartModel from "../Model/Cartmodel.js";

export const addtolist = async(req,res)=>{
    //product = {id,name,weight,price,image}
    try{
        const userId = req.user.id;
    // console.log(userId)

        let {product} = req.body;
    
    // Ensure productId is a number
        const productId = Number(product.productId);

    // we have only one url to store all users data so first we check if user is present or not 
    // if present we can update his cart if not we should create a new cart for him
    let cartitem = await CartModel.findOne({user:userId})

    if (!cartitem){
        cartitem = new CartModel({
            user:userId,
            products:[{...product,quantity:1}]
        })
    }
    else{
        //here user is present so we should update his cart 

                const existingproduct = cartitem.products.find(
                    p => p.productId === product.productId
                );
       
                if (existingproduct){
                        existingproduct.quantity+=1 //increase quantity
                }
                else{
                     cartitem.products.push({ ...product, productId: product.productId, quantity: 1 });
                }
    }
    await cartitem.save();
     res.status(200).json({ message: "Product added to cart", cartitem });

    }
   catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }

}
export const getCart = async(req,res)=>{
    try{
        const userId = req.user.id;
        const cart = await CartModel.findOne({user:userId})
        res.status(200).json({ items: cart ? cart.products : [] });
  } 
  catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
}
export const deleteitem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const updatedCart = await CartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { productId: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Item deleted", cart: updatedCart });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};
export const updateQuantity = async(req,res)=>{

  try{
    const userId= req.user.id;
    const {productId,action}= req.body
    const cart = await CartModel.findOne({user:userId})
    if (!cart){
      return res.status(404).json({message:"Cart not found"})

    }
    const product = cart.products.find(p=>p.productId === Number(productId))
    if (!product){
      return res.status(404).json({message:"Product not found in cart"})

    }
    if (action==="increase"){
      product.quantity+=1
    }
    else{
      if (product.quantity>1){
        product.quantity-=1
      }
    }
    await cart.save()
    res.status(200).json({message:"Quantity updated",cart})
  }
  catch(err){
  res.status(500).json({message:"Error updating quantity",error:err.message})

}
}
export const clearCart = async(req,res)=>{
  try{
    const userId = req.user.id;
    const cart = await CartModel.findOneAndUpdate(
      {user:userId},
      {products:[]},
      {new:true}
    )
    if (!cart){
      return res.status(404).json({message:"Cart not found"})
    }
    res.status(200).json({message:"Cart cleared",cart})
  }
  catch(err){
    res.status(500).json({message:"Error clearing cart",error:err.message})

  }

}