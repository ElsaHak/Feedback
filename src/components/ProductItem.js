import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductItem.css';

const ProductItem = ({ product }) => {
  console.log(product); 

  return (
    <div className="product-item">
      <img src={product.image} alt={product.title} />
      <div className="product-item-content">
        <h3>{product.title}</h3>
        <p>{product.description.substring(0, 100)}...</p>
        <Link to={`/product/${product.id}/feedback`} className="feedback-link">
          View and Submit Feedback
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;






