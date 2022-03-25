const routes = require('express').Router();

module.exports=()=>{
    routes.post('/login',require('./login')());
    routes.post('/register',require('./register')());
    return routes
}