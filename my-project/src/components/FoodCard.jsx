import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { addToCart } from '@/redux/slices/CartSlice'

function FoodCard({id,img,name,price,desc,category,rating}) {
    const isLogin = useSelector((state)=>state.auth.isLogin)

    const dispatch = useDispatch()

    async function handleItemAddInCart(id){


        if(isLogin){
            const productId =id;
            const quantity=1;
            // toast.success(id)
            const result = await dispatch(addToCart(productId,quantity))
            if(result.payload.success){
                toast.success('Product added to cart')
            }else{
                toast.error('Something went Wrong')
            }
        }else{
            toast.warning('You need to Login first')
        }

        // if(isLogin){
        //     // const productId=id;
        //     // const quantity = 1
        //     // const result = await dispatch(addToCart(productId,quantity))
        //     console.log(result.payload)
        //     toast.success(` ${id}`)
        // }else{
        //     toast.warning('You need to Login first')
        // }
    }
    return (
        <>
            <Card className=''>
                <CardHeader className='rounded-lg overflow-hidden flex justify-center items-center'>
                    <img className='w-44 h-44  rounded-lg hover:scale-110 transition-all ease-linear' src={img} alt="foodImage" />
                </CardHeader>
                <CardContent>
                    <div className='flex justify-between '>
                        <h1 className='text-lg font-semibold line-clamp-1'>{name}</h1>
                        <h1 className='text-lg font-semibold'>${price}</h1>
                    </div>
                    <p className='line-clamp-2 mt-1 font-normal text-sm'>{desc}</p>
                </CardContent>
                <CardFooter>
                    <div className='flex justify-between space-x-10  w-full'>
                        <div  className='flex justify-center items-center gap-2  '>
                            <Star className='text-yellow-400 fill-yellow-400'/> <p>{rating}</p>
                        </div >
                        <Button className="bg-green-500"onClick={()=>handleItemAddInCart(id)} >Add to Cart</Button>
                    </div>
                </CardFooter>
            </Card>

        </>
    )
}

export default FoodCard