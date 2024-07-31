import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import './LandlordProfile.css';
import axios from 'axios';

function LandlordProfile() {
  const { name } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [overallRating, setOverallRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overallWouldRent, setOverallWouldRent] = useState(null);
  const [overallResponse, setOverallResponse] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!name) {
      console.error('No landlord name provided in URL');
      return;
    }

    const fetchLandlord = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landlord/${name}`);
        setLandlord(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch landlord', error);
        setLoading(false);
      }
    };

    const fetchOverallRating = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landlord/${name}/overallRating`);
        setOverallRating(response.data.overallRating);
      } catch (error) {
        console.error('Failed to fetch overall rating', error);
      }
    };

    const fetchWouldRentAgain = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landlord/${name}/would_rent_again`);
        setOverallWouldRent(response.data.rentAgainPercentage);
      } catch (error) {
        console.error('Failed to fetch overall would rent percent', error);
      }
    };

    const fetchResponsive = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landlord/${name}/responsive`);
        setOverallResponse(response.data.responsive);
      } catch (error) {
        console.error('Failed to fetch overall would rent percent', error);
      }
    };

    const fetchDistributionData = async () => {
      try {
        const distributionRes = await axios.get(`http://localhost:8080/landlord/${name}/distribution`);
        setDistribution(distributionRes.data.distribution);
      } catch (error) {
        console.error('Failed to fetch distribution data', error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landlord/${name}/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };

    fetchDistributionData();
    fetchResponsive();
    fetchWouldRentAgain();
    fetchLandlord();
    fetchOverallRating();
    fetchReviews();
  }, [name]);

  if (loading) {
    return <div>Loading landlord profile...</div>;
  }

  if (!landlord) {
    return <div>No landlord data available.</div>;
  }

  if (!distribution.length) {
    return <div>No distribution data available.</div>;
  }

  const totalRatings = distribution.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="landlord-profile">
      <div className="profile-header">
        <div className="profile-overview">
          <div className="rating">
            <div className="rating-score">
              <span className="rating-num">{overallRating !== null && overallRating !== undefined
                ? overallRating.toFixed(1)
                : 'Loading...'}</span>
              <span className="rating-den">/&nbsp;5</span>
            </div>
            <div className="rating-summary">
              Overall Quality Based on {totalRatings} ratings
            </div>
          </div>
          <div className="landlord-info">
            <h1>{landlord.property_name}</h1>
            <p>{landlord.address}</p>
            <div className="metrics">
              <div className="metric">
                <span className="metric-value">{overallWouldRent !== null ? `${overallWouldRent.toFixed(1)}` : 'Loading...'}%</span>
                <span className="metric-label">Would rent again</span>
              </div>
              <div className="separator" />
              <div className="metric">
                <span className="metric-value">{overallResponse !== null ? `${overallResponse.toFixed(1)}` : 'Loading...'}</span>
                <span className="metric-label">Responsiveness</span>
              </div>
            </div>
            <div className="actions">
              <button className="rate-button">Rate</button>
              <button className="compare-button">Compare</button>
            </div>
          </div>
        </div>
        <div className="profile-other">
          <div className="rating-distribution">
            <h2>Rating Distribution</h2>
            <div className="distribution-bars">
              {distribution.map(({ rating, count }) => (
                <div key={rating} className="distribution-bar">
                  <span className="rating-label">{rating}</span>
                  <div className="bar">
                    <div className="filled" style={{ width: `${(count / totalRatings) * 100}%` }}></div>
                  </div>
                  <span className="rating-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ReviewList reviews={reviews} /> 
    </div>
  );
}

export default LandlordProfile;
