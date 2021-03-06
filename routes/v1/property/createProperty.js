const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');


module.exports=()=>{

    return async(req,res)=>{ 
        const {name,al1,al2,city,zipcode,type,carea,barea,price,description}=req.body;
        let token = req.cookies.jwt;
        let sellerId;

        if(!token){
            res.status(401).json({message:"Unauthorized Access!"});
        }else{
            sellerId = (await userService.getUser(token))._id;
        }
        if(!name || !al1 || !al2 || !city || !zipcode || !type || !carea || !barea || !price || !description){
            res.status(417).json({ message: "Please fill all the fields"});
        }else{
            const message = await propertyService.createProperty(name,al1,al2,city,zipcode,type,carea,barea,price,description,sellerId);
            if(message=="Exists"){
                res.status(409).json({message:"Property Already Exists"});
            }else if(message=="Error"){
                res.status(500).json({message:"Something went wrong"});
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
                    res.status(500).json({message:"Something went wrong while uploading the images"});
                }
  
            }
        }

    }


}