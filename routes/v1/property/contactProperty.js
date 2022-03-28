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
        if(message=="You cannot contact your own property"){
            res.status(200).json({ error: message });
        }
        else{
            const user=await userService.getUserById(message);
            if(user=="Failed"){
                res.json({message:"This Listing Doesnot Exist"});
            }
            else{
                res.status(200).json({message:{name:user.name,email:user.email,phone:user.phone}});
            }
        }
    }

}