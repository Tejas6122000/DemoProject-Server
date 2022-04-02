const userService = require('../../../services/userService');



module.exports = () => {

    return async (req, res) => {
        const { id, name, email, phone } = req.body;
        let token = req.cookies.jwt;
        let currentUser;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Access!" });
        } else {
            currentUser = (await userService.getUser(token));
        }
        if (!id || !name || !email || !phone) {
            res.status(417).json({ error: 'Please fill all the fields' });
        } else {
            const message = await userService.updateUser(id, name, email, phone, currentUser);
            if (message == "Error") {
                res.status(500).json({message:"Something went wrong"});
            } else if (message == "User doesn't Exists") {
                res.status(404).json({ message: message });
            } else if (message == "You cannot edit this profile!") {
                res.status(401).json({ message: message });
            } else {
                res.status(200).json({user:message,message:"Profile Updated Successfully"});
            }


        }


    }
}