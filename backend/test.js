const axios = require('axios');

async function testDistribution() {
  try {
    const response = await axios.get('http://localhost:8080/landlord/John%20Doe/distribution');
    console.log('Distribution data:', response.data);
  } catch (error) {
    console.error('Error fetching distribution data:', error.response ? error.response.data : error.message);
  }
}

testDistribution();