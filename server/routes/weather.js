const router = require('express').Router();
const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=f51bcfb8b207b0ef58ce10da80b90477&';



router.route('/').get((req, res) => {
    axios.get(API_URL + 'q=' + req.query.city)
        .then(response => res.json(response.data))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/coordinates').get((req, res) =>{
    axios.get(API_URL + 'lon=' + req.query.lon + '&lat=' + req.query.lat)
        .then(response => res.json(response.data))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;

