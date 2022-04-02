const routes = require('express').Router();

module.exports=()=>{
    routes.post('/login',require('./login')());
    routes.post('/logout',require('./logout')());
    routes.post('/register',require('./register')());
    routes.post('/updateUser',require('./updateUser')());
    routes.post('/removeUser',require("./removeUser")());
    routes.get('/current_user',require('./current_user')());
    routes.post('/getUserById',require('./getUserById')());
    routes.get('/getOwnProperty',require('./ownProperty')());
    routes.get('/getContacted',require('./getContacted')());



    return routes
}