const express = require('express');
const cors = require('cors');
const { getLandlords, getLandlordInfo } = require('./dynamo');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/landlords', async (req, res) => {
    try {
        const landlords = await getLandlords();
        res.json(landlords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch landlords' });
    }
});

app.get('/landlord/:name/overallRating', async (req, res) => {
    const { name } = req.params;

    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));
        if (!landlord) {
            console.log('Landlord not found'); 
            return res.status(404).json({ error: 'Landlord not found' });
        }

        const { total_rating, number_of_ratings } = landlord;
        if (number_of_ratings === 0) {
            return res.status(200).json({ overallRating: 0 });
        }

        const temp = total_rating / number_of_ratings;
        const overallRating = Math.trunc(temp*100)/100
        console.log(`Overall rating for ${name}: ${overallRating}`); 
        res.status(200).json({ overallRating });
    } catch (error) {
        console.error('Failed to calculate overall rating:', error);
        res.status(500).json({ error: 'Failed to calculate overall rating' });
    }
});

app.get('/landlord/:name', async (req, res) => {
    const { name } = req.params;
    if (!name) {
        console.error('No landlord name provided');
        return res.status(400).json({ error: 'No landlord name provided' });
    }

    console.log(`Received request for landlord: ${decodeURIComponent(name)}`);
    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));
        if (landlord) {
            console.log('Found landlord:', landlord);
            res.json(landlord);
        } else {
            console.log('Landlord not found');
            res.status(404).json({ error: 'Landlord not found' });
        }
    } catch (error) {
        console.error('Failed to fetch landlord:', error);
        res.status(500).json({ error: 'Failed to fetch landlord' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
