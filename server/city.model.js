const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const city = new Schema ({
    cityId: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

 const City = mongoose.model('City', city);

 module.exports = City;
