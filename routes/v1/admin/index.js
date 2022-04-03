const routes = require('express').Router();

module.exports=()=>{
    routes.get('/allUsers',require('./allUsers')());
    routes.post('/changeRole',require('./changeRole')());
    routes.get('/mostContacted',require('./mostContacted')());
    routes.get('/recentContacted',require('./recentlyCreated')());
    routes.post('/createuser',require('./createUser')());

    return routes
}