import React from 'react';
import { useParams } from 'react-router-dom';
import Feedbackform from './Feedbackform'; 
import Feedbacklist from './Feedbacklist'; 

const ProductPage = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details</h1>
      <p>Details for product ID: {productId}</p>
      <Feedbackform />
      <Feedbacklist />
    </div>
  );
};

export default ProductPage;
