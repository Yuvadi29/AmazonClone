// import { buffer } from "micro";
// import * as admin from "firebase-admin";

// // Here we will be storing our data in the database after the stripe payment has been successfully done. This is done using webhooks in JavaScript.

// // We will need a json file to give permissions to webhooks. Secure a connection to firebase
// const serviceAccount = require('../../../permissions.json');

// // initialising app
// const app = !admin.apps.length ? admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// }) : admin.app();

// // Establish connection to Stripe
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

// const fulfillOrder = async (session) => {
//     //console.log('Fulfilling order', session);
//     return app.firestore().collection('users').doc(session.metadata.email).collection("orders").doc(session.id).set({
//         unit_amount_decimal: session.amount_total / 100,
//         images: JSON.parse(session.metadata.images),
//         timestamp: admin.firestore.FieldValue.serverTimestamp(),
//     }).then(() => {
//         console.log(`SUCCESS: Order ${session.id} has been added to Database`);
//     });
// };

// export default async (req, res) => {
//     if (req.method === 'POST') {
//         const requestBuffer = await buffer(req);
//         const payload = requestBuffer.toString();
//         const signature = req.headers["stripe-signature"];

//         let event;

//         // Verify that the event posted came from Stripe
//         try {
//             event = stripe.webhooks.constructEvent(payload, signature, endPointSecret);
//         } catch (error) {
//             console.log(error);
//             return res.status(400).send(`Webhook Error: ${error.message}`);
//         }

//         // Handle checkout session completed event
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;

//             //Fulfill the order..
//             return fulfillOrder(session).then(() => res.status(200)).catch(error => {
//                 res.status(400).send(`Webhook Error: ${error.message}`);
//             });
//         }
//     }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//         externalResolver: true
//     }
// }

import {buffer} from 'micro';
import dbConnect from '../../db';

const stripeWebhook = async (req, res) => {
    if(req.method === 'POST') {
        const buf = await buffer(req);
        const secret = process.env.STRIPE_SECRET_KEY;

        //Verify the Stripe webhook signature
        const stripeSignature = req.headers['stripe-signature'];
        let event;

        try {
            event = stripe.webhooks.constructEvent(vuf, stripeSignature, secret);
        } catch (error) {
            console.log('Stripe Webhook Signature Verification Failed', error.message);
            return res.status(400).send(`Webhook Error ${error.message}`);
        }

        // Handle stripe webhook event
        if(event.type === 'payment.intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log('Payment Succeded', paymentIntent);

            // Save Payment Data to MongoDb
            const Payment = mongoose.model('Payments', {
                paymentIntentId: String,
                amount: Number,
            });

            try {
                await Payment.create({
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                });
            } catch (error) {
                console.log('Error Saving Data to Database', error);
            }
        }
        res.status(200).send('Webhook Received');
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).send('Method Not Allowed');
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

dbConnect();

export default stripeWebhook;