const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {name,location,area,price,type,description}=req.body;
        let token = req.cookies.jwt;
        let sellerId;
        if(!token){
            return res.status(401).send("Unauthorized Access!");
        }else{
            sellerId = (await userService.getUser(token))._id;
        }

        if(!name || !location || !area || !description || !price || !type){
            res.json({ error: 'Please fill all the fields' });
        }else{
            const message = await propertyService.createProperty(name,location,area,price,type,description,sellerId);
            if(message=="Exists"){
                res.status(200).json({ message: "Property Already Exists!" });
            }else if(message=="Success"){
                res.status(200).json({ message: "Property Added Successfully!" });
            }else{
                console.log(message);
                res.status(500).json({ message: "Something Went Wrong!" });
            }
        }
    }


}