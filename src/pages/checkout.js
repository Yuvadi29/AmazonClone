import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';

const Checkout = () => {
  return (
    <div className='bg-[#EAEDED]'>
        <Header />

        <main className='lg:flex max-w-screen-2xl mx-auto'>
            {/* Left Section */}
            <div className="flex-grow m-5 shadow-sm">
                <Image
                src='https://res.cloudinary.com/djfdsdzxo/image/upload/v1685350764/Prime-day-banner_civgld.png'
                alt='BannerImage'
                width={1020}
                height={250}
                objectFit='contain'
                />

                <div className="flex flex-col p-5 space-y-10 bg-white">
                    <h1 className='text-3xl border-b pb-4'>Your Shopping Cart</h1>
                </div>


            </div>


            {/* Right Section */}
            <div className="">

            </div>

        </main>

    </div>
  )
}

export default Checkout;