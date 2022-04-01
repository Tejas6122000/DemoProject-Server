const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id}=req.body;
        let token = req.cookies.jwt;
        let canRemove;
        if(!token){
            return res.status(401).json({message:"Unauthorized Access!"});
        }else{
            canRemove = (await userService.getUser(token));      
        }
        if(!id){
            res.status(417).json({message:"Please fill all the fields"});
        }else{
            const message = await propertyService.removeProperty(id,canRemove);
            if(message=="Property Doesnot Exist"){
                res.status(404).json({message:"Property doesnot exists"});;
            }else if(message=="Success"){ 
                res.status(200).json({message:"Property removed successfully"});
            }else if(message=="You cannot remove this property!"){
                res.status(401).json({message:"You cannot remove this property!"});
            }else{
                console.log(message)
                res.status(500).json({message:"Something went wrong"});
            }
        }
    }


}