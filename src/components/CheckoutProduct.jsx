import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

const CheckoutProduct = ({ id, title, description, price, rating, category, image, hasPrime }) => {
  return (
    <div className='grid grid-cols-5'>
      <Image
        src={image}
        height={200}
        width={200}
        alt='ImagefromProduct'
        objectFit='contain'
      />

      {/* Middle section for description of product */}
      <div className="col-span-3 mx-5">
        <div>{title}</div>
        <div className='flex'>
          {Array(rating).fill().map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
        </div>

        <div className="text-xs my-2 mb-2 line-clamp-3">{description}</div>
        <div className="">&#8377;{price}</div>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading='lazy'
              src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685101417/amazon_prime_icon_ofg3mm.png"
              alt="primeLogo"
              className='w-12'
            />

            <div className="text-xs text-gray-500
            ">FREE Delivery Next Day</div>

          </div>
        )}

      </div>


      
    </div>
  )
}

export default CheckoutProduct;