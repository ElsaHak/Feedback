import React from 'react';
import '../styles/FeedbackItem.css'; 

const FeedbackItem = ({ feedback }) => {
  return (
    <div className="feedback-item">
      <h3>{feedback.title}</h3>
      <p>{feedback.description}</p>
      <div className="feedback-rating">
        {'★'.repeat(feedback.rating)}
        {'☆'.repeat(5 - feedback.rating)}
      </div>
      {feedback.userDetails && (
        <div className="feedback-user">
          <p>User: {feedback.userDetails}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;
