const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');
const jwt = require('jsonwebtoken');


module.exports=()=>{

    return async(req,res)=>{
        const {name,location}=req.body;
        let sellerId
        try{
            const token=req.headers?.cookie.split("=")[1]
            sellerId = (jwt.verify(token, process.env.SECRET_KEY)._id);
        }catch(error){
            return res.status(401).send("Unauthorized Access!");
        }

        if(!name || !location){
            res.json({ error: 'Please fill all the fields' });
        }else{
            const message = await propertyService.createProperty(name,location,sellerId);
            if(message=="Exists"){
                res.status(200).json({ message: "Property Already Exists!" });
            }else if(message=="Success"){
                res.status(200).json({ message: "Property Added Successfully!" });
            }else{
                res.status(500).json({ message: "Something Went Wrong!" });
            }
        }
    }


}