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
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "@/redux/slices/authSlice"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = useSelector((state)=>state.auth.user)

  async function handleSubmit() {
    const formData = {
      userName,
      email,
      password
    }
    // console.log(formData)

    const result = await dispatch(registerUser(formData))
    console.log(result.payload.success)
    if (result.payload.success) {
      setEmail('')
      setUserName('')
      setPassword('')
      toast.success(result.payload.msg)
      navigate('/login')
      
    } else {
      toast.error(result.payload.msg)
    }


  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">Name</Label>
                <Input id="userName" type="name" placeholder="Enter your Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSubmit}>Register</Button>
          <p className="text-sm mt-3">Already have an Account ? <Link to='/login'>Login</Link> / <Link to='/'>Home</Link></p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register