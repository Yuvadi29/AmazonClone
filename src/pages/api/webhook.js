// import { buffer } from "micro";
// import * as admin from "firebase-admin";



// // Secure a connection to firebase
// var serviceAccount = require("../../../permissions.json");
// // Initialise the app
// const app = !admin.apps.length ? admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// }) : admin.app();


// // Establish connection to stripe
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

// const fulfillOrder = async (session) => {
//     console.log('Fulfilling Order', session);

//     const userEmail = session.metadata.email;
//     console.log('User Email:', userEmail);

//     try {
//         await app
//             .firestore()
//             .collection("users")
//             .doc(userEmail)
//             .collection("orders")
//             .doc(session.id)
//             .set({
//                 amount: session.amount_total / 100,
//                 images: JSON.parse(session.metadata.images),
//                 timestamp: admin.firestore.FieldValue.serverTimestamp(),
//             });

//         console.log(`SUCCESS: Order ${session.id} has been added to the database`);
//     } catch (error) {
//         console.error(`Error adding order ${session.id} to the database:`, error);
//     }
// };


// export default async (req, res) => {
//     if (req.method === 'POST') {
//         const requestBuffer = await buffer(req);
//         const payload = requestBuffer.toString();
//         const sig = req.headers["stripe-signature"];

//         let event;

//         // Verify that event posted came from stripe
//         try {
//             event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
//         } catch (error) {
//             console.log('Error', error.message);
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         // Handle the checkout.session.completed event
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;

//             // FulFill Order
//             return fulfillOrder(session).then(() => res.status(200)).catch(err => res.status(400).send(`Webhook Error: ${err.message}`));
//         }
//     }
// }

// // admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount)
// // });

// export const config = {
//     api: {
//         bodyParser: false,
//         externalResolveer: true
//     },
// };
import { buffer } from "micro";
import clientPromise  from "../../db"; // Import your MongoDB connection utility

const fulfillOrder = async (session, db) => {
  console.log('Fulfilling Order', session);

  const userEmail = session?.metadata?.email;
  console.log('User Email:', userEmail);

  try {
    await db.collection("orders").insertOne({
      userId: userEmail,
      sessionId: session.id,
      amount: session.amount_total / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: new Date(),
    });

    console.log(`SUCCESS: Order ${session.id} has been added to the database`);
  } catch (error) {
    console.error(`Error adding order ${session.id} to the database:`, error);
  }
};

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
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Connect to the MongoDB database
      const db = await clientPromise;

      // FulFill Order
      return fulfillOrder(session, db)
        .then(() => res.status(200).end())
        .catch(err => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};
