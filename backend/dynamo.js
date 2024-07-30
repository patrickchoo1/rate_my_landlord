const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "rml_landlordlist";

const createDistribution = () => {
    return [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 }
    ];
}

const getLandlords = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const landlords = await dynamoClient.scan(params).promise();
    console.log(landlords);
    return landlords;
}

const getLandlordInfo = async (landlordName) => {
    const params = {
        TableName: TABLE_NAME,
        Key: { landlord_name: landlordName}  

    };
    const landlord = await dynamoClient.get(params).promise();
    return landlord.Item;
};

async function getLandlordReviews(name) {
    const params = {
        TableName: 'Landlords', // Replace with your table name
        Key: {
            'landlord_name': { S: name }
        },
        ProjectionExpression: 'reviews'
    };

    try {
        const data = await dynamoDB.getItem(params).promise();
        if (!data.Item) {
            return null;
        }

        // Extract reviews from the response
        return data.Item.reviews.L.map(review => ({
            bathrooms: parseFloat(review.M.bathrooms.N),
            bedrooms: parseFloat(review.M.bedrooms.N),
            comments: review.M.comments.S,
            pets_allowed: review.M.pets_allowed.S,
            property: review.M.property.S,
            quality: parseFloat(review.M.quality.N),
            rent: parseFloat(review.M.rent.N),
            responsiveness: parseFloat(review.M.responsiveness.N),
            tags: review.M.tags.L.map(tag => tag.S)
        }));
    } catch (error) {
        console.error('Error fetching landlord reviews:', error);
        throw error;
    }
}

module.exports = { getLandlords, getLandlordInfo };
