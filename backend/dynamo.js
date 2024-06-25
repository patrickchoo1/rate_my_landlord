const AWS = require("aws-sdk")
require('dotenv').config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "rml_landlordinfo";

const getLandlord = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const landlords = await dynamoClient.scan(params).promise();
    console.log(landlords)
    return landlords
}

getLandlord();