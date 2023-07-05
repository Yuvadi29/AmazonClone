import clientPromise from "@/src/db";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const MongoDB = 'confirmation';

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    const webhookHandler = async(req, res) =>{
        const client = await clientPromise;
        const data = event.object.data;

        console.log(data);
    }

    webhookHandler();

    // switch(event.type){
    //     case 'payment_intent.succeeded':
    //         const paymentIntentSucceeded = event.data.object;
    //         const data = JSON.parse(paymentIntentSucceeded);
    //         console.log('Payment data:', data);
            
    //         try {
    //             const client = await clientPromise;
    //             const db = client.db(MongoDB);
    //             const collection = db.collection('orders');
            
    //             await collection.insertOne(data);
    //             console.log('Payment data stored in MongoDB');
    //         } catch (error) {
    //             console.error('Error storing payment data in MongoDB:', error);
    //         }

    //         break;

    //     default:
    //         console.log(`Unhandled Event type ${event.type}`);
    // }
    // res.send();
});

app.listen(3000, () => console.log('Running on port 3000'));
