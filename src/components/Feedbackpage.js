import React from 'react';
import { useParams } from 'react-router-dom';
import Feedbacklist from './Feedbacklist'; // Ensure this path is correct

const Feedbackpage = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Feedback for Product ID: {productId}</h1>
      <Feedbacklist />
    </div>
  );
};

export default Feedbackpage;
