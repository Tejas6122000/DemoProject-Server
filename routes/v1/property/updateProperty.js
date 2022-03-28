const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id,name,location,area,price,type,description,sellerId}=req.body;
        let token = req.cookies.jwt;
        let canEdit;
        if(!id || !name || !location || !area || !description || !price || !type || !sellerId){
            res.json({ error: 'Please provide all the details' });
        }else{
            if(!token){
                return res.status(401).send("Unauthorized Access!");
            }else{
                canEdit = (await userService.getUser(token))._id;
                if(canEdit!=sellerId){
                    return res.status(401).send("You cannot edit this property!");
                }else{        
                    const message = await propertyService.updateProperty(id,name,location,area,price,type,description,sellerId);
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
    }
}
