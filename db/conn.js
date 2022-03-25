const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log(err);
});