const userService = require('../../../services/userService');


module.exports = () => {

    return async (req, res) => {
        try {
            res.clearCookie("jwt");
            res.status(200).json({message:"Logout Successful"})

        } catch (error) {
            res.status(500).json({message:"There was some error while logging out"})
        }
    }

}