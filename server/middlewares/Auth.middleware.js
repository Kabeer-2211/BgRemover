const User = require("../models/Auth.model");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { auth };