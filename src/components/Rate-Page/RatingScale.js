import React, { useState } from 'react';
import './RatingScale.css';

function RatingScale({ label, scaleLeft, scaleRight }) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value, 10));
    };

    return (
        <div className="rating-scale">
            <div className="rating-blocks">
                {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="rating-block">
                        <input
                            type="radio"
                            name={label}
                            value={num}
                            checked={rating === num}
                            onChange={handleRatingChange}
                        />
                        <span className={`block ${rating >= num ? 'selected' : ''}`}></span>
                    </label>
                ))}
            </div>
            <div className="rating-scale">
                <span className="scale-label">{scaleLeft}</span>
                <span className="scale-label">{scaleRight}</span>
            </div>
        </div>

    );
}

export default RatingScale