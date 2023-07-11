import { buffer } from "micro";
import * as admin from "firebase-admin";



// Secure a connection to firebase
var serviceAccount = require("../../../permissions.json");
// Initialise the app
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();


// Establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('FulFilling Order', session);


    return app.firestore().collection("users").doc(session.metadata.email()).collection("orders").doc(session.id).set({
        amount: session.unit_amount_decimal / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to database`);
        }
    )
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify that event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
        } catch (error) {
            console.log('Error', error.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // FulFill Order
            return fulfillOrder(session).then(() => res.status(200)).catch(err => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
}

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

export const config = {
    api: {
        bodyParser: false,
        externalResolveer: true
    },
};