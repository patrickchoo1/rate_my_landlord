const axios = require('axios');

async function testAddReview() {
  const review = {
    quality: 4,
    responsiveness: 5,
    pets_allowed: 'yes',
    rent: 1200,
    bedrooms: 2,
    bathrooms: 1,
    comments: 'Great property, very responsive landlord.',
    would_rent_again: true
  };

  try {
    const response = await axios.post('http://localhost:8080/landlord/John%20Doe/addreview', review);
    console.log('Add review response:', response.data);
  } catch (error) {
    console.error('Error reviewing:', error.response ? error.response.data : error.message);
  }
}

testAddReview();