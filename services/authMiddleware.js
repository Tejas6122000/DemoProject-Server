const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized user" });
    }
}

module.exports = {
    auth,
}

        