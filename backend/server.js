const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3();
require('dotenv').config(); 


function createlandlord (landlord_name, property, location, overallQuality, responsiveness, wouldRentAgain, 
    ratingDistribution) 
    return {
        name: landlord_name, 
        property: property, 
        location: location, 
        overallQuality: overallQuality,
        responsiveness: responsiveness,
        wouldRentAgain: wouldRentAgain,
        ratingDistribution: ratingDistribution
    }

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  });

const uploadFile = (fileName, bucketName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
};

// Usage
uploadFile('test.txt', 'rml-landlordinfo');
