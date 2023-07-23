import { buffer } from "micro";
import Stripe from "stripe";
import clientPromise from "@/src/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret = process.env.STRIPE_SIGNING_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        req.headers["stripe-signature"],
        secret
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        // Payment completed and checkout session is successful
        console.log("Payment completed:", event.data.object);

        // Get the MongoDB client and database;
        const client = await clientPromise;
        const db = client.db();

        // Extract relevant data from the payment event
        const {
          amount,
          created,
          metadata,
        } = event.data.object;


        try {
          await db.collection("orders").insertOne({
            amount,
            timestamp: new Date(created * 1000),
            images: metadata.images,
            email: metadata.email,
          });
          console.log("Payment Data Stored in MongoDB");
        } catch (error) {
          console.log("Error Storing data", error);
        }

        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
