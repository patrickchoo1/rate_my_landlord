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


app.get('/overallRating', (req, res) => {
    const totalRating = parseFloat(req.query.totalRating);
    const numberOfRatings = parseInt(req.query.numberOfRatings, 10);

    if (numberOfRatings === 0) {
        return res.status(400).json({ error: 'Number of ratings cannot be zero' });
    }

    const overallRating = totalRating / numberOfRatings;
    res.json({ overallRating: overallRating });
});


app.get('/landlord/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const landlord = await getLandlordByName(name);
        if (landlord) {
            res.json(landlord);
        } else {
            res.status(404).json({ error: 'Landlord not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch landlord' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
