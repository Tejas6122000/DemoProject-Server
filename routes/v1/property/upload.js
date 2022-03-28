const multer = require("multer");
const path = require('path');
const fs = require('fs');
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
            res.status(200).end('Your files uploaded.');
        })
    }
}





