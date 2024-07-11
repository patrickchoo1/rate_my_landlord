import React, { useEffect, useState } from 'react';
import './ResultBox.css';
import { useNavigate, useParams } from 'react-router-dom';
import Box from './Box';
import axios from 'axios'

function ResultsBox() {

    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/LandlordPage/${name}`);
    };
    
    const { name } = useParams();

    const [landlord, setLandlord_name] = useState([]);

    const [overallRating, setOverallRating] = useState(null);

    useEffect(() => {
        if (!name) {
            console.error('No landlord name provided in URL');
            return;
        }

        console.log(`Fetching landlord info for: ${name}`);
        const fetchLandlord = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/landlord/${name}`);
                console.log('Fetched landlord data:', response.data);
                setLandlord_name(response.data);
            } catch (error) {
                console.error('Failed to fetch landlord', error);
            }
        };

        fetchLandlord();
    }, [ name ]);

    return (
        <div className = 'currBox' onClick = { handleClick }>
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
                        <p className = 'Landlord-Name'> {landlord.landlord_name}</p>
                        <p>Property Name</p>
                        <p>Sample Address: { landlord.property_name }</p>
                        <div className = 'take-again'>
                            <span className="TA-QOL margin-right">99%</span> would rent again | <span className="TA-QOL margin-right margin-left"> 5</span> Quality of Life
                        </div>
                    </div>
                </div>
            </Box>
        </div>
  );
}

export default ResultsBox;
