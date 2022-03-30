const multer = require("multer");
const path = require('path');
const fs = require('fs');
require('./../../../db/conn');
const Property = require('./../../../model/propertySchema');
const propertyService = require('../../../services/propertyService');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './../../../images/'))
        
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },//5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('uploadedImages', 10)


module.exports=()=>{
    return async(req,res)=>{
        const temp=async(img)=>{
            const id="62444459bdfb21ea2d4a22f2"
            const message =await propertyService.saveImageToDB(img,id);
            console.log(message)
            if(message=="Success"){
                res.status(200).end('Your files uploaded.');
            }else{
               console.log(message)
            }
        } 
        multi_upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
                return;
            } else if (err) {
                if (err.name == 'ExtensionError') {
                    res.status(413).send({ error: { message: err.message } }).end();
                } else {
                    res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
                }
                return;
            }
            let imageArray=[]
            req.files.map(function(file) {
                imageArray.push(file.filename)
                return file.filename;
              });
            console.log(imageArray)
            temp(imageArray)

        }) 
         
    }
}





