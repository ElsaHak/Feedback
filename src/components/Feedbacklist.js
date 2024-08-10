
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductData, fetchFeedbackData } from '../utils/api.js';
import '../styles/FeedbackList.css';

const FeedbackList = () => {
  const { productId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [sortType, setSortType] = useState('relevance');
  const [filterRating, setFilterRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await fetchProductData(productId);
        setProduct(productData);

        const feedbackData = await fetchFeedbackData(productId);
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    loadData();
  }, [productId]);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    switch (sortType) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.votes - a.votes;
      default:
        return 0;
    }
  });

  const filteredFeedbacks = filterRating
    ? sortedFeedbacks.filter(feedback => feedback.rating === filterRating)
    : sortedFeedbacks;

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleVote = (id, type) => {
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.id === id) {
        const updatedVotes = type === 'upvote' ? feedback.votes + 1 : feedback.votes - 1;
        return { ...feedback, votes: updatedVotes };
      }
      return feedback;
    });

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(`feedbacks_${productId}`, JSON.stringify(updatedFeedbacks));
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, i) => (i < rating ? '★' : '☆')).join('');
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: feedbacks.filter(feedback => feedback.rating === star).length,
  }));

  const totalFeedbacks = feedbacks.length;

  return (
    <div className="feedback-list">
      <h3>Ratings & Reviews of {product ? product.title : 'Product'}</h3>

      {product && (
        <div className="product-info">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-details">
            <p className="description">{product.description}</p>
            <p className='price'><strong style={{ color: 'red' }}>Price:</strong> ${product.price}</p>
            <div className="product-actions">
              <button className="action-button add-to-cart">Add to Cart</button>
              <button className="action-button buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      )}

      <div className="rating-summary">
        <div className="rating">
          <span className="rating-value">
            {renderStars(Math.round(feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / totalFeedbacks) || 0)}
          </span>
          <span className="rating-count">({totalFeedbacks} Ratings)</span>
        </div>
        <div className="rating-distribution">
          {ratingDistribution.map(({ star, count }) => (
            <div key={star} className="rating-star">
              <span className="rating-value">{renderStars(star)}</span>
              <span className="rating-star-bar">
                <span className="rating-star-bar-inner" style={{ width: `${(count / totalFeedbacks) * 100}%` }}></span>
              </span>
              <span className="rating-star-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortType} onChange={(e) => setSortType(e.target.value)} className="filter-select">
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="rating-filter">Filter by rating:</label>
          <select id="rating-filter" value={filterRating || ''} onChange={(e) => setFilterRating(Number(e.target.value) || null)} className="filter-select">
            <option value="">All Ratings</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
        </div>
      </div>

      {currentFeedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        currentFeedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-item">
            <div className="feedback-content">
              <div className="star-rating">
                {renderStars(feedback.rating)}
              </div>
              <p>User: {feedback.userDetails}</p>
              <p>{feedback.description}</p>
              <div className="votes">
                <button onClick={() => handleVote(feedback.id, 'upvote')} className="vote-button">Upvote</button>
                <span>{feedback.votes}</span>
                <button style={{ background: 'red' }} onClick={() => handleVote(feedback.id, 'downvote')} className="vote-button">Downvote</button>
              </div>
            </div>
          </div>
        ))
      )}

      {Math.ceil(filteredFeedbacks.length / feedbacksPerPage) > 1 && (
        <div className="pagination">
          {[...Array(Math.ceil(filteredFeedbacks.length / feedbacksPerPage)).keys()].map(number => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={currentPage === number + 1 ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
