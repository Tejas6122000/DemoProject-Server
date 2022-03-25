const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');
const jwt = require('jsonwebtoken');


module.exports=()=>{

    return async(req,res)=>{
        const {id}=req.body;
        if(!id){
            res.json({ error: 'Please provide Valid Details' });
        }else{
            const message = await propertyService.removeProperty(id);
            if(message=="Property Doesnot Exist"){
                res.status(200).json({ message: "Property Doesnot Exist!" });
            }else if(message=="Success"){
                res.status(200).json({ message: "Property Removed Successfully!" });
            }else{
                res.status(500).json({ message: "Something Went Wrong!" });
            }
        }
    }


}