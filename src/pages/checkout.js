import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';

const Checkout = ({ id, title, description, price, rating, category, image, hasPrime }) => {

  const items = useSelector(selectItems);

  return (
    <div className='bg-[#EAEDED]'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left Section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src='https://res.cloudinary.com/djfdsdzxo/image/upload/v1685350764/Prime-day-banner_civgld.png'
            alt='BannerImage'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <div className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Cart is Empty' : 'Shopping Cart'}
            </div>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                price={item.price}
                hasPrime={item.hasPrime}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>



        </div>


        {/* Right Section */}
        <div className="">

        </div>

      </main>

    </div>
  )
}

export default Checkout;