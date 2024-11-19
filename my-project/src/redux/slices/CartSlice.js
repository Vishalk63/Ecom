
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCartData = createAsyncThunk('cart/getData',
    //we can get token from localStorage also
    async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/cart/all?userId=${userId}`, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    }
)

export const addToCart = createAsyncThunk('cart/addToCart',
    async (productId,quantity) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:8080/cart`, {
            productId: productId,
            quantity: 1
        }, {
            headers: {
                Authorization: token
            }
        })
        return response.data
    }
)


const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        myName: 'vishal'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartData.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload
            })

            .addCase(fetchCartData.rejected, (state) => {
                state.status = 'failed'
            })

        // addToCart

        .addCase(addToCart.pending,(state)=>{
            state.status = 'loading'
        })

        .addCase(addToCart.fulfilled,(state,action)=>{
            state.status = 'success'
            // console.log(action.payload)
        })

        .addCase(addToCart.rejected,(state)=>{
            state.status = 'failed'
        })


    }
})


export default CartSlice.reducer;