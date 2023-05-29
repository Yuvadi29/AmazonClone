import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../slices/cartSlice';

const Product = ({ id, title, price, description, category, image }) => {

    // This is used to call into the Slice to fetch a piece of information, whenever we click on a button to an action.
    const dispatch = useDispatch();

    const MAX_RATING = 5;
    const MIN_RATING = 1;
    // This will generate a random number for every rating star.
    const [rating, setRating] = useState(4);

    const [hasPrime, setHasPrime] = useState(true);

    useEffect(() => {
        setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
        setHasPrime(Math.random() < 0.5);
    }, []);

    // Function gets triggered on clicking add to cart button
    const addItemtoCart = () => {
        // Sending the product as an action to the CartSlice so as to add the product to the cart
        const product = {
            id, title, price, description, category, image
        };

        dispatch(addtoCart(product));
    }


    return (
        <div className='relative flex flex-col m-5 z-30 p-10 bg-white items-center justify-center'>
            {/* Defining the category */}
            <div className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</div>
            <Image
                src={image}
                height={200}
                width={200}
                alt='ProductImages'
            // objectFit='contain'
            />
            {/* Defining the title */}
            <h4 className='my-3'>{title}</h4>
            {/* Defining the rating */}
            {/* Here what we do is that we take the State of Rating and put it inside an array and fill the array with the StarIcon */}
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className='h-5 fill-[#EFA335]' />
                    ))}
            </div>

            <div className='text-xs my-2 line-clamp-2'>{description}</div>

            <div className='mb-5'>&#8377;{price}</div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <Image src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685101417/amazon_prime_icon_ofg3mm.png" width={48} height={3} alt="primelogo" />
                    <div className='text-xs text-gray-500'>FREE Delivery over ₹499. Fulfilled by Amazon.</div>
                </div>
            )}
            <button onClick={() => addItemtoCart()} className='mt-auto button'>Add to Cart</button>
        </div>
    );
}

export default Product