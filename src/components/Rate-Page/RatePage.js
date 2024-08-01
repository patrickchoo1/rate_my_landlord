import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import RatingScale from './RatingScale';
import YesNo from './YesNo';
import './RatePage.css';

function RatePage() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [selectedProperty, setSelectedProperty] = useState('');
    const [review, setReview] = useState({
        quality: 0,
        responsiveness: 0,
        pets_allowed: 'No ',
        rent: 0,
        bedrooms: 0,
        bathrooms: 0,
        comments: '',
        would_rent_again: 'No ',
        property: ''
    });

    const handleSelectChange = (event) => {
        const propertyName = event.target.value;
        setSelectedProperty(propertyName);
        setReview(prevReview => ({
            ...prevReview,
            property: propertyName
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReview(prevReview => ({
            ...prevReview,
            [name]: name === 'rent' || name === 'bedrooms' || name === 'bathrooms' ? parseInt(value, 10) : value
        }));
    };
    const handleRatingChange = (name, value) => {
        setReview(prevReview => ({ ...prevReview, [name]: value }));
    };

    const handleYesNoChange = (name, value) => {
        setReview(prevReview => ({ ...prevReview, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/landlord/${name}/addreview`, review);
            console.log('Review submitted:', response.data);
            navigate(`/landlordpage/${name}`);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="rate-page">
            <Header />
            <div className="rate-header">
                <div className="header-description">
                    <div className="header-title">Rate: Collegetown Properties</div>
                    <div className="header-subtitle">Ithaca, NY</div>
                </div>
            </div>
            <div className="rate-body">
                <form className="rate-landlord" onSubmit={handleSubmit}>
                    <div className="form-card">
                        <div className="form-title">
                            Select Property
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <select id="property" value={selectedProperty} onChange={handleSelectChange} className="dropdown-select">
                                <option value="" disabled>Select Property</option>
                                <option value="118 College Ave">118 College Ave</option>
                                <option value="312 College Ave">312 College Ave</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Rate your landlord
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <RatingScale name="quality" label="Rate your landlord" scaleLeft="1 - Awful" scaleRight="5 - Awesome" onChange={handleRatingChange} />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How responsive was this landlord?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <RatingScale name="responsiveness" label="How responsive was this landlord?" scaleLeft="1 - Very Unresponsive" scaleRight="5 - Very Responsive" onChange={handleRatingChange} />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How much did you pay for rent?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <textarea name="rent" className="rent-entry" placeholder='Monthly rent' onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Does this property allow pets?
                        </div>
                        <div className="form-content">
                            <YesNo name="pets_allowed" onChange={handleYesNoChange} />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Would you rent from this landlord again?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <YesNo name="would_rent_again" onChange={handleYesNoChange} />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How many bedrooms?
                        </div>
                        <div className="form-content">
                            <textarea name="bedrooms" className="bedroom-entry" placeholder='Number of bedrooms' onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How many bathrooms?
                        </div>
                        <div className="form-content">
                            <textarea name="bathrooms" className="bathroom-entry" placeholder='Number of bathrooms' onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Write a review
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <textarea name="comments" className="review-entry" placeholder='What do you want others to know about this landlord?' rows='7' onChange={handleInputChange}></textarea>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Submit Rating</button>
                </form>
            </div>
        </div>
    );
}

export default RatePage;
