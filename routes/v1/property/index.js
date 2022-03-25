const routes = require('express').Router();

module.exports=()=>{
    routes.get('/',require('./allProperties')());
    routes.post('/create',require('./createProperty')());
    return routes
}