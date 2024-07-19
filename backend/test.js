const { getLandlords } = require('./dynamo');
require('dotenv').config();

const testGetLandlordInfo = async () => {
    const landlordName = "john"; 
    try {
        const landlord = await getLandlords(landlordName);
        console.log(landlord)
    } catch (error) {
        console.error('Error fetching landlord info:', error);
    }
};

testGetLandlordInfo();