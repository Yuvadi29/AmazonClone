import React from 'react';
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';

const Search = () => {

    const data = {
        user: {
            name: String,
            email: String
        }
    }
    const { data: session } = useSession();
    // console.log(data);
    const router = useRouter();
    const items = useSelector(selectItems); //This hook will select items from the cartSlice which we have made as a Global store

    return (
        <>
            <div className='hidden sm:flex rounded-md flex-grow bg-[#FEBD69] hover:bg-[#EFA335] cursor-pointer items-center h-10'>
                <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' />
                <MagnifyingGlassIcon className="h-12 p-4" />
            </div>

            {/*Shopping Cart section  */}
            <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                <div className='link' onClick={!session ? () => signIn() : () => signOut()}>
                    <div>
                        {session ? `Hello, ${session.user.name}` : `SignIn`}
                    </div>
                    <div className='font-extrabold md:text-sm'>Account & Lists</div>
                </div>

                <div className='link'>
                    <div>Returns</div>
                    <div className='font-extrabold md:text-sm'>& Orders</div>
                </div>

                <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                    <div className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-[#EFA335] text-center rounded-full text-black font-bold'>{items.length}</div>
                    <ShoppingCartIcon className='h-10' />
                    <div className='hidden md:inline font-extrabold md:text-sm mt-2'>Cart</div>
                </div>
            </div>
        </>

    )
}

export default Search;