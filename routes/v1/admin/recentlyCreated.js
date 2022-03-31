const propertyService = require('../../../services/propertyService');



module.exports=()=>{

    return async(req,res)=>{
        const message = await propertyService.recentlyCreatedProperties();
        if(message=="No Properties Listed"){
            res.status(200).json({ message: "No Properties Listed" });
        }else if(message==""){
            res.status(500).json({ error: 'Something Went Wrong' });
        }else{
            res.status(200).json({ Properties: message });
        }
    }


}