const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    items:[
        {
            productId:{ 
                type:mongoose.Schema.Types.ObjectId,
                ref:'foods',
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],

},{
    timestamps:true
})

const CartModel = mongoose.model('cart',cartSchema)

module.exports = CartModel