require('../db/conn');
const Property = require('../model/propertySchema');
const User = require('../model/userSchema');
var fs = require('fs');
var path= require('path');

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
                return result
            }
            else{
                return "Error"
            }
        }
    } catch (error) {
        return error
    }
}

const updateProperty= async(id,name,location,area,price,type,description)=>{
    try {
        const Exists = await Property.findOne({_id:id});
        if(Exists){
            const imageArray = Exists.images;
            const result = await Property.updateOne({_id:id},{$set:{name:name,location:location,area:area,price:price,type:type,description:description}})
            if (result){
                for(let i=0;i<imageArray.length;i++){
                    var filePath = path.join(__dirname, './../images/',imageArray[i])
                    await fs.unlinkSync(filePath);
                }
                const property = await Property.findOne({_id:id})
                return property;
            }
            else{
                return "Error"
            }
        }else{
            return "Property Doesnot Exist"
        }
    } catch (error) {
        return error
    }
}
const getPropertyById= async(id)=>{
    try{
    const property = await Property.findOne({_id:id})
    if(property){
        return property
    }else{
        return "Property Doesnot Exist"
    }
    }catch(error){
        return error
    }
}

const removeProperty= async(id,canRemove)=>{
    try {
        const Exists = await Property.findOne({_id:id});
        if(Exists){
            if(canRemove==Exists.sellerId){
                let imageArray=Exists.images;
                const result=await Property.deleteOne({_id:id})
                if(result){
                    for(let i=0;i<imageArray.length;i++){
                        var filePath = path.join(__dirname, './../images/',imageArray[i])
                        await fs.unlinkSync(filePath);
                    }

                    const users = Exists.contacterIds;
                    for(let i=0;i<users.length;i++){
                        const user  =  await User.findOne({_id:users[i].contacterId});
                        const result = await user.removeContacted(Exists._id);
                    }

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
            const message = await property.addContacterId(user.id);
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

const saveImageToDB= async(images,id)=>{
    try {
        
        const result = await Property.updateOne({_id:id},{$set:{images:images}})
        if (result){
            return "Success"
        }
        else{
            return result
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
    contactedProperty,
    saveImageToDB,
    getPropertyById
}