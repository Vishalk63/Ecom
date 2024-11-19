// import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from '../components/ui/button'
import {  HomeIcon, Star } from 'lucide-react'


import { useDispatch, useSelector } from 'react-redux'
import { fetchCartData } from '@/redux/slices/CartSlice'
import { Link } from 'react-router-dom'

function Cart() {
  const status = useSelector((state) => state.cart.status)
  const cartData = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()  

  useEffect(() => {
    dispatch(fetchCartData())
  }, [])

  // console.log(cartData.carts.items)

  // cartData?.carts?.items?.map((item) => {
  //   console.log(item.productId.desc)
  // })

  return (

    <div className='h-full min-h-screen'>

      

    <div className='text-6xl font-semibold p-5'>
        <p><Link to='/'> Home </Link></p>
        <p className=' text-center'>Cart Page</p>
    </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2'>

      {status == 'loading' ? <h1 className='text-7xl font-semibold text-center'>Loading</h1> : null}
        {
          status=='success'?cartData?.carts?.items?.map((item,index) => (
            // console.log(item.productId.desc)

            <Card className='' key={index}>
              <CardHeader className='rounded-lg overflow-hidden flex justify-center items-center'>
                <img className='w-44 h-44  rounded-lg hover:scale-110 transition-all ease-linear' src={item.productId.img} alt="foodImage" />
              </CardHeader>
              <CardContent>
                <div className='flex justify-between '>
                  <h1 className='text-lg font-semibold line-clamp-1'>{item?.productId?.name}</h1>
                  <h1 className='text-lg font-semibold'>${item?.productId?.price}</h1>
                </div>
                <p className='line-clamp-2 mt-1 font-normal text-sm'>{item?.productId?.desc}</p>
              </CardContent>
              <CardFooter>
                <div className='flex justify-between space-x-10  w-full'>
                  <div className='flex justify-center items-center gap-2  '>
                    <Star className='text-yellow-400 fill-yellow-400' /> <p>{item?.productId?.rating}</p>
                  </div >
                  <Button className="bg-green-500" >Buy</Button>
                </div>
              </CardFooter>
            </Card>

          )):null
        }
      {status == 'failed' ? < h1 className='text-8xl text-center'>Product Not Found</h1> : null}

      </div>

      <div >
        <Button className='w-full font-semibold text-2xl mt-5 py-5'>CheckOut</Button>
      </div>
    </div>
  )
}

export default Cart