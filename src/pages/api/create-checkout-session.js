const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items } = req.body;
    const email = req.body.email;
    console.log(items);

    const transformedItems = items.map(item => ({
        price_data: {
            currency: 'INR',
            unit_amount_decimal: item.price * 100, // Fix: Access price from item
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: transformedItems,
            mode: 'payment',
            success_url: `${process.env.HOST}/success`,
            cancel_url: `${process.env.HOST}/cancel`,
            metadata: {
                email,
                images: JSON.stringify(items.map(item => item.image)),
            },
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
};
