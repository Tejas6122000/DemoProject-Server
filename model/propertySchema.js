const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const propertySchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    al1 : {
        type: String,
        required: true
    },
    al2 : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    zipcode : {
        type: Number,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    carea:{
        type:Number,
        required:true
    },
    barea:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        reqiured:true
    },
    sellerId : {
        type: String,
        required: true
    },
    images:{
        type:Array,
        required:true
    },
    createdOn:{
        type: Date,
        default: Date.now
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


propertySchema.methods.removeContacterId = async function(contacterId){
    try {
        this.contacterIds = this.contacterIds.filter(x=> x.contacterId!=contacterId)
        await this.save()
        return "Removed"
    } catch (error) {
        return error
    }
}


const Property = mongoose.model('PROPERTY', propertySchema);
module.exports = Property;