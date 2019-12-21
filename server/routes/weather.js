const router = require('express').Router();
const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=41210752a269dfb2e2a8167a0910c3a1&';

router.get('/', async (req, res) => {
    const result = await axios.get(API_URL + 'q=' + req.query.city);
    res.json(result.data);
});

router.get('/coordinates', async (req, res) => {
    const result = await axios.get(API_URL + 'lon=' + req.query.lon + '&lat=' + req.query.lat);
    res.json(result.data);
});

module.exports = router;

