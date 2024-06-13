import React from 'react';
import './Review.css';

function Review({ review }) {

  return (
    <div className="review">
      <div className="review-header">
        <div className="review-ratings">
          <div className="quality-rating">
            <div className="rating-label">QUALITY</div>
            <div className="rating-score">{review.quality.toFixed(1)}</div>
          </div>
          <div className="responsive-rating">
            <div className="rating-label">RESPONSIVENESS</div>
            <div className="rating-score">{review.responsiveness.toFixed(1)}</div>
          </div>
        </div>
        <div className="review-details">
          <h3>{review.propertyName}</h3>
          <p>
            Rent: {review.rent} Pets Allowed: {review.pets ? 'Yes' : 'No'} Would Rent Again: {review.rentAgain ? 'Yes' : 'No'}
            Bedrooms: {review.bedrooms} Bathrooms: {review.bathrooms}
          </p>
        </div>
        <div className="review-date">
          {review.date}
        </div>
      </div>
      <div className="review-body">
        <p>{review.review}</p>
      </div>
      <div className="review-tags">
        {review.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default Review;
