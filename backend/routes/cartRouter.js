const express = require('express');
const cartRouter = express.Router()
const mongoose = require('mongoose')

const auth = require('../middleware/auth');
const CartModel = require('../models/CartModel');
const ProductModel = require('../models/ProductModel');

cartRouter.get('/', auth, (req, res) => {
    const { userId } = req
    res.json({
        msg: "this is uerid",
        'userId': userId
    })
})


cartRouter.post('/', auth, async (req, res) => {
    const { user } = req;
    const userId = user.id
    const { productId, quantity } = req.body; 

    if (!productId || !quantity) {
        return res.status(400).json({
            msg: "Product ID आणि Quantity आवश्यक आहे.",
            success: false
        });
    }

    try {
        // 2. वापरकर्त्याचा `cart` शोधा
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            // 3. जर cart नसेल, तर नवीन cart तयार करा
            cart = new CartModel({
                userId: userId,
                items: [
                    {
                        productId: new mongoose.Types.ObjectId(productId), // ObjectId मध्ये बदला
                        quantity
                    }
                ]
            });
        }
        else {
            // 4. जर cart असेल, तर तपासा की प्रोडक्ट आधीच आहे का
            const productIndex = cart.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (productIndex > -1) {
                // जर प्रोडक्ट आधीच असेल, तर quantity वाढवा
                cart.items[productIndex].quantity += quantity;
            } else {
                // नवीन प्रोडक्ट जोडा
                cart.items.push({
                    productId: new mongoose.Types.ObjectId(productId), // ObjectId मध्ये बदला
                    quantity
                });
            }
        }

        await cart.save();

        res.status(200).json({
            msg: "Product added to the cart",
            success: true,
            cart
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error while additng product to the cart",
            success: false,
            error: err.message
        });
    }
});




cartRouter.get('/all', auth, async (req, res) => {

    try {
        const { userId } = req.query;

        const carts = await CartModel.findOne({ userId }).populate('items.productId');
        
        res.status(200).json({
            msg: "Cart data got successfully",
            success: true,
            carts:carts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Err while getting cart data",
            success: false,
            error: err.message
        });
    }
});


module.exports = cartRouter;


