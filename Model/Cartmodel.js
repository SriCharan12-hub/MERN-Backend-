import mongoose, {Schema,model} from "mongoose"

const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    products:[{
        productId:{
            type:Number,
            required:true
        },
        name:String,
        price:String,
        weight:String,
        image:String,
        quantity:{
            type:Number,
            default:1
        }
    }]
})

const CartModel = new model("Cart",cartSchema,"cartlist")
export default CartModel