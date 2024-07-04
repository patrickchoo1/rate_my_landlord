import React, { useEffect, useState } from 'react';
import './ResultBox.css';
import { useNavigate } from 'react-router-dom';
import Box from './Box';
import axios from 'axios'

function ResultsBox() {

    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/LandlordPage/:id");
    }

    const [landlords, setLandlords] = useState([]);

    const [overallRating, setOverallRating] = useState(null);

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await axios.get('http://localhost:8080/landlords');
                setLandlord(response.data);
            } catch (error) {
                console.error('Failed to fetch landlord', error);
            }
        };

        const fetchOverallRating = async () => {
            try {
                const response = await axios.get('http://localhost:8080/overallRating', {
                    params: { totalRating: landlord.total_rating, numberOfRatings: landlord.number_of_ratings} 
                });
                setOverallRating(response.data.overallRating);
            } catch (error) {
                console.error('Failed to fetch overall rating', error);
            }
        };

        fetchLandlord();
        fetchOverallRating();
    }, []);

    return (
        <div className = 'currBox' onClick = {handleClick}>
            <Box color="#E5E5E5" width="1200px" height="170px">
                <div className="info">
                    <div className="left">
                        <p className = 'quality'>Quality</p>
                        <div className = "inner-left">
                            <Box color = "#34ebab" width = "70px" height = "70px" className>5.0</Box>
                        </div>
                         <p className = 'reviews'> 133 Reviews</p>
                     </div>
                    <div className = 'right'>
                        <p className = 'Landlord-Name'>{ landlord.landlord_name }</p>
                        <p>Property Name</p>
                        <p>Sample Address: 229 Elizabeth St.</p>
                        <div className = 'take-again'>
                            <span className="TA-QOL margin-right">99%</span> would rent again | <span className="TA-QOL margin-right margin-left"> 5.0</span> Quality of Life
                        </div>
                    </div>
                </div>
            </Box>
        </div>
  );
}

export default ResultsBox;
