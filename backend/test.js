const axios = require('axios');

async function testAddReview() {
  const review = {
    bathrooms: 1,
    bedrooms: 2,
    comments: 'Great property, very responsive landlord.',
    pets_allowed: 'yes',
    property: '118 College Ave',
    quality: 4,
    rent: 1200,
    responsiveness: 5,
    would_rent_again: 'no '
  };

  try {
    const response = await axios.post('http://localhost:8080/landlord/John%20Doe/review', review);
    console.log('Add review response:', response.data);
  } catch (error) {
    console.error('Error fetching distribution data:', error.response ? error.response.data : error.message);
  }
}

testAddReview();
