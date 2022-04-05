require('../db/conn');
const User = require('../model/userSchema');
const Property = require('../model/propertySchema');

const changeRole = async (id,role) => {
    try {
        const Exists = await User.findOne({ _id: id })
        if (Exists) {
            const result = await User.updateOne({ _id: id }, { $set: { role: role } });
            return "Success"
        }
        else {
            return "No such account exists"
        }
    } catch (error) {
        return "Failed"
    }


}


module.exports = {
    changeRole
}