const propertyService = require('../../../services/propertyService');
const userService = require('../../../services/userService');



module.exports=()=>{

    return async(req,res)=>{
        const {id,name,al1,al2,city,zipcode,type,carea,barea,price,description}=req.body;
        let token = req.cookies.jwt;
        let canEdit;
        if(!token){
            return res.status(401).send();
        }else{
            canEdit = (await userService.getUser(token))._id;      
        }
        if(!name || !al1 || !al2 || !city || !zipcode || !type || !carea || !barea || !price || !description){
            res.status(417).send();
        }else{      
            const message = await propertyService.updateProperty(id,name,al1,al2,city,zipcode,type,carea,barea,price,description,canEdit);
            if(message=="Property Doesnot Exist"){
                res.status(404).send();
            }else if(message=="You cannot edit this property!"){
                res.status(401).send();
            }else if(message=="Error"){
                res.status(500).send();
            }else{
                let imageArray=[]
                req.files.map(function(file) {
                imageArray.push(file.filename)
                return file.filename;
                });
                const result =await propertyService.saveImageToDB(imageArray,message.id);
                if(result=="Success"){
                    const property=await propertyService.getPropertyById(message.id);
                    res.status(200).json({message:property});
                }else{
                    console.log(result)
                    res.status(500).send();
                }        
            }
        }
    }
}
