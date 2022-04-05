const userService = require('../../../services/userService');
const adminService = require('../../../services/adminService');


module.exports = () => {

    return async (req, res) => {
        const {id,role} = req.body;
        const result = await adminService.changeRole(id,role);
        if (result == "Failed" || result=="No such account exists") {
            res.status(500).json({ message: result });
        } else {
            res.status(200).json({ message: "Role changed successfully" });
        }
    }
}
