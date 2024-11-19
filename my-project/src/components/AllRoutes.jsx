import Cart from '@/pages/Cart'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectRoute from '@/auth/ProtectRoute'
import Register from '@/pages/Register'
function AllRoutes() {
    const isLogin = useSelector((state) => state.auth.isLogin)
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='/cart'
                    element={
                        <ProtectRoute isLogin={isLogin}>
                            <Cart />
                        </ProtectRoute>
                    }
                />

            </Routes>
        </div>
    )
}

export default AllRoutes