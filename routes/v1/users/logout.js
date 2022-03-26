const userService = require('../../../services/userService');


module.exports = () => {

    return async (req, res) => {
        try {
            res.clearCookie("jwt");
            res.json({message:"Logout Successful"})

        } catch (error) {
            res.json({message:"There was some error while logging out"})
        }
    }

}