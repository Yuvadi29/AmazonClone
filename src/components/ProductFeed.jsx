import React from 'react';

const ProductFeed = ({ products }) => {
  return (
    <div>
      <h1>Products</h1>
      {products.map(({title, price, description, category, image}) => (
        <>
        <h1>{title}</h1>
        <p>{price}</p>
        <h3>{description}</h3>
        <small>{category}</small>
        <img src={image} alt="productimage" />
        </>
      ))}
    </div>
  )
}

export default ProductFeed;


