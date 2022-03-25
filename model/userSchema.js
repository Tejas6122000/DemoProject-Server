const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    contactedProperty:[
        {
            property:{
                type: String,
                required: true
            }
        }
    ]
    ,
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]

});
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;