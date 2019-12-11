const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getWeatherRouter = require('./routes/weather');

app.use('/weather', getWeatherRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
