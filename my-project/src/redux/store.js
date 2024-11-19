import { configureStore } from "@reduxjs/toolkit"
import productSlice from './slices/productSlice'
import authSlice from "./slices/authSlice"
import CartSlice from './slices/CartSlice'
const store = configureStore({
    reducer: {
        products: productSlice,
        auth: authSlice,
        cart: CartSlice
    }
})

export default store