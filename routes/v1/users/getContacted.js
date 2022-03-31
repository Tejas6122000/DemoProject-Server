const userService = require('../../../services/userService');
const propertyService = require('../../../services/propertyService');


module.exports = () => {

    return async(req,res)=>{
        let token = req.cookies.jwt;
        let userId
        if(!token){
            res.status(401).json({message:"Unauthorized Access!"});
        }else{
            userId = (await userService.getUser(token))._id;
        }

        let propertiesId= await userService.getContacted(userId);
        let property=[];
        let prop;

        if(propertiesId=="Failed"){
            res.status(400).json({error:"Something went wrong"})
            
        }
        else if(propertiesId == "You have contacted no properties"){
            res.status(400).json({message:propertiesId})
        }
        else{
            for(let i=0; i<propertiesId.length;i++){
                prop = await propertyService.getPropertyById(propertiesId[i].property);
                property.push(prop);
            }
            res.status(200).json({message:property});
        }

    }

}