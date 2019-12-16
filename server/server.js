const express = require('express');

require('dotenv').config();

const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

var db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '',
        database : 'postgres'
    }
});

// App
const app = express();

// App Middleware
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));

// App Routes - Auth

const main = require('./controllers/main');

app.get('/favourites', (req, res) => main.getTableData(req, res, db));
app.post('/favourites', (req, res) => main.postTableData(req, res, db));
app.delete('/favourites', (req, res) => main.deleteTableData(req, res, db));

const weatherRouter = require('./routes/weather');
app.use('/weather', weatherRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`app is running on port ${process.env.PORT || 5000}`)
});
