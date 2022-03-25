const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');
const jwt = require('jsonwebtoken');


module.exports=()=>{

    return async(req,res)=>{
        const {id,name,location}=req.body;
        let sellerId
        try{
            const token=req.headers?.cookie.split("=")[1]
            sellerId = (jwt.verify(token, process.env.SECRET_KEY)._id);
        }catch(error){
            return res.status(401).send("Unauthorized Access!");
        }

        if(!id || !name || !location){
            res.json({ error: 'Please fill all the fields' });
        }else{
            const message = await propertyService.updateProperty(id,name,location,sellerId);
            if(message=="Property Doesnot Exist"){
                res.status(200).json({ message: "Property Doesnot Exist!" });
            }else if(message=="Success"){
                res.status(200).json({ message: "Property Updated Successfully!" });
            }else{
                res.status(500).json({ message: "Something Went Wrong!" });
            }
        }
    }


}