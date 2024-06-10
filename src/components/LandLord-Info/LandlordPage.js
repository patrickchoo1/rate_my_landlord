import React from 'react';
import LandlordProfile from './LandlordProfile';
import CommentList from './CommentList';
import './LandlordPage.css';

function LandlordPage() {
    return (
        <div className="landlord-page">
            <LandlordProfile />
            <CommentList />
        </div>
    );
}

export default LandlordPage;