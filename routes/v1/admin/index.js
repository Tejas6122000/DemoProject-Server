const routes = require('express').Router();

module.exports=()=>{
    routes.get('/allUsers',require('./allUsers')());
    routes.post('/changeRole',require('./changeRole')());
    routes.get('/mostContacted',require('./mostContacted')());


    return routes
}