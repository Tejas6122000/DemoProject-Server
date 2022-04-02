const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id}=req.body;
        let token = req.cookies.jwt;
        let currentUser;
        if(!token){
            return res.status(401).json({message:"Unauthorized Access!"});
        }else{
            currentUser = (await userService.getUser(token));      
        }
        if(!id){
            res.status(417).json({message:"Please fill all the fields"});
        }else{
            const message = await userService.removeUser(id,currentUser)
            if (message == "Error") {
                res.status(500).json({message:"Something went wrong"});
            } else if (message == "User doesn't Exists") {
                res.status(404).json({ message: message });
            } else if (message == "You cannot delete this profile!") {
                res.status(401).json({ message: message });
            } else {
                res.status(200).json({message:"Profile deleted Successfully"})
            }
        }
    }
}