const express = require('express')
const dbConnection = require('./db/dbConnection')
const cors = require('cors')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const app = express()
const PORT = 8080 || 3000

app.use(express.json())
app.use(cors())

app.use('/user',userRouter)
app.use('/products',productRouter)
app.use('/cart',cartRouter)

app.get('/',(req,res)=>{
    res.send('health check')
})


app.listen(PORT,async()=>{
    try {
        await dbConnection
        console.log(`port runnig on ${PORT} and db connected`)
    } catch (err) {
        console.log(err)
    }
})