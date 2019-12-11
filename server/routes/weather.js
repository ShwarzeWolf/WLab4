const router = require('express').Router();
const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=f51bcfb8b207b0ef58ce10da80b90477&';

router.get('/', async (req, res) => {
    const result = await axios.get(API_URL + 'q=' + req.query.city);
    res.json(result.data);
        // .then(response => res.json(response.data))
        // .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/coordinates', async (req, res) => {
    const result = await axios.get(API_URL + 'lon=' + req.query.lon + '&lat=' + req.query.lat)
    res.json(result.data);

});

module.exports = router;

