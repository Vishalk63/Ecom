const express = require('express')
const ProductModel = require('../models/ProductModel')

const productRouter = express.Router()


productRouter.get('/', async (req, res) => {
    try {
        const product = await ProductModel.find()
        res.send(product)
    } catch (err) {
        res.send('err while fetching data')
        console.log(' line err while fetching data')
    } 
})

// search api 
productRouter.get('/search', async (req, res) => {

    try {
        const keyword = req.query.keyword
        // const product = await ProductModel.find({ name: { $regex: keyword, $options: 'i' }})        this is work for only name feild

        const product = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { price: isNaN(keyword) ? undefined : Number(keyword) } // 'price' for number check
            ]
        })

        if (product.length == 0) {
            return res.status(404).send('No products found');
        }
        res.send(product)
    } catch (error) {
        res.send('err while search')
    }

})

// search category 

productRouter.get('/category', async (req, res) => {

    try {
        const { searchTag } = req.query
        if (searchTag == 'all' || searchTag == 'All') {
            const product = await ProductModel.find()
            return res.send(product)
        }
        const product = await ProductModel.find({ category: { $regex: searchTag, $options: 'i' } })
        res.send(product)
    } catch (err) {
        res.send('err while searching category')
        console.log('err while searching category')
    }
})

productRouter.get('/sort', async (req, res) => {
    try {
        const { sortField, sortOrder } = req.query
        const sortCriteria = { [sortField]: sortOrder === "asc" ? 1 : -1 }

        const product = await ProductModel.find().sort(sortCriteria)

        res.send(product)

    } catch (err) {
        res.send('err while sorting from backend')
    }
})


productRouter.post('/', async (req, res) => {

    try {
        const product = new ProductModel(req.body)
        await product.save()
        res.json({
            msg: 'data posted sucessfully',
            "data": product
        })

    } catch (err) {
        res.send('err while adding data')
        console.log('err while posting data')
    }
})

module.exports = productRouter