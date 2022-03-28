const userService = require('../../../services/userService');


module.exports=()=>{

    return async(req,res)=>{
        const {email,password}=req.body;
        if(!email || !password){
            res.json({ error: 'Please fill all the fields' });
        }else{
            const message = await userService.login(email,password);
            if(message=="Wrong Credentials"){
                res.status(401).json({ error: 'Wrong Credentials' });
            }else if(message==""){
                res.status(500).json({ error: 'Something Went Wrong' });
            }
            else{
                res.cookie('jwt', message,{
                    expires: new Date(Date.now()+86,400,000),
                    httpOnly:true
                });
                res.status(200).json({token:"Logged In Successfully!"});
            }
        }
    }


}