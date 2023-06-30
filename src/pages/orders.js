// import React from 'react';
// import Header from '../components/Header';
// import { getSession, useSession } from 'next-auth/react';
// import db from '../../firebase.js';
// import Order from '../components/Order';

// const orders = ({ orders }) => {
//     // const session = useSession();

//     return (
//         <div>
//             <Header />
//             <main className='max-w-screen-lg mx-auto p-10'>
//                 <div className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
//                     Your Orders
//                 </div>

//                 {session ? (
//                     <div>x Orders</div>
//                 ) : (
//                     <div>Sign In to see your Orders</div>
//                 )}

//                 {/* <div className='mt-5 space-y-4'>
//                     {orders?.map(
//                         ({ id, amount, amountShipping, items, timestamp, images }
//                         ) => (
//                             <Order />
//                         )
//                     )}
//                 </div> */}
//             </main>
//         </div>
//     )
// }

// export default orders;

// export async function getServerSideProps(context) {
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//     // Get the User logged in Credentials
//     const session = getSession(context);

//     if (!session) {
//         return {
//             props: {},
//         };
//     }

//     const stripeOrders = await db.collection('users').doc(session.user.email);
// }