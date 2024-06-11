// src/components/LandlordPage.js

import React from 'react';
import './LandlordProfile.css';


function LandlordProfile() {
    const landlord = {
      name: "Collegetown Properties",
      location: "Ithaca, NY",
      overallQuality: 4.5,
      responsiveness: 4.3,
      wouldRentAgain: 94,
      ratingDistribution: {
        5: 98,
        4: 19,
        3: 9,
        2: 4,
        1: 3
      },
      tags: ["Good Maintenance", "Responsive", "Affordable"],
      similarLandlords: [
        { name: "Collegetown Junctions", rating: 3.4 },
        { name: "Ithaca Rentals", rating: 2.5 },
        { name: "Trabiss Hi Properties", rating: 4.0 }
      ]
    };
  
    return (
      <div className="landlord-profile">
        <div className="profile-header">
          <div className="profile-overview">
            <div className="rating">
              <div className="rating-score">
                <span className="rating-number">{landlord.overallQuality}</span>/5
              </div>
              <div className="rating-summary">
                Overall Quality Based on 133 ratings
              </div>
            </div>
            <div className="landlord-info">
              <h1>{landlord.name}</h1>
              <p>{landlord.location}</p>
              <div className="metrics">
                <div className="metric">
                  <span className="metric-value">{landlord.wouldRentAgain}%</span>
                  <span className="metric-label">Would rent again</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{landlord.responsiveness}</span>
                  <span className="metric-label">Responsiveness</span>
                </div>
              </div>
              <div className="actions">
                <button className="rate-button">Rate</button>
                <button className="compare-button">Compare</button>
              </div>
            </div>
          </div>
          <div className="rating-distribution">
            <h2>Rating Distribution</h2>
            <div className="distribution-bars">
              {[5, 4, 3, 2, 1].map((key) => (
                <div key={key} className="distribution-bar">
                  <span className="rating-label">{key}</span>
                  <div className="bar">
                    <div className="filled" style={{ width: `${landlord.ratingDistribution[key]}%` }}></div>
                  </div>
                  <span className="rating-count">{landlord.ratingDistribution[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tags-section">
          <h2>{landlord.name}'s Top Tags</h2>
          <div className="tags">
            {landlord.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="similar-landlords">
          <h2>Check out Similar Landlords in {landlord.location}</h2>
          <div className="similar-list">
            {landlord.similarLandlords.map((similar, index) => (
              <div key={index} className="similar-item">
                <span className="similar-rating">{similar.rating.toFixed(1)}</span>
                <span className="similar-name">{similar.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default LandlordProfile;
