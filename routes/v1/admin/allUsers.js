const userService = require('../../../services/userService');

module.exports = () => {

    return async (req, res) => {

        const user = await userService.getAllUsers();
        if (user != "Failed") {
            res.status(200).json({ user: user });
        } else {
            res.status(200).json({ user: null })
        }
    }
}

