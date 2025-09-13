// import CartModel from "../Model/Cartmodel.js"; // Assuming you have a Cartmodel
// import PreviousModel from "../Model/Previousmodel.js";

// // copyToPrevious controller:
// // This function will fetch cart data from the database and save it to the previous collection.
// export const copyToPrevious = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         // 1. Fetch data from the cart collection directly from the DB
//         const cart = await CartModel.findOne({ user: userId });
//         console.log(cart)
//         if (!cart || !cart.items || cart.items.length === 0) {
//             return res.status(400).json({ message: "Cart is empty, no data to copy." });
//         }

//         // 2. Create a new document in the previouslist collection
//         const prevCart = new PreviousModel({
//             user: userId,
//             products: cart.items,
//         });

//         // 3. Save the new document
//         await prevCart.save();

//         res.status(200).json({ 
//             message: "Cart copied to previous list successfully.",
//             copiedCart: prevCart
//         });
//     } catch (error) {
//         console.error("Error copying cart to previous:", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // getPreviousItems controller:
// // Add a filter to find carts for the current user only.
// export const getPreviousItems = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const carts = await PreviousModel.find({ user: userId })
//         res.status(200).json({ carts });
//     } catch (error) {
//         console.error("Error fetching previous carts:", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // The savePreviousItems controller is no longer needed since we are using copyToPrevious.
// // If you still need it for manual saves, it should be fixed to create a new document like above.