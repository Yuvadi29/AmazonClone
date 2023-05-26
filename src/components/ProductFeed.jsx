import React from 'react';
import Product from './Product';

const ProductFeed = ({ products }) => {
  return (
    // Changing the grid of elements based on Screen size
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {/* .slice will only show the products from in the particular range */}
      {products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
        <Product
          key={id}
          title={title}
          description={description}
          price={price}
          category={category}
          image={image}
        />
      ))}

      <img
        className='md:col-span-full'
        src="https://res.cloudinary.com/djfdsdzxo/image/upload/v1685126820/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630__tb3xgi.jpg"
        alt="imagepromo"
      />

      {/* Other Products */}
      <div className="md:col-span-2">
        {products.slice(4, 5).map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            title={title}
            description={description}
            price={price}
            category={category}
            image={image}
          />
        ))}
      </div>

      {products.slice(5, products.length).map(({ id, title, price, description, category, image }) => (
        <Product
          key={id}
          title={title}
          description={description}
          price={price}
          category={category}
          image={image}
        />
      ))}
    </div>
  )
}

export default ProductFeed;


