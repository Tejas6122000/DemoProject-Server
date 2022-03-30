const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');


module.exports=()=>{

    return async(req,res)=>{ 
        const {name,location,area,price,type,description}=req.body;
        let token = req.cookies.jwt;
        let sellerId;

        if(!token){
            res.status(401).json({message:"Unauthorized Access!"});
        }else{
            sellerId = (await userService.getUser(token))._id;
        }

        if(!name || !location || !area || !description || !price || !type){
            console.log(name,location,area,description,price,type)
            res.status(417).json({ error: 'Please fill all the fields' });
        }else{
            const message = await propertyService.createProperty(name,location,area,price,type,description,sellerId);
            if(message=="Exists"){
                res.status(200).json({ message: "Property Already Exists!" });
            }else if(message=="Error"){
                res.status(500).json({ message: "Something Went Wrong!" });
            }else{
                let imageArray=[]
                req.files.map(function(file) {
                    imageArray.push(file.filename)
                });
                const result =await propertyService.saveImageToDB(imageArray,message.id);
                if(result=="Success"){
                    const property=await propertyService.getPropertyById(message.id);
                    res.status(200).json({message:property});
                }else{
                    console.log(result)
                    res.status(200).json({message:'Failed to Save Images'});
                }
  
            }
        }

    }


}