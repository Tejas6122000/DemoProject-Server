require('../db/conn');
const User = require('../model/userSchema');
bcrypt = require('bcryptjs');




const register= async(name,email,phone,password)=>{
    try {
        const Exists = await User.findOne({email:email});
        if(Exists){
            return "Exists"
        }else{
            const user = new User({name,email,phone,password});
            const result = await user.save();
            if (result){
                return "Success"
            }
        }

    } catch (error) {
        return error
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
                return token

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

const getUser = async(id)=>{
    try{
        const user = await User.findOne({_id:id});
        if(user){
            return user
        }
        else{
            return "No User Found"
        }
    }catch(error){
        return error
    }
}




module.exports = {
    register,
    login,
    getUser
}