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

        let properties = await userService.getOwnProperty(userId);

        if(properties=="Failed"){
            res.status(500).json({error:"Something went wrong"})
        }else{
            res.status(200).json({message:properties});
        }

    }

}