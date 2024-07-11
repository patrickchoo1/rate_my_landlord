const { getLandlordInfo } = require('./dynamo');
require('dotenv').config();

const testGetLandlordInfo = async () => {
    const landlordName = "John%20Doe"; 
    try {
        const landlord = await getLandlordInfo(landlordName);
        console.log(landlord)
    } catch (error) {
        console.error('Error fetching landlord info:', error);
    }
};

testGetLandlordInfo();