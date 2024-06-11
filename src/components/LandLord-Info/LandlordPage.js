import React from 'react';
import LandlordProfile from './LandlordProfile';
import ReviewList from './ReviewList';
import Header from '../Header/Header'
import './LandlordPage.css';

function LandlordPage() {
    return (
        <div className="landlord-page">
            <Header />
            <LandlordProfile />
            <ReviewList />
        </div>
    );
}

export default LandlordPage;