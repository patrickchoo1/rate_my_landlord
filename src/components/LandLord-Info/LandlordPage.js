import React from 'react';
import LandlordProfile from './LandlordProfile';
import CommentList from './CommentList';
import Header from '../Header/Header'
import './LandlordPage.css';

function LandlordPage() {
    return (
        <div className="landlord-page">
            <Header />
            <LandlordProfile />
            <CommentList />
        </div>
    );
}

export default LandlordPage;