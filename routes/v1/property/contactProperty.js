const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');


module.exports=()=>{

    return async(req,res)=>{
        const {id} = req.body;
        let token = req.cookies.jwt;
        let userId;
        if(!token){
            return res.status(401).send("Unauthorized Access!");
        }else{
            userId = (await userService.getUser(token))._id;
        }

        const message = await propertyService.contactedProperty(id,userId);
        res.json({message:message});




    }

}