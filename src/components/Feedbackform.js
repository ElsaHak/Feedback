import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../utils/api'; 
import '../styles/FeedbackForm.css';

const Feedbackform = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  
  const titleOptions = [
    'Product Quality Improvement',
    'Customer Service Feedback',
    'Feature Request',
    'Pricing Concerns',
    'Shipping Issues',
  ];

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(productId);
      setProduct(data);
    };

    loadProduct();
  }, [productId]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!rating) newErrors.rating = 'Rating is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const feedbackData = {
        id: Date.now(),
        productId,
        title,
        description,
        rating,
        userDetails,
        category,
        date: new Date().toISOString(),
        votes: 0,
      };

      const savedFeedbacks = JSON.parse(localStorage.getItem(`feedbacks_${productId}`)) || [];
      savedFeedbacks.push(feedbackData);
      localStorage.setItem(`feedbacks_${productId}`, JSON.stringify(savedFeedbacks));

      navigate(`/product/${productId}/feedback-list`);
    } else {
      setErrors(formErrors);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="feedback-form">
      {product && (
        <div className="product-details">
          <img src={product.image} alt={product.title} />
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        </div>
      )}
      <h3>Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <select
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="" disabled>Select a title</option>
            {titleOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter feedback description"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter feedback category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userDetails">User Details (Optional)</label>
          <input
            type="text"
            id="userDetails"
            value={userDetails}
            onChange={(e) => setUserDetails(e.target.value)}
            placeholder="Enter your details (optional)"
          />
        </div>

        <button type="submit">Submit Feedback</button>
        <button type="button" onClick={() => navigate(`/product/${productId}/feedback-list`)}>
          View All Feedbacks
        </button>
      </form>
    </div>
  );
};

export default Feedbackform;
