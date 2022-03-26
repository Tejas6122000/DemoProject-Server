require('../db/conn');
const Property = require('../model/propertySchema');

const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
require('dotenv').config();


const allProperties= async()=>{
    try {
        const all = await Property.find({});
        if(all){
            return all
        }else{
            return "No Properties Listed"
        }
    } catch (error) {
        return error
    }
}

const createProperty= async(name,location,sellerId)=>{
    try {
        const Exists = await Property.findOne({name:name});
        if(Exists){
            return "Exists"
        }else{
            const property = new Property({name,location,sellerId});
            const result = await property.save();
            if (result){
                return "Success"
            }
            else{
                return result
            }
        }
    } catch (error) {
        return error
    }
}

const updateProperty= async(id,name,location,sellerId)=>{
    try {
        const Exists = await Property.findOne({_id:id});
        if(Exists){
            const result = await Property.updateOne({_id:id},{$set:{name:name,location:location,sellerId:sellerId}})
            if (result){
                return "Success";
            }
            else{
                return result
            }
        }else{
            return "Property Doesnot Exist"
        }
    } catch (error) {
        return error
    }
}

const removeProperty= async(id)=>{
    try {

        const Exists = await Property.findOne({_id:id});
        if(Exists){
            const result=await Property.remove({_id:id})
            if(result){
                return "Success"
            }
            else{
                return result
            }
        }
        else{
            return "Property Doesnot Exist"
        }
    } catch (error) {
        return error
    }
}

const contactedProperty= async(property_id,user_id)=>{

    try {
        const property = await Property.findOne({_id:property_id})
        const user = await User.findOne({_id:user_id});
        if(property.sellerId!=user._id){
            const message = await property.addContacterId(user_id);
            const message2 = await user.addToContacted(property_id);
            return {user:user,property:property}
        }
        else{
            return "You cannot contact your own property"
        }


    } catch (error) {
        return error
    }

}



module.exports = {
    allProperties,
    createProperty,
    removeProperty,
    updateProperty,
    contactedProperty
}