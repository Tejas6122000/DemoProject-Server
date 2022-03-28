const routes = require('express').Router();
const auth_mw = require('../../../services/authMiddleware');
const multer = require("multer");

module.exports=()=>{
    routes.get('/',auth_mw.auth,require('./allProperties')());
    routes.post('/create',auth_mw.auth,require('./createProperty')());
    routes.post('/remove',auth_mw.auth,require('./removeProperty')());
    routes.post('/update',auth_mw.auth,require('./updateProperty')());
    routes.post('/contact',auth_mw.auth,require('./contactProperty')());
    routes.post('/upload',require('./upload')());   //field name-uploadedImages
    return routes
}