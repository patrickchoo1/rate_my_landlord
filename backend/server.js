const express = require('express');
const cors = require('cors');
const { getLandlords, getLandlordInfo, calculateOverallRating, addReview } = require('./dynamo');

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
        const result = await calculateOverallRating(decodeURIComponent(name));
        if (result.error) {
            return res.status(404).json(result);
        }
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to calculate overall rating:', error);
        res.status(500).json({ error: 'Failed to calculate overall rating' });
    }
});


app.get('/landlord/:name/would_rent_again', async (req, res) => {
    const { name } = req.params;

    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));
        if (!landlord) {
            console.log('Landlord not found');
            return res.status(404).json({ error: 'Landlord not found' });
        }

        const { would_rent_again, number_of_ratings } = landlord;
        if (number_of_ratings === 0) {
            return res.status(200).json({ rentAgainPercentage: 0 });
        }

        const temp = (would_rent_again / number_of_ratings) * 100;
        const rent_again_perc = Math.trunc(temp * 100) / 100;
        console.log(`Would rent again percentage for ${name}: ${rent_again_perc}%`);
        res.status(200).json({ rentAgainPercentage: rent_again_perc });
    } catch (error) {
        console.error('Failed to calculate would rent again percentage:', error);
        res.status(500).json({ error: 'Failed to calculate would rent again percentage' });
    }
});

app.get('/landlord/:name/responsive', async (req, res) => {
    const { name } = req.params;

    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));
        if (!landlord) {
            console.log('Landlord not found');
            return res.status(404).json({ error: 'Landlord not found' });
        }

        const { responsiveness, number_of_ratings } = landlord;
        if (number_of_ratings === 0) {
            return res.status(200).json({ responsive: 0 });
        }

        const temp = (responsiveness / number_of_ratings) * 100;
        const response_perc = Math.trunc(temp) / 100;
        console.log(`Responsiveness percentage for ${name}: ${response_perc}%`);
        res.status(200).json({ responsive: response_perc });
    } catch (error) {
        console.error('Failed to calculate responsiveness percentage:', error);
        res.status(500).json({ error: 'Failed to calculate responsiveness percentage' });
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

app.get('/landlord/:name/distribution', async (req, res) => {
    const { name } = req.params;

    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));

        console.log('Landlord data:', landlord);

        if (!landlord || !landlord.distribution) {
            console.log('No distribution data found for landlord');
            return res.status(404).json({ error: 'No distribution data found for landlord' });
        }

        const distribution = landlord.distribution.map(item => {
            const rating = parseInt(item.rating, 10);
            const count = parseInt(item.count, 10);
            return { rating, count };
        });

        console.log('Formatted distribution data:', distribution);
        res.status(200).json({ distribution });
    } catch (error) {
        console.error('Failed to fetch distribution data:', error);
        res.status(500).json({ error: 'Failed to fetch distribution data' });
    }
});

app.get('/landlord/:name/reviews', async (req, res) => {
    const { name } = req.params;

    try {
        const landlord = await getLandlordInfo(decodeURIComponent(name));

        console.log('Landlord data:', landlord); 

        if (!landlord || !landlord.reviews) {
            console.log('No reviews found for landlord');
            return res.status(404).json({ error: 'No reviews found for landlord' });
        }

        const reviews = landlord.reviews.map(item => ({
            bathrooms: parseInt(item.bathrooms, 10),
            bedrooms: parseInt(item.bedrooms, 10),
            comments: item.comments,
            date: item.date,
            petsAllowed: item.pets_allowed,
            property: item.property,
            quality: parseInt(item.quality, 10),
            rent: parseInt(item.rent, 10),
            responsiveness: parseInt(item.responsiveness, 10),
            wouldRentAgain: item.wouldRentAgain
        }));

        console.log('Formatted reviews data:', reviews); // Log formatted data
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Failed to fetch reviews data:', error);
        res.status(500).json({ error: 'Failed to fetch reviews data' });
    }
});

app.post('/landlord/:name/addreview', async (req, res) => {
    const { name } = req.params;
    const review = req.body;

    try {
        const updatedLandlord = await addReview(decodeURIComponent(name), review);
        res.status(200).json(updatedLandlord);
    } catch (error) {
        console.error('Error adding review:', error);
        console.log("failed: ", review);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
