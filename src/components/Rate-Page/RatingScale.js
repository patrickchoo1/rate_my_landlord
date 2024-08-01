import React, { useState } from 'react';
import './RatingScale.css';


function RatingScale({ name, label, scaleLeft, scaleRight, onChange }) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setRating(value);
        onChange(name, value);
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
            <div className="scale-labels">
                <div className="scale-left">{scaleLeft}</div>
                <div className="label-space"></div>
                <div className="scale-right">{scaleRight}</div>
            </div>
        </div>

    );
}

export default RatingScale