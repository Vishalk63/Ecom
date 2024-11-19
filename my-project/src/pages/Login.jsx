import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux/slices/authSlice"
import { toast } from "sonner"


function Login() {

  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  

  async function handleSubmit(){
    const formData ={
      email,
      password
    }
    // console.log(formData)

    const result = await dispatch(loginUser(formData))

    if(result.payload.success){
      setEmail('')
      setPassword('')
      // localStorage.removeItem('token');
      localStorage.setItem('token', result.payload.token);
      localStorage.setItem('userId',result.payload.user._id)
      toast.success(result.payload.msg)
      navigate('/')
      console.log(result.payload.user._id)

    }else{
      toast.error(result.payload.msg)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div  className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSubmit}>Login</Button>
          <p  className="text-sm mt-3">Dont have an Account ? <Link to='/register'>Sign Up</Link> / <Link to='/'>Home</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login