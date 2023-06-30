
import clientPromise from '@/src/db';
import { buffer } from 'micro';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const buf = await buffer(req);
        const sig = req.headers['stripe-signature'];
        const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_SIGNING_SECRET);

        handleEvent(event);

        res.status(200).send('Webhook received successfully');
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

const handleEvent = async (event) => {
    const db = await clientPromise;
    const collection = db.collection('stripe_payments');

    // Extract Relevant data from event and save to Mongodb
    const paymentData = {
        eventId: event.id,
        eventType: event.type,
        data: event.data,
    };

    await collection.insertOne(paymentData);
}