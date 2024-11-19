import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const registerUser = createAsyncThunk('auth/register',
    async (formData) => {
        const response = await axios.post('http://localhost:8080/user/register',
            formData
        )
        return response.data
    }
)

export const loginUser = createAsyncThunk('auth/login',
    async(formData)=>{
        const response = await axios.post('http://localhost:8080/user/login',formData)
        return response.data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        user: null,
        status: "idle"
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // for resgister 
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = null;
                state.isLogin = false;

            })

            .addCase(registerUser.rejected, (state) => {
                state.status = 'failed'
            })

            // for login 

            .addCase(loginUser.pending,(state)=>{
                state.status = 'loading'
            })

            .addCase(loginUser.fulfilled,(state,action)=>{
                // console.log(action.payload.success)
                if(action.payload.success){
                    state.isLogin = true;
                    state.user = action.payload
                    state.status = 'success'
                }
            })

            .addCase(loginUser.rejected,(state)=>{
                state.status = 'failed'
                state.user =null
            })
    }

})


export default authSlice.reducer;