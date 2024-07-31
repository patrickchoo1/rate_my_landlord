import React from 'react';
import Review from './Review';
import './ReviewList.css';

function ReviewList({ reviews }) {
    return (
        <div className="review-list">
            <h3>{reviews.length} Renter Ratings</h3>
            {reviews.map((review, index) => (
                <Review key={index} review={review} />
            ))}
        </div>
    );
}

export default ReviewList;
