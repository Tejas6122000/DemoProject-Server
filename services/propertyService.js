require('../db/conn');
const Property = require('../model/propertySchema');
const User = require('../model/userSchema');



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

const createProperty= async(name,location,area,price,type,description,sellerId)=>{
    try {
        const Exists = await Property.findOne({name:name,location:location});
        if(Exists){
                return "Exists"
        }else{
            const property = new Property({name,location,area,price,type,description,sellerId});
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

const updateProperty= async(id,name,location,area,price,type,description,sellerId)=>{
    try {
        const Exists = await Property.findOne({_id:id});
        if(Exists){
            const result = await Property.updateOne({_id:id},{$set:{name:name,location:location,area:area,price:price,type:type,description:description,sellerId:sellerId}})
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

const removeProperty= async(id,canRemove)=>{
    try {

        const Exists = await Property.findOne({_id:id});
        if(Exists){
            if(canRemove==Exists.sellerId){
                const result=await Property.remove({_id:id})
                if(result){
                    return "Success"
                }
                else{
                    return result
                }
            }else{
                return  "You cannot remove this property!"
            }
        }else{
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
            return property.sellerId;
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