require('../db/conn');
const User = require('../model/userSchema');
const Property = require('../model/propertySchema');
bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUsers= async()=>{
    try {
        const users = User.find({})
        return users
    } catch (error) {
        return "Failed"
    }
}

const register= async(name,email,phone,password)=>{
    try {
        const Exists = await User.findOne({email:email});
        if(Exists){
            return "Exists"
        }else{
            const user = new User({name,email,phone,password});
            const result = await user.save();
            const token = await result.generateAuthToken();

            if (result){
                return token
            }
        }

    } catch (error) {
        return "Failed"
    }
}

const login = async(email,password)=>{
    try {
        let token;
        const userLogin = await User.findOne({email:email});
        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);
            if(isMatch){
                const token = await userLogin.generateAuthToken();
                return token;

            }else{
                return "Wrong Credentials"
            }


        }else{
            return "Wrong Credentials";
        }
    } catch (error) {
        return error
    }
}

const getUser = async(token)=>{
    try {
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        if(verifyUser){
            const user  =await User.findOne({_id:verifyUser._id})
            return {_id:user._id,name:user.name,email:user.email,phone:user.phone,role:user.role,contactedProperty:user.contactedProperty};
        }else{
            return "Failed"
        }
    } catch (error) {
        return "Failed"
    }
}

const getUserById = async(id)=>{
    try {
        const user  = await User.findOne({_id:id})
        if(user){
            return {_id:user._id,name:user.name,email:user.email,phone:user.phone,role:user.role,contactedProperty:user.contactedProperty};
        }
        else{
            return "Failed"
        }
    } catch (error) {
        return "Failed"
    }
}

const getOwnProperty = async(id)=>{
    try {
        
        const properties = await Property.find({sellerId:id})
        if(properties.length>0){
            return properties;
        }else{
            return "You have no properties"
        }
        

    } catch (error) {
        // console.log(error)
        return "Failed"
    }
}

const getContacted = async(id)=>{
    try {
        
        const propertiesId = (await User.findOne({_id:id})).contactedProperty;
        console.log(propertiesId)
        if(propertiesId.length>0){
            return propertiesId;
        }else{
            return "You have contacted no properties"
        }
        

    } catch (error) {
        console.log(error)
        return "Failed"
    }
}

module.exports = {
    getAllUsers,
    register,
    login,
    getUser,
    getUserById,
    getOwnProperty,
    getContacted
}