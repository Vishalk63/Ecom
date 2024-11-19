import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// to fetch all products from api and store them in items 
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:8080/products')
    return response.data
})

// retruned serached data and store them to items 
export const searchProducts = createAsyncThunk('products/searchProducts',
    async (keyword) => {
        const response = await axios.get(`http://localhost:8080/products/search?keyword=${keyword}`)
        return response.data
    }
)

// search category 

export const searchProductsWithTags = createAsyncThunk('products/searchTags',
    async (searchTag)=>{
        const response = await axios.get(`http://localhost:8080/products/category?searchTag=${searchTag}`)
        return response.data
    }
)

// for sorted data 

export const sortedProducts = createAsyncThunk('products/SortProducts',
async ({sortField, sortOrder}) => {
        const response = await axios.get(`http://localhost:8080/products/sort?sortField=${sortField}&sortOrder=${sortOrder}`)
        return response.data
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // for get api -------------
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                // console.log('aciton.payload',action.payload)
                state.status = 'success';
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            })

            // ----------------------
            // searchProducts api 
            .addCase(searchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(searchProducts.rejected, (state) => {
                state.status = 'failed'
            })

            // for searchProductsWithTags
            .addCase(searchProductsWithTags.pending,(state)=>{
                state.status = 'loading'
            })

            .addCase(searchProductsWithTags.fulfilled,(state,aciton)=>{
                state.status = 'success'
                state.items = aciton.payload
            })

            .addCase(searchProductsWithTags.rejected,(state)=>{
                state.status = 'failed'
            })

            // for sorting 
            .addCase(sortedProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sortedProducts.fulfilled, (state, action) => {
                state.status = 'success'
                state.items = action.payload;
            })
            .addCase(sortedProducts.rejected, (state) => {
                state.status = 'failed'
            })
    }
})



export default productSlice.reducer
