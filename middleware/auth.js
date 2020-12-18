const jwt = require("jsonwebtoken");
const config = require("config")

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }

  const token = req.header("accessToken");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify( token, config.get("jwtSecret") );
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ message: "Invalid Token" });
  }
};