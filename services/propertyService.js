require('../db/conn');
const Property = require('../model/propertySchema');


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
        }
    } catch (error) {
        return error
    }
}





module.exports = {
    allProperties,
    createProperty
}