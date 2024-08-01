import React, { useEffect, useState } from 'react';
import './ResultBox.css';
import { useNavigate, useParams } from 'react-router-dom';
import Box from './Box';
import axios from 'axios';

function ResultsBox() {
    const navigate = useNavigate(); 
    const { name } = useParams();

    const [landlord, setLandlord] = useState(null);
    const [overallRating, setOverallRating] = useState(null);

    const handleClick = () => {
        if (landlord && landlord.landlord_name) {
          navigate(`/landlordpage/${encodeURIComponent(landlord.landlord_name)}`);
        }
      };

    useEffect(() => {
        if (!name) {
            console.error('No landlord name provided in URL');
            return;
        }

        const fetchLandlord = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/landlord/${name}`);
                setLandlord(response.data);
            } catch (error) {
                console.error('Failed to fetch landlord', error);
            }
        };

        const fetchOverallRating = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/landlord/${name}/overallRating`);
                setOverallRating(response.data);
            } catch (error) {
                console.error('Failed to fetch overall rating', error);
            }
        };

        fetchLandlord();
        fetchOverallRating();
    }, [name]);

    const boxColor = (rating) => {
        if (rating >= 4.0) return "#7FF6C3";
        if (rating >= 3.0 && rating < 4.0) return "#FFF170";
        if (rating < 3) return "#FF9C9C";
        return "#FFFFFF"; 
    };

    if (!landlord) {
        return <div>Loading landlord data...</div>;
    }

    return (
        <div className='currBox' onClick={handleClick}>
            <Box color="#E5E5E5" width="1200px" height="170px">
                <div className="info">
                    <div className="left">
                        <p className='quality'>Quality</p>
                        <div className="inner-left">
                            <Box color={boxColor(overallRating)} width="70px" height="70px">
                                {overallRating !== null && overallRating !== undefined 
                                  ? overallRating.toFixed(1) 
                                  : 'Loading...'}
                            </Box>
                        </div>
                        <p className='reviews'>{landlord.number_of_ratings} Reviews</p>
                    </div>
                    <div className='right'>
                        <p className='Landlord-Name'>{landlord.landlord_name}</p>
                        <p>{landlord.property_name}</p>
                        <p>{landlord.address}</p>
                        <div className='take-again'>
                            <span className="TA-QOL margin-right">99%</span> would rent again | <span className="TA-QOL margin-right margin-left"> 5</span> Quality of Life
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default ResultsBox;
