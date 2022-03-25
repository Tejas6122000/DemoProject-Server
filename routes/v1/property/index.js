const routes = require('express').Router();

module.exports=()=>{
    routes.get('/',require('./allProperties')());
    routes.post('/create',require('./createProperty')());
    routes.post('/remove',require('./removeProperty')());
    routes.post('/update',require('./updateProperty')());
    routes.post('/contact',require('./contactProperty')());
    return routes
}