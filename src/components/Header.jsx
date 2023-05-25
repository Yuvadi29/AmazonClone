import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header>
      {/* Top Navbar */}
      <div>
        <div>
          <Image
          src='https://res.cloudinary.com/djfdsdzxo/image/upload/v1684984454/AmazonClone/amazon-logo-transparent_oyhmsx.png' 
          width={150}
          height={40}
          />
        </div>

      </div>

      {/* Bottom Navbar */}
      <div>

      </div>
    </header>
  )
}

export default Header;

// The header container consists of 2 containers. One is the entire search bar area with amazon logo, bucket of orders, account and links and the that stuff. And the second one is the bar below it which shows the filters of the types of items to be purchased like Health and Personal Care, Electronics, Food and Grocery, etc.