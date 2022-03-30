const routes = require('express').Router();
const auth_mw = require('../../../services/authMiddleware');
const multer = require("multer");
let upload=multer();
const path = require('path');
const Math=require('mathjs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './../../../images/'))
        
    },
    filename: function (req, file, cb) {
            cb(null, Math.random().toString(36).substring(2, 15) + '-' + Date.now() +file.originalname.match(/\..*$/)[0])
    }
});
const multi_upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },//10MB
}).array('uploadedImages', 10)


module.exports=()=>{
    routes.get('/',auth_mw.auth,require('./allProperties')());
    routes.post('/create',multi_upload,auth_mw.auth,require('./createProperty')());
    routes.post('/remove',auth_mw.auth,require('./removeProperty')());
    routes.post('/update',multi_upload,auth_mw.auth,require('./updateProperty')());
    routes.post('/contact',auth_mw.auth,require('./contactProperty')());
    routes.post('/upload',require('./upload')());   //field name-uploadedImages
    return routes

}