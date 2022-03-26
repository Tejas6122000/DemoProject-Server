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
    contacterIds : [
        {
            contacterId:{
                type: String,
                required: true 
            }
        }
    ]
});

propertySchema.methods.addContacterId = async function(contacterId){
    try {
        let result = this.contacterIds.filter(x=> x.contacterId==contacterId)
        if(result.length>0){
            return "Saved"
        }
        this.contacterIds = this.contacterIds.concat({contacterId:contacterId});
        await this.save();
        return "Saved"

    } catch (error) {
        return error
    }

}

const Property = mongoose.model('PROPERTY', propertySchema);
module.exports = Property;