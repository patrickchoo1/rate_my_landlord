import React, { useState } from 'react';
import Header from '../Header/Header'
import RatingScale from './RatingScale';
import YesNo from './YesNo';
import './RatePage.css'

function RatePage() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
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
                <form className="rate-landlord">
                    <div className="form-card">
                        <div className="form-title">
                            Select Property
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <select id="property" value={selectedOption} onChange={handleSelectChange} className="dropdown-select">
                                <option value="" disabled>Select Property</option>
                                <option value="option1">118 College Ave</option>
                                <option value="option2">312 College Ave</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Rate your landlord
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <RatingScale label="Rate your landlord" scaleLeft="1 - Awful" scaleRight="5 - Awesome" />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How responsive was this landlord?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <RatingScale label="How responsive was this landlord?" scaleLeft="1 - Very Unresponsive" scaleRight="5 - Very Responsive" />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How much did you pay for rent?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <textarea className="rent-entry" placeholder='Monthly rent'></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Does this property allow pets?
                        </div>
                        <div className="form-content">
                            <YesNo />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Would you rent from this landlord again?
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <YesNo />
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How many bedrooms?
                        </div>
                        <div className="form-content">
                            <textarea className="bedroom-entry" placeholder='Number of bedrooms'></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            How many bathrooms?
                        </div>
                        <div className="form-content">
                            <textarea className="bathroom-entry" placeholder='Number of bathrooms'></textarea>
                        </div>
                    </div>
                    <div className="form-card">
                        <div className="form-title">
                            Write a review
                            <span className="required">*</span>
                        </div>
                        <div className="form-content">
                            <textarea className="review-entry" placeholder='What do you want others to know about this landlord?'
                                rows='7'></textarea>
                        </div>
                    </div>
                    <button className="submit-button">Submit Rating</button>
                </form>
            </div >
        </div >
    )
}

export default RatePage;