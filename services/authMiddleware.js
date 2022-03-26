const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log('middleware');
        next();
    } catch (error) {
        res.json({ error: "Unauthorized user" });
    }
}

module.exports = {
    auth,
}

        