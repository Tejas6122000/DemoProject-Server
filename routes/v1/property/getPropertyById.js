const propertyService = require('../../../services/propertyService');



module.exports=()=>{

    return async(req,res)=>{
        const {id} = req.body;
        const message = await propertyService.getPropertyById(id);
        if(message=="Property Doesnot Exist"){
            res.status(200).json({ message:message });
        }else if(message==""){
            res.status(500).json({ error: 'Something Went Wrong' });
        }else{
            res.status(200).json({ Property: message });
        }
    }


}