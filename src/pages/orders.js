import React from 'react';
import Header from '../components/Header';
import { getSession, useSession } from 'next-auth/react';
import moment from 'moment';
import clientPromise from "@/src/db";
import Order from '../components/Order';

const Orders = ({ orders }) => {
    const session = useSession();

    console.log(orders);
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                    Your Orders
                </h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please Sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map((
                        { id, amount, items, timestamp, images }
                    ) => (
                        <Order  
                            key={id}
                            id={id}
                            amount={amount}
                            items={items}
                            timestamp={timestamp}
                            images={images}
                        />

                    ))}
                </div>
            </main>
        </div>
    )
}

export default Orders;

export async function getServerSideProps(context) {
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const client = await clientPromise;
    const db = client.db();

    // Get the users logged-in credentials
    const session = await getSession(context);

    if (!session) {
        return {
            props: {}
        };
    }

    // Fetching data based on user email: 
    const stripeOrders = await db.collection("orders").find({
        email: session.user.email,
    }).toArray();
    console.log('StripeOrders', stripeOrders);

    const orders = stripeOrders.map(order => ({
        id: order._id.toString(),
        amount: order.amount,
        timestamp: moment(order.timestamp).unix(),
        images: JSON.parse(order?.images),
    }));

    return {
        props: {
            orders,
        }
    };
}

