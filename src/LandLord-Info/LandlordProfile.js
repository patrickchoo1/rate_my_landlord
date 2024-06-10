import React from 'react';
import './LandlordProfile.css';

function LandlordProfile() {
    const landlord = {
        name: "Collegetown Properties",
        location: "Ithaca, NY",
        overallQuality: 3.0,
        responsiveness: 3.5,
        wouldRentAgain: 60
    };

    return (
        <div className="landlord-profile">
            <h2>{landlord.name}</h2>
            <p>{landlord.location}</p>
            <div className="ratings">
                <p>Overall Quality: {landlord.overallQuality}</p>
                <p>Responsiveness: {landlord.communication}</p>
                <p>Would Rent Again: {landlord.wouldRentAgain}%</p>
            </div>
        </div>
    );
}

export default LandlordProfile;