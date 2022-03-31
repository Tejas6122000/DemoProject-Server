require('../db/conn');
const User = require('../model/userSchema');
const Property = require('../model/propertySchema');

const changeRole = async(id)=>{
    try {
        const Exists = await User.findOne({_id:id})
        if (Exists){
            if(Exists.role!="Admin"){
                console.log("asd");
                const result = await User.updateOne({_id:id},{$set:{role:"Admin"}})

            }else{
                const result = await User.updateOne({_id:id},{$set:{role:"Normal"}})

            }

            return "Success"
        }
        else{
            return "No such account exists"
        }
    } catch (error) {
        return "Failed"
    }
   

}


module.exports = {
    changeRole
}