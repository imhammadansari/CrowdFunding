import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='w-full border-t border-black border-opacity-30 bg-white px-4 lg:px-20 py-4'>
                <div className='flex flex-col lg:flex-row gap-4 lg:gap-20'>

                    <div className='flex flex-col lg:w-[20rem]'>
                        <h1 className='font-bold text-start text-base md:text-lg lg:text-xl'>Brand</h1>
                        <p className='text-xs md:text-sm text-start lg:text-base'>Welcome, your one-stop destination for quality products at unbeatable prices. We are dedicated to offering
                            a seamless online shopping experience with a wide range of products, from the latest trends to everyday essentials!</p>
                    </div>

                    <div className='flex flex-col items-start'>

                        <h1 className='font-bold text-sm md:text-base lg:text-base text-start lg:pb-2'>About</h1>

                        <div className='flex lg:flex-col text-xs lg:text-base text-start gap-14 lg:gap-0'>
                        <p>About Us</p>
                        <p>Find store</p>
                        <p>Categories</p>
                        <p>Blogs</p>

                        </div>

                    </div>


                    <div className='hidden md:flex flex-col items-start'>

                        <h1 className='font-bold text-base md:text-base lg:text-base text-start pb-2'>Partnership</h1>

                        <p>About Us</p>
                        <p>Find store</p>
                        <p>Categories</p>
                        <p>Blogs</p>

                    </div>


                <div className='flex flex-col items-start'>

    <h1 className='font-bold text-sm md:text-base lg:text-base text-start lg:pb-2'>Information</h1>

    <div className='flex lg:flex-col text-xs lg:text-base text-start gap-10 lg:gap-0'>
    <p>Help Center</p>
    <p>Return Policy</p>
    <p>Shipping</p>
    <p>Contact Us</p>
    </div>
    
</div>

<div className='flex flex-col items-start'>

    <h1 className='font-bold text-sm md:text-base lg:text-base text-start lg:pb-2'>For users</h1>

    <div className='flex lg:flex-col text-xs text-start gap-16 lg:gap-0 lg:text-base'>
    <p>Login</p>
    <p>Register</p>
    <p>Setting</p>
    <p>My Orders</p>
    </div>
</div>

<div className='hidden md:flex flex-col gap-2 items-start'>

    <h1 className='font-bold text-base md:text-base lg:text-base text-start pb-2'>Get app</h1>
    <img src='Group.png' />
    <img src='footer01.png' />

    
</div>

</div>
                <p className='text-center pt-4 text-xs md:text-sm lg:text-base'>©Copyright-2024 - Created by Hammad Ansari</p>

            </div>
        </>
    )
}

export default Footer