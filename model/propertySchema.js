const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const propertySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    sellerId : {
        type: String,
        required: true
    },
    buyerId : {
        type: Number,
        required: false
    }
});

const Property = mongoose.model('PROPERTY', propertySchema);
module.exports = Property;