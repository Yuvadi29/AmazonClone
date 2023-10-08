import React from 'react';
import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';


const Success = () => {
    const form = useRef();
    const {data: session} = useSession();
    const router = useRouter();

    const sendMail = (e) => {
        e.preventDefault();

        const userEmail = session?.data?.user?.email;

        // // Populate the form fields
        // form.current.querySelector('[name="to_email"]').value = userEmail;
        // form.current.querySelector('[name="subject"]').value = 'Your Order Confirmation';
        // form.current.querySelector('[name="message"]').value = 'Thank you for your order!';

        const templateParams = {
            to_name: session?.user?.name,
            to_email: session?.user?.email,
            from_name: 'Amazon',
        }

        emailjs.send('service_qe5etz8', 'template_foiap3x', templateParams, 'hpVPfQVpaWKVjMk2D')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

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
                        Thank you <b>{session?.user?.name}</b> for shopping. You will receive a confirmation mail on your registered email-id when the item has shipped. If you want to check the status of your order, press the link below.
                    </div>
                    <button className='button mt-8' onClick={() => router.push("/orders")}>Go to My Orders</button>
                    <form ref={form} onSubmit={sendMail}>
                        <input type='hidden' name='to_email' />
                        <input type='hidden' name='subject' />
                        <input type='hidden' name='message' />
                        <a href='https://mail.google.com/' target='_blank'>
                            <button className='button mt-8'>Check Mail</button>
                        </a>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Success;