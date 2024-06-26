const AWS = require("aws-sdk")
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "rml_landlordinfo";

const createDistribution = () => {
    return [
        {rating: 5, count: 0},
        {rating: 4, count: 0},
        {rating: 3, count: 0}, 
        {rating: 2, count: 0}, 
        {rating: 1, count: 0}
    ]
    }

const updateDistribution = (distribution, rating) => {
    return {
        pass
    }
}

const createlandlordJSON = (landlord_name, property_name, distribution, reviews, total_rating) => {
    return {
        "landlord_name": landlord_name,
        "property_name": property_name,
    }
}

const getLandlord = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const landlords = await dynamoClient.scan(params).promise();
    console.log(landlords)
    return landlords
}

getLandlord();