const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id}=req.body;
        let token = req.cookies.jwt;
        let canRemove;
        if(!token){
            return res.status(401).send();
        }else{
            canRemove = (await userService.getUser(token))._id;      
        }
        if(!id){
            res.json({ error: 'Please Provide Valid Details of the property' });
        }else{
            const message = await propertyService.removeProperty(id,canRemove);
            if(message=="Property Doesnot Exist"){
                res.status(404).send();
            }else if(message=="Success"){ 
                res.status(200).send();
            }else if(message=="You cannot remove this property!"){
                res.status(401).send()
            }else{
                console.log(message)
                res.status(500).send()
            }
        }
    }


}