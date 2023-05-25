import Image from 'next/image';
import React from 'react';
import Search from './Search';

const Header = () => {
  return (
    <header>
      {/* Top Navbar */}
      <div className='flex items-center bg-Amazon_blue p-1 flex-grow py-2'>
      {/* Defining for the Logo Part */}
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
          src='https://res.cloudinary.com/djfdsdzxo/image/upload/v1684985172/AmazonClone/amazon_PNG11_tbebg9.png' 
          width={150}
          height={40}
          objectFit="contain"
          className='cursor-pointer'
          />
        </div>

        <Search />

      </div>

      {/* Bottom Navbar */}
      <div>

      </div>
    </header>
  )
}

export default Header;

// The header container consists of 2 containers. One is the entire search bar area with amazon logo, bucket of orders, account and links and the that stuff. And the second one is the bar below it which shows the filters of the types of items to be purchased like Health and Personal Care, Electronics, Food and Grocery, etc.