const AWS = require('aws-sdk');
const { format } = require('date-fns');
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
        Key: { landlord_name: landlordName }
    };
    const landlord = await dynamoClient.get(params).promise();
    return landlord.Item;
};

async function getLandlordReviews(name) {
    const params = {
        TableName: TABLE_NAME,
        TableName: TABLE_NAME,
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

        return data.Item.reviews.L.map(review => ({
            bathrooms: parseFloat(review.M.bathrooms.N),
            bedrooms: parseFloat(review.M.bedrooms.N),
            comments: review.M.comments.S,
            pets_allowed: review.M.pets_allowed.S,
            property: review.M.property.S,
            quality: parseFloat(review.M.quality.N),
            rent: parseFloat(review.M.rent.N),
            responsiveness: parseFloat(review.M.responsiveness.N),
            wouldRentAgain: review.M.would_rent_again.S
        }));
    } catch (error) {
        console.error('Error fetching landlord reviews:', error);
        throw error;
    }
}

const calculateOverallRating = async (landlordName) => {
    try {
        const landlord = await getLandlordInfo(landlordName);
        if (!landlord) {
            console.log('Landlord not found');
            return { error: 'Landlord not found' };
        }

        const { reviews } = landlord;
        if (!reviews || reviews === 0) {
            return 0;
        }

        const totalRatings = reviews.length;
        const sumRatings = reviews.reduce((sum, review) => sum + review.quality, 0);
        const overallRating = Math.round((sumRatings / totalRatings) * 100) / 100;

        console.log('Overall Rating: ', overallRating);
        return overallRating;
    } catch (error) {
        console.error('Failed to calculate overall rating:', error);
        throw new Error('Failed to calculate overall rating');
    }
};

const updateDistribution = (distribution, rating) => {
    return distribution.map(item => {
        if (item.rating === rating) {
            return { rating: item.rating, count: item.count + 1 };
        }
        return item;
    });
};

const addReview = async (landlordName, review) => {
    const landlord = await getLandlordInfo(landlordName);

    if (!landlord) {
        throw new Error('Landlord not found');
    }

    const formattedReview = {
        bedrooms: review.bedrooms,
        date: format(new Date(), 'MMM d, yyyy'),
        comments: review.comments,
        pets_allowed: review.pets_allowed,
        property: review.property,
        bathrooms: review.bathrooms,
        rent: review.rent,
        quality: review.quality,
        responsiveness: review.responsiveness,
        wouldRentAgain: review.would_rent_again
    };

    const updatedReviews = landlord.reviews || [];
    updatedReviews.push(formattedReview);

    const newTotalRating = landlord.total_rating + review.quality;
    const newNumberOfRatings = landlord.number_of_ratings + 1;

    const params = {
        TableName: TABLE_NAME,
        Key: { landlord_name: landlordName },
        UpdateExpression: "set total_rating = :total_rating, number_of_ratings = :number_of_ratings, reviews = :reviews",
        ExpressionAttributeValues: {
            ":total_rating": newTotalRating,
            ":number_of_ratings": newNumberOfRatings,
            ":reviews": updatedReviews
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoClient.update(params).promise();
        return result.Attributes;
    } catch (error) {
        console.error('Error updating landlord:', error.message, error.stack);
        throw new Error('Failed to update landlord');
    }
};


module.exports = { getLandlords, getLandlordInfo, calculateOverallRating, addReview };
