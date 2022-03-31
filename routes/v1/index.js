const routes = require('express').Router();


module.exports=()=>{
    routes.use('/user',require('./users')());
    routes.use('/property',require('./property')());
    routes.use('/admin',require('./admin')());

    return routes
}