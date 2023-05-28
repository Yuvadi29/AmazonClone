import Image from 'next/image'
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const Product = ({ id, title, price, description, category, image }) => {

    const MAX_RATING = 5;
    const MIN_RATING = 1;
    // This will generate a random number for every rating star.
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );

    const [hasPrime] = useState(Math.random() < 0.5);


    return (
        <div className='relative flex flex-col m-5 z-30 p-10 bg-white items-center justify-center'>
            {/* Defining the category */}
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
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
            <div className="flex">
                {/* Here what we do is that we take the State of Rating and put it inside an array and fill the array with the StarIcon */}
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={id} className='h-5 fill-[#EFA335]' />
                    ))}
            </div>

            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>&#8377;{price}</div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <Image src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685101417/amazon_prime_icon_ofg3mm.png" width={48} height={3} alt="primelogo" />
                    <p className='text-xs text-gray-500'>FREE Delivery over ₹499. Fulfilled by Amazon.</p>
                </div>
            )}

            <button className='mt-auto button'>Add to Cart</button>
        </div>
    );
}

export default Product