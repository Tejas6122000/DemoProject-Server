const userService = require('../../../services/userService');
const cookieParser = require('cookie-parser');


module.exports=()=>{

 return async(req,res)=>{
    if(req.cookies.jwt){
        const user = await userService.getUser(req.cookies.jwt);
        if(user!="Failed"){
            res.status(200).json({user:user});
        }else{
            res.status(200).json({user:null})
        }
    }else{
        res.status(200).json({user:null})
    }

 }

}