import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

const CheckoutProduct = ({ id, title, description, price, rating, category, image, hasPrime }) => {
  return (
    <div className='grid grid-cols-5'>
      <Image
      src = {image}
      height={200}
      width={200}
      alt='ImagefromProduct'
      objectFit='contain'
      />

      {/* Middle section for description of product */}
      <div className="col-span-3 mx-5">
        <div>{title}</div>
        <div>
          {Array(rating).fill().map((_,i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct;