import { Moon, Search, ShoppingCart, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import FoodCard from '@/components/FoodCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, searchProducts, searchProductsWithTags } from '@/redux/slices/productSlice'
import SortDropdown from '@/components/SortDropdown'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'


function Home() {

    const dispatch = useDispatch()
    const [searchItem, setSearchItem] = useState('')
    const products = useSelector((state) => state.products.items)
    const status = useSelector((state) => state.products.status)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    function handleSearch() {
        dispatch(searchProducts(searchItem))
    }

    function handleSearchTags(data) {
        dispatch(searchProductsWithTags(data))
    }

    function handleDarkMode(){
        toast.success('We will implement soon')
    }
    // console.log(product)
    return (
        <>
            <div className=' w-full h-auto p-10 space-y-5 '>

                <div className=' flex md:flex-row flex-col space-y-6 justify-between items-center px-5'>
                    <div className='' >
                        <h1 className='text-5xl'>Food App </h1>
                        <p className='text-4xl'>With Redux-Toolkit And Backend APIs</p><span className='text-md text-white bg-green-500 px-4 py2 rounded-md'>With all Functionalites</span>
                    </div>

                    <div onClick={handleDarkMode} className=''>
                        <Moon />
                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <div>
                        <Input type='search' placeholder='Search Food' value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                    </div>
                    <Button onClick={handleSearch} ><Search /></Button>
                    <div className='ml-5 flex justify-center items-center'>
                    <User /><Link to='/login'>Login</Link>
                    </div>
                </div>

            </div>

            {/* ------------- */}

            <div className='w-full bg-slate-300 py-5 px-7 space-y-5'>

                <div className='flex justify-between items-center'>
                    <h1 className='hidden md:block text-3xl'>Find to Best Food</h1>
                    <SortDropdown />
                </div>

                <div className='flex gap-3 overflow-x-scroll scroll-smooth scrollbar-hide ' >
                    <Button onClick={() => handleSearchTags('all')} variant='mygreen'>All</Button >
                    <Button onClick={() => handleSearchTags('lunch')} variant='mygreen'>Lunch</Button>
                    <Button onClick={() => handleSearchTags('breakfast')} variant='mygreen'>Breakfast</Button>
                    <Button onClick={() => handleSearchTags('dinner')} variant='mygreen'>Dinner</Button>
                    <Button onClick={() => handleSearchTags('snacks')} variant='mygreen'>Snacks</Button>
                </div>
            </div>
            {/* ------------- */}

            {status == 'loading' ? <h1 className='text-7xl font-semibold text-center'>Loading</h1> : null}
            {status == 'success' ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-2'>
                    {
                        products?.length > 0 && products.map((item, index) => {
                            return (
                                <div key={index}>
                                    <FoodCard id={item._id} img={item.img} name={item.name} price={item.price} desc={item.desc} category={item.category} rating={item.rating} />
                                </div>
                            )
                        })
                    }
                </div>
                : null}

            {status == 'failed' ? < h1 className='text-8xl text-center'>Product Not Found</h1> : null}


            <div className='bg-white rounded-full drop-shadow-md p-3 cursor-pointer fixed right-10 bottom-10 md:right-16 md:bottom-16'>
                <Link to='/cart'><ShoppingCart /></Link>
            </div>

        </>
    )
}

export default Home