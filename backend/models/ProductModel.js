
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    id: { type: Number},
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true }, 
})

const ProductModel = mongoose.model('foods',ProductSchema)

module.exports=ProductModel   