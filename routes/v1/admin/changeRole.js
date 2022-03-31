const userService = require('../../../services/userService');
const adminService = require('../../../services/adminService');


module.exports = () => {

    return async (req, res) => {
        const {id} = req.body;
        console.log(id)
        const result = await adminService.changeRole(id);
        if (result != "Failed" || result!="No such account exists") {
            res.status(200).json({ message: "Role changed successfully" });
        } else {
            res.status(200).json({ message: result })
        }
    }
}
