import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const success = () => {
    const router = useRouter();
    return (
        <div className='bg-[#EAEDED] h-screen'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <div className='text-3xl'>Thank you, Your Order has been Confirmed.</div>
                    </div>

                    <div>
                        Thank you for shopping. You will receive a confirmation mail on your registered email-id when the item has shipped. If you want to check the status of your order, press the link below.
                    </div>
                    <button className='button mt-8' onClick={() => router.push("/orders")}>Go to My Orders</button>
                </div>
            </main>
        </div>
    )
}

export default success;