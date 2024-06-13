import React from 'react';
import Review from './Review';
import './ReviewList.css';

function ReviewList() {
    const reviews = [
        {
            propertyName: "118 College Ave.",
            quality: 4.0,
            responsiveness: 4.0,
            rent: 1250,
            pets: true,
            rentAgain: true,
            bedrooms: 6,
            bathrooms: 2,
            date: "Jun 15th, 2024",
            review: "All utilities except electricity covered. Have to pay for your own maintenance though.",
            tags: ["Spacious", "Affordable", "Responsive"]

        },
        {
            propertyName: "312 College Ave.",
            quality: 3.0,
            responsiveness: 4.0,
            rent: 1450,
            pets: false,
            rentAgain: false,
            bedrooms: 3,
            bathrooms: 1.5,
            date: "Jan 5th, 2024",
            review: "Expensive for what it is. Carpet smelled kind of musty when we first moved in.",
            tags: ["Pricey", "Good Location", "Responsive"]
        }
    ];

    return (
        <div className="review-list">
            <h3>{reviews.length} Renter Ratings</h3>
            {reviews.map(review => (
                <Review review={review} />
            ))}
        </div>
    );
}


export default ReviewList;