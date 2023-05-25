import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className='relative'>
      <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20 ' />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false} //Hide Status Bar
        showIndicators={false} //Hide indicators
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039663/AmazonClone/610k0SikgkL._SX1500__dohxbs.jpg" alt="bhola" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039749/AmazonClone/D11_HeroPC_3000x1200._CB588587016__jh1r0f.jpg" alt="amazonpaycricket" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039735/AmazonClone/D82318511_WLD_iQOO-Z7s_BAU_Design_SIM_Tall_Hero_3000x1200._CB588956132__eyjze9.jpg" alt="iq00phone" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039718/AmazonClone/PG_3000x1200_May23._CB588628342__cemqfd.jpg" alt="prime" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039828/AmazonClone/_DesktopTallHero_3000x1200._CB592208555__nb7piu.jpg" alt="lavablaze" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039810/AmazonClone/BVD-PC-Herocdsg._CB589153962__jcldvl.jpg" alt="fragrance" />
        </div>
        <div>
          <img loading='lazy' src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685039795/AmazonClone/BVD-PC-Herofvsdz._CB589128581__co5lio.jpg" alt="newlaunch" />
        </div>

      </Carousel>
    </div>
  )
}

export default Banner;