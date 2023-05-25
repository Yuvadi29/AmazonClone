import React from 'react';
import {
    MenuIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const Search = () => {
    return (
        <>
            <div className='hidden sm:flex rounded-md flex-grow bg-[#FEBD69] hover:bg-[#EFA335] cursor-pointer items-center h-10'>
                <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />
                <MagnifyingGlassIcon className="h-12 p-4" />
            </div>

            {/*Shopping Cart section  */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div className='link'>
                    <p>Hello, Aditya</p>
                    <p className='font-extrabold md:text-sm'>Account & Lists</p>
                </div>

                <div className='link'>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-sm'>& Orders</p>
                </div>

                <div className='relative link flex items-center'>
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-[#EFA335] text-center rounded-full text-black font-bold'>0</span>
                    <ShoppingCartIcon className='h-10' />
                    <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Cart</p>
                </div>
            </div>
        </>

    )
}

export default Search;