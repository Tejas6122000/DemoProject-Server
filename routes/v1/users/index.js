const routes = require('express').Router();

module.exports=()=>{
    routes.post('/login',require('./login')());
    routes.post('/logout',require('./logout')());
    routes.post('/register',require('./register')());
    routes.get('/current_user',require('./current_user')());

    return routes
}