const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id} = req.body;
        const message = await userService.getUserById(id);
        if(message=="Failed"){
            res.status(500).json({ message:"Something Went Wrong" });
        }else{
            res.status(200).json({ user: message });
        }
    }


}